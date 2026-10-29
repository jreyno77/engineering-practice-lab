import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createTimingReport, fetchPullRequestEvidence, renderTimingReport, writeReportArtifacts } from '../scripts/assignment-timing.mjs';

const startSha = 'a'.repeat(40);
const start = { sha: startSha, commit: { committer: { date: '2026-10-29T09:00:00Z' } } };
const body = `\`\`\`practice\n${JSON.stringify({ assignment: 'cycle-002/day-01/kata-01', kind: 'kata', start_commit: startSha })}\n\`\`\``;
const merged = {
  number: 12, body, state: 'closed', merged: true,
  created_at: '2026-10-29T09:01:00Z', merged_at: '2026-10-29T10:30:00Z',
  head: { sha: 'b'.repeat(40) }, merge_commit_sha: 'c'.repeat(40), commits: 2,
};
const completed = { sha: 'b'.repeat(40), commit: { committer: { date: '2026-10-29T10:15:00Z' } } };
const reportFor = (changes = {}) => createTimingReport({
  repository: 'owner/lab', pullRequest: merged, commits: [start, completed],
  generatedAt: '2026-10-29T11:00:00Z', ...changes,
});

test('a 09:00 first commit merged at 10:30 reports 90 minutes, not the report time', () => {
  const report = reportFor();
  assert.equal(report.status, 'completed');
  assert.equal(report.elapsed_seconds, 5400);
  assert.equal(report.started_at, '2026-10-29T09:00:00Z');
  assert.equal(report.ended_at, '2026-10-29T10:30:00Z');
});

test('squash merge uses the original PR start rather than the squash commit', () => {
  const report = reportFor();
  assert.notEqual(report.start_commit, report.evidence.merge_commit_sha);
  assert.equal(report.elapsed_seconds, 5400);
  assert.equal(report.evidence.start_commit_url, `https://github.com/owner/lab/commit/${startSha}`);
});

test('rerunning a completed report does not extend the completed duration', () => {
  assert.equal(reportFor({ generatedAt: '2026-11-01T20:00:00.000Z' }).elapsed_seconds, 5400);
});

test('course card IDs can be used directly as assignment IDs', () => {
  const report = reportFor({ pullRequest: { ...merged, body: body.replace('cycle-002/day-01/kata-01', 'C002-A01') } });
  assert.equal(report.status, 'completed');
  assert.equal(report.assignment, 'C002-A01');
});

for (const kind of ['project', 'adoption', 'simulation', 'debugging', 'testing', 'reliability']) {
  test(`${kind} work has its own reported kind instead of being counted as a kata`, () => {
    const report = reportFor({ pullRequest: { ...merged, body: body.replace('"kind":"kata"', `"kind":"${kind}"`) } });
    assert.equal(report.status, 'completed');
    assert.equal(report.kind, kind);
    assert.equal(report.elapsed_seconds, 5400);
  });
}

test('an open PR has unfinished age and no completed duration', () => {
  const report = reportFor({ pullRequest: { ...merged, state: 'open', merged: false, merged_at: null } });
  assert.equal(report.status, 'in_progress');
  assert.equal(report.elapsed_seconds, null);
  assert.equal(report.unfinished_age_seconds, 7200);
  assert.equal(report.ended_at, null);
});

test('closing without merge never counts as completed work', () => {
  const report = reportFor({ pullRequest: { ...merged, merged: false, merged_at: null } });
  assert.equal(report.status, 'closed_unmerged');
  assert.equal(report.elapsed_seconds, null);
  assert.equal(report.unfinished_age_seconds, null);
});

function invalidReport(changes, reason) {
  const report = reportFor(changes);
  assert.equal(report.status, 'invalid');
  assert.equal(report.elapsed_seconds, null);
  assert.match(report.issues.join(' '), reason);
  return report;
}

test('missing assignment metadata remains visible rather than guessing a start', () => {
  invalidReport({ pullRequest: { ...merged, body: 'Fix the kata' } }, /exactly one/);
});

test('two assignments cannot be represented by one timing report', () => {
  invalidReport({ pullRequest: { ...merged, body: `${body}\n${body}` } }, /exactly one/);
});

test('malformed JSON fails with a useful message', () => {
  invalidReport({ pullRequest: { ...merged, body: '```practice\n{bad}\n```' } }, /valid JSON/);
});

test('a later commit cannot replace the original start', () => {
  invalidReport({ pullRequest: { ...merged, body: body.replace(startSha, completed.sha) } }, /first commit/);
});

test('an unrelated full SHA is rejected', () => {
  invalidReport({ pullRequest: { ...merged, body: body.replace(startSha, 'd'.repeat(40)) } }, /first commit/);
});

