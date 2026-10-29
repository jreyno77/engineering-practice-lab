import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const kinds = new Set(['fluency', 'kata', 'refactor', 'security', 'performance', 'pitch', 'architecture', 'communication', 'review', 'tooling', 'project', 'adoption', 'simulation', 'debugging', 'testing', 'reliability']);

function assignmentFrom(body) {
  const blocks = [...(body ?? '').matchAll(/^```practice\s*\r?\n([\s\S]*?)^```[ \t]*$/gm)];
  if (blocks.length !== 1) throw new Error('Include exactly one practice JSON block: one assignment per PR.');
  let assignment;
  try { assignment = JSON.parse(blocks[0][1]); } catch { throw new Error('The practice block must contain valid JSON.'); }
  if (!assignment || Array.isArray(assignment) || typeof assignment !== 'object') throw new Error('The practice block must contain an object.');
  if (Object.keys(assignment).sort().join(',') !== 'assignment,kind,start_commit') throw new Error('The practice block needs exactly assignment, kind, and start_commit.');
  if (typeof assignment.assignment !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9/_-]{0,119}$/.test(assignment.assignment)) throw new Error('Use a single assignment ID containing ASCII letters, digits, slash, underscore, or hyphen.');
  if (!kinds.has(assignment.kind)) throw new Error('Choose a supported assignment kind; see docs/assignment-workflow.md.');
  if (typeof assignment.start_commit !== 'string' || !/^[a-f0-9]{40}$/.test(assignment.start_commit)) throw new Error('start_commit must be the full lowercase 40-character Git commit SHA.');
  return assignment;
}

function timestamp(value, field) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) throw new Error(`${field} must be a UTC timestamp.`);
  const time = Date.parse(value);
  const normalized = value.includes('.') ? value : value.replace('Z', '.000Z');
  if (!Number.isFinite(time) || new Date(time).toISOString() !== normalized) throw new Error(`${field} is not a valid date.`);
  return time;
}

export function createTimingReport({ repository, pullRequest, commits, generatedAt }) {
  const report = {
    schema_version: 1, metric: 'first_commit_to_pr_merge', repository,
    pull_request: pullRequest.number, generated_at: generatedAt,
    status: 'invalid', assignment: null, kind: null, start_commit: null,
    started_at: null, ended_at: null, elapsed_seconds: null,
    unfinished_age_seconds: null, issues: [],
    evidence: {
      start_clock: 'Git commit committer date, validated against the first PR commit',
      end_clock: 'GitHub pull request merged_at',
      pr_url: `https://github.com/${repository}/pull/${pullRequest.number}`,
      head_sha: pullRequest.head?.sha ?? null,
      merge_commit_sha: pullRequest.merge_commit_sha ?? null,
      commit_count: commits.length,
    },
  };
  try {
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository) || !Number.isSafeInteger(pullRequest.number) || pullRequest.number < 1) throw new Error('Invalid repository or PR number.');
    const assignment = assignmentFrom(pullRequest.body);
    Object.assign(report, assignment);
    const now = timestamp(generatedAt, 'generated_at');
    if (!commits.length || commits.length !== pullRequest.commits) throw new Error('The complete PR commit list is required; incomplete evidence cannot produce a duration.');
    if (commits.length > 250) throw new Error('PRs with more than 250 commits require manual evidence; GitHub limits this endpoint.');
    if (commits.at(-1).sha !== pullRequest.head?.sha || new Set(commits.map(commit => commit.sha)).size !== commits.length) throw new Error('PR head and commit list do not agree; rerun to obtain a consistent snapshot.');
    if (commits[0].sha !== assignment.start_commit) throw new Error('start_commit must be the first commit in this PR. Preserve the original marker; do not reset it after a rebase or amend.');
    const startedAt = commits[0].commit?.committer?.date;
    const started = timestamp(startedAt, 'start commit committer date');
    const created = timestamp(pullRequest.created_at, 'PR created_at');
    if (started > created || created > now) throw new Error('Start must be at or before PR creation, and PR creation must not be in the future.');
    report.started_at = startedAt;
    report.evidence.start_commit_url = `https://github.com/${repository}/commit/${assignment.start_commit}`;
    if (pullRequest.merged === true) {
      const ended = timestamp(pullRequest.merged_at, 'PR merged_at');
      if (ended < created || ended > now) throw new Error('PR merge must be at or after PR creation and no later than report generation.');
      report.status = 'completed';
      report.ended_at = pullRequest.merged_at;
      report.elapsed_seconds = (ended - started) / 1000;
    } else if (pullRequest.state === 'open' && !pullRequest.merged_at) {
      report.status = 'in_progress';
      report.unfinished_age_seconds = (now - started) / 1000;
    } else if (pullRequest.state === 'closed' && !pullRequest.merged_at) {
      report.status = 'closed_unmerged';
    } else {
      throw new Error('PR state and merge evidence disagree.');
    }
  } catch (error) {
    report.issues.push(error.message);
  }
  return report;
}