test('abbreviated SHAs are rejected', () => {
  invalidReport({ pullRequest: { ...merged, body: body.replace(startSha, 'abc1234') } }, /40-character/);
});

test('code-looking input is treated as data and cannot enter Markdown reports', () => {
  const injected = body.replace('cycle-002/day-01/kata-01', '$(touch owned)<script>alert(1)</script>');
  const report = invalidReport({ pullRequest: { ...merged, body: injected } }, /single assignment ID/);
  assert.doesNotMatch(renderTimingReport(report), /touch owned|<script>/);
});

test('a future start clock is not converted to a negative duration', () => {
  invalidReport({ commits: [{ ...start, commit: { committer: { date: '2026-10-30T09:00:00Z' } } }, completed] }, /Start must/);
});

test('a missing committer date cannot be replaced by author or PR creation dates', () => {
  invalidReport({ commits: [{ ...start, commit: { author: { date: '2026-10-29T09:00:00Z' } } }, completed] }, /committer date/);
});

test('an impossible calendar date is rejected', () => {
  invalidReport({ commits: [{ ...start, commit: { committer: { date: '2026-02-30T09:00:00Z' } } }, completed] }, /valid date/);
});

test('merge before PR creation is rejected', () => {
  invalidReport({ pullRequest: { ...merged, merged_at: '2026-10-29T08:30:00Z' } }, /merge must/);
});

test('a merge in the future is rejected', () => {
  invalidReport({ pullRequest: { ...merged, merged_at: '2026-10-30T08:30:00Z' } }, /merge must/);
});

test('partial evidence cannot claim a completed duration', () => {
  invalidReport({ commits: [start] }, /complete PR commit list/);
});

test('a changed head cannot mix two API snapshots into a duration', () => {
  invalidReport({ pullRequest: { ...merged, head: { sha: 'f'.repeat(40) } } }, /consistent snapshot/);
});

test('commit evidence is fetched past the first page', async () => {
  const commits = Array.from({ length: 101 }, (_, i) => ({ sha: i.toString(16).padStart(40, '0') }));
  const requests = [];
  const evidence = await fetchPullRequestEvidence({
    repository: 'owner/lab', number: 12,
    request: async path => {
      requests.push(path);
      if (path === '/repos/owner/lab/pulls/12') return { ...merged, commits: 101 };
      if (path.endsWith('page=1')) return commits.slice(0, 100);
      if (path.endsWith('page=2')) return commits.slice(100);
      assert.fail(`Unexpected request: ${path}`);
    },
  });
  assert.deepEqual(evidence.commits, commits);
  assert.equal(requests.length, 3);
});

test('the GitHub 250-commit limit is explicit, not silent truncation', async () => {
  await assert.rejects(fetchPullRequestEvidence({ repository: 'owner/lab', number: 12, request: async () => ({ commits: 251 }) }), /capped at 250/);
});

test('empty pagination responses fail rather than loop or invent evidence', async () => {
  await assert.rejects(fetchPullRequestEvidence({ repository: 'owner/lab', number: 12, request: async path => path.endsWith('/12') ? { commits: 2 } : [] }), /incomplete/);
});

test('Markdown presents completed minutes and separates the provisional age', () => {
  const markdown = renderTimingReport(reportFor());
  assert.match(markdown, /Elapsed to merge \(minutes\) \| 90\.00/);
  assert.match(markdown, /Unfinished age \(minutes\) \| —/);
  assert.match(markdown, /not active work time/);
});

test('the downloadable files and job summary contain the actual completed result', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'practice-report-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const summaryPath = join(directory, 'summary.md');
  await writeReportArtifacts(reportFor(), { directory, summaryPath });
  const saved = JSON.parse(await readFile(join(directory, 'report.json'), 'utf8'));
  assert.equal(saved.elapsed_seconds, 5400);
  assert.equal(saved.start_commit, startSha);
  const markdown = await readFile(join(directory, 'report.md'), 'utf8');
  assert.match(markdown, /90\.00/);
  assert.equal(await readFile(summaryPath, 'utf8'), markdown);
});

test('invalid evidence is also saved as an artifact with no invented duration', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'practice-report-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await writeReportArtifacts(reportFor({ pullRequest: { ...merged, body: '' } }), { directory });
  const saved = JSON.parse(await readFile(join(directory, 'report.json'), 'utf8'));
  assert.equal(saved.status, 'invalid');
  assert.equal(saved.elapsed_seconds, null);
  assert.match(await readFile(join(directory, 'report.md'), 'utf8'), /exactly one practice JSON block/);
});