export async function fetchPullRequestEvidence({ repository, number, request }) {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository) || !Number.isSafeInteger(number) || number < 1) throw new Error('Invalid repository or PR number.');
  const path = `/repos/${repository}/pulls/${number}`;
  const pullRequest = await request(path);
  const commits = [];
  if (!Number.isInteger(pullRequest.commits) || pullRequest.commits < 1 || pullRequest.commits > 250) throw new Error('Expected a PR with 1–250 commits; the GitHub PR commits endpoint is capped at 250.');
  for (let page = 1; commits.length < pullRequest.commits; page++) {
    const batch = await request(`${path}/commits?per_page=100&page=${page}`);
    if (!Array.isArray(batch) || !batch.length) throw new Error('GitHub returned an incomplete PR commit list.');
    commits.push(...batch);
    if (page >= 3) break;
  }
  return { pullRequest, commits };
}

export function renderTimingReport(report) {
  const rows = [
    ['Status', report.status], ['Assignment', report.assignment], ['Kind', report.kind],
    ['First commit', report.start_commit], ['Started (UTC)', report.started_at],
    ['Merged (UTC)', report.ended_at], ['Elapsed to merge (minutes)', report.elapsed_seconds === null ? null : (report.elapsed_seconds / 60).toFixed(2)],
    ['Unfinished age (minutes)', report.unfinished_age_seconds === null ? null : (report.unfinished_age_seconds / 60).toFixed(2)],
  ];
  return [
    '# Assignment timing report', '', `PR: ${report.evidence.pr_url}`, '',
    '| Measure | Value |', '|---|---|',
    ...rows.map(([key, value]) => `| ${key} | ${value ?? '—'} |`), '',
    'Elapsed time includes study, coding, breaks, review, and CI. It is not active work time or a quality score.',
    'Open PR age is provisional. Closed unmerged PRs are excluded from completed durations.', '',
    ...(report.issues.length ? ['## Evidence problems', '', ...report.issues.map(issue => `- ${issue}`), ''] : []),
    `Generated: ${report.generated_at}`, '',
  ].join('\n');
}

export async function writeReportArtifacts(report, { directory, summaryPath }) {
  await mkdir(directory, { recursive: true });
  const markdown = renderTimingReport(report);
  await writeFile(join(directory, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(join(directory, 'report.md'), markdown);
  if (summaryPath) await appendFile(summaryPath, markdown);
}

async function run() {
  const generatedAt = new Date().toISOString();
  const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const repository = process.env.GITHUB_REPOSITORY;
  const number = Number(process.env.PR_NUMBER || event.pull_request?.number);
  let report;
  try {
    const request = async path => {
      const response = await fetch(`https://api.github.com${path}`, {
        headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, 'X-GitHub-Api-Version': '2022-11-28' },
        signal: AbortSignal.timeout(30000), redirect: 'error',
      });
      if (!response.ok) throw new Error(`GitHub evidence request failed with HTTP ${response.status}.`);
      return response.json();
    };
    const evidence = await fetchPullRequestEvidence({ repository, number, request });
    report = createTimingReport({ repository, ...evidence, generatedAt });
  } catch (error) {
    // Keep failures visible as artifacts without exposing token-bearing requests or API bodies.
    report = createTimingReport({ repository, pullRequest: { number }, commits: [], generatedAt });
    report.issues = [error.message];
  }
  report.evidence.workflow_run_id = process.env.GITHUB_RUN_ID ?? null;
  report.evidence.workflow_run_attempt = process.env.GITHUB_RUN_ATTEMPT ?? null;
  report.evidence.reporter_sha = process.env.REPORTER_SHA ?? process.env.GITHUB_SHA ?? null;
  await writeReportArtifacts(report, { directory: 'reports/assignment-timing', summaryPath: process.env.GITHUB_STEP_SUMMARY });
  if (report.status === 'invalid') process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await run();
