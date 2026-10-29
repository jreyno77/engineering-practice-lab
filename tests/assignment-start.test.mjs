import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, writeFile, chmod, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createTimingReport } from '../scripts/assignment-timing.mjs';

const starter = fileURLToPath(new URL('../scripts/assignment-start.mjs', import.meta.url));
const assignment = 'cycle-001/day-06/architecture-lifecycle';
const branch = `practice/${assignment}`;

function command(cwd, env, executable, args) {
  const result = spawnSync(executable, args, { cwd, env, encoding: 'utf8', timeout: 20000 });
  if (result.error) throw result.error;
  return result;
}

async function repository(t) {
  const root = await mkdtemp(join(tmpdir(), 'assignment-start-'));
  t.after(() => rm(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }));
  const repo = join(root, 'learner');
  const remote = join(root, 'origin.git');
  const env = { ...process.env, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: join(root, 'no-global-config'), GIT_TERMINAL_PROMPT: '0' };
  for (const key of ['GIT_DIR', 'GIT_WORK_TREE', 'GIT_AUTHOR_NAME', 'GIT_AUTHOR_EMAIL', 'GIT_COMMITTER_NAME', 'GIT_COMMITTER_EMAIL']) delete env[key];
  const gitAt = (cwd, ...args) => {
    const result = command(cwd, env, 'git', args);
    assert.equal(result.status, 0, `git ${args.join(' ')} failed:\n${result.stderr}`);
    return result.stdout.trim();
  };
  const git = (...args) => gitAt(repo, ...args);
  await mkdir(repo);
  gitAt(root, 'init', '--bare', '--initial-branch=main', remote);
  git('init', '--initial-branch=main');
  git('config', 'user.name', 'Practice test');
  git('config', 'user.email', 'practice@example.invalid');
  git('config', 'commit.gpgsign', 'false');
  git('config', 'core.autocrlf', 'false');
  await writeFile(join(repo, 'README.md'), 'Practice baseline\n');
  git('add', 'README.md');
  git('commit', '-m', 'baseline');
  git('remote', 'add', 'origin', remote);
  git('push', '-u', 'origin', 'main');
  const baseline = git('rev-parse', 'HEAD');
  return {
    root, repo, remote, env, git, gitAt, baseline,
    start: (...args) => command(repo, env, process.execPath, [starter, ...args]),
    remoteHead: ref => gitAt(remote, 'rev-parse', ref),
    remoteBranches: () => gitAt(remote, 'for-each-ref', '--format=%(refname)', 'refs/heads'),
  };
}

function metadata(result) {
  const blocks = [...result.stdout.matchAll(/^```practice\s*\r?\n([\s\S]*?)^```[ \t]*$/gm)];
  assert.equal(blocks.length, 1, `Expected one PR metadata block:\n${result.stdout}\n${result.stderr}`);
  return JSON.parse(blocks[0][1]);
}

function unchangedMain(fixture, expected = fixture.baseline) {
  assert.equal(fixture.git('branch', '--show-current'), 'main');
  assert.equal(fixture.git('rev-parse', 'HEAD'), expected);
  assert.equal(fixture.git('branch', '--list', branch), '');
  assert.equal(fixture.remoteBranches(), 'refs/heads/main');
}

test('help explains the command outside a repository without creating files or starting a clock', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'assignment-help-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const result = command(directory, process.env, process.execPath, [starter, '--help']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /npm run assignment:start -- <assignment-id> <kind>/);
  assert.doesNotMatch(result.stdout, /^```practice/m);
  assert.deepEqual(await readdir(directory), []);
});

test('starts one assignment, pushes its original empty marker, and prints metadata accepted by the timing reporter', async t => {
  const fixture = await repository(t);
  const result = fixture.start(assignment, 'architecture');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(fixture.git('branch', '--show-current'), branch);
  const marker = fixture.git('rev-parse', 'HEAD');
  assert.notEqual(marker, fixture.baseline);
  assert.equal(fixture.git('log', '--format=%s', '-1'), `start: ${assignment}`);
  assert.equal(fixture.git('rev-list', '--reverse', 'main..HEAD'), marker);
  assert.equal(fixture.git('diff', '--name-only', 'main', 'HEAD'), '');
  assert.equal(fixture.remoteHead(`refs/heads/${branch}`), marker);
  assert.equal(fixture.git('rev-parse', '--abbrev-ref', '@{upstream}'), `origin/${branch}`);
  assert.deepEqual(metadata(result), { assignment, kind: 'architecture', start_commit: marker });

  const date = fixture.git('show', '-s', '--format=%cI', marker);
  const startedAt = new Date(date).toISOString();
  const report = createTimingReport({
    repository: 'owner/lab', generatedAt: startedAt,
    pullRequest: { number: 1, body: result.stdout, state: 'open', merged: false, created_at: startedAt, commits: 1, head: { sha: marker } },
    commits: [{ sha: marker, commit: { committer: { date: startedAt } } }],
  });
  assert.equal(report.status, 'in_progress', report.issues.join('\n'));
  assert.equal(report.elapsed_seconds, null);
  assert.equal(report.start_commit, marker);
});

test('fast-forwards stale main before creating the first assignment commit', async t => {
  const fixture = await repository(t);
  fixture.git('commit', '--allow-empty', '-m', 'new remote baseline');
  const updatedMain = fixture.git('rev-parse', 'HEAD');
  fixture.git('push', 'origin', 'main');
  fixture.git('reset', '--hard', fixture.baseline);
  fixture.git('update-ref', 'refs/remotes/origin/main', fixture.baseline);
  const result = fixture.start(assignment, 'architecture');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(fixture.git('rev-parse', 'main'), updatedMain);
  assert.equal(fixture.git('rev-parse', 'HEAD^'), updatedMain);
  assert.equal(fixture.git('rev-list', '--reverse', 'main..HEAD'), metadata(result).start_commit);
});

test('refuses tracked edits, staged changes, and untracked files without starting a clock', async t => {
  const fixture = await repository(t);
  await writeFile(join(fixture.repo, 'README.md'), 'Unfinished work\n');
  assert.notEqual(fixture.start(assignment, 'architecture').status, 0);
  unchangedMain(fixture);
  fixture.git('add', 'README.md');
  assert.notEqual(fixture.start(assignment, 'architecture').status, 0);
  unchangedMain(fixture);
  fixture.git('reset', '--hard', 'HEAD');
  await writeFile(join(fixture.repo, 'notes.md'), 'Untracked study notes\n');
  assert.notEqual(fixture.start(assignment, 'architecture').status, 0);
  unchangedMain(fixture);
  assert.equal(fixture.git('status', '--porcelain'), '?? notes.md');
});

test('refuses another branch and a detached checkout without changing either', async t => {
  const fixture = await repository(t);
  fixture.git('switch', '-c', 'unfinished-work');
  assert.notEqual(fixture.start(assignment, 'architecture').status, 0);
  assert.equal(fixture.git('branch', '--show-current'), 'unfinished-work');
  assert.equal(fixture.git('rev-parse', 'HEAD'), fixture.baseline);
  fixture.git('switch', '--detach', 'HEAD');
  assert.notEqual(fixture.start(assignment, 'architecture').status, 0);
  assert.equal(fixture.git('branch', '--show-current'), '');
  assert.equal(fixture.git('rev-parse', 'HEAD'), fixture.baseline);
  assert.equal(fixture.remoteBranches(), 'refs/heads/main');
});

test('refuses an existing local assignment branch and preserves its original marker', async t => {
  const fixture = await repository(t);
  fixture.git('switch', '-c', branch);
  fixture.git('commit', '--allow-empty', '-m', `start: ${assignment}`);
  const original = fixture.git('rev-parse', 'HEAD');
  fixture.git('switch', 'main');
  assert.notEqual(fixture.start(assignment, 'architecture').status, 0);
  assert.equal(fixture.git('branch', '--show-current'), 'main');
  assert.equal(fixture.git('rev-parse', branch), original);
  assert.equal(fixture.remoteBranches(), 'refs/heads/main');
});

test('refuses an existing remote assignment even when no local or tracking branch exists', async t => {
  const fixture = await repository(t);
  fixture.gitAt(fixture.remote, 'update-ref', `refs/heads/${branch}`, fixture.baseline);
  assert.equal(fixture.git('branch', '--list', branch), '');
  assert.equal(fixture.git('branch', '--remotes', '--list', `origin/${branch}`), '');
  assert.notEqual(fixture.start(assignment, 'architecture').status, 0);
  assert.equal(fixture.git('branch', '--show-current'), 'main');
  assert.equal(fixture.git('branch', '--list', branch), '');
  assert.equal(fixture.remoteHead(`refs/heads/${branch}`), fixture.baseline);
});

test('refuses unpublished main commits rather than including earlier work in the assignment', async t => {
  const fixture = await repository(t);
  fixture.git('commit', '--allow-empty', '-m', 'unpublished unrelated work');
  const original = fixture.git('rev-parse', 'HEAD');
  assert.notEqual(fixture.start(assignment, 'architecture').status, 0);
  unchangedMain(fixture, original);
  assert.equal(fixture.remoteHead('refs/heads/main'), fixture.baseline);
});

test('refuses diverged main without merging or rewriting either history', async t => {
  const fixture = await repository(t);
  fixture.git('commit', '--allow-empty', '-m', 'remote change');
  const remoteMain = fixture.git('rev-parse', 'HEAD');
  fixture.git('push', 'origin', 'main');
  fixture.git('reset', '--hard', fixture.baseline);
  fixture.git('update-ref', 'refs/remotes/origin/main', fixture.baseline);
  fixture.git('commit', '--allow-empty', '-m', 'local change');
  const localMain = fixture.git('rev-parse', 'HEAD');
  assert.notEqual(fixture.start(assignment, 'architecture').status, 0);
  unchangedMain(fixture, localMain);
  assert.equal(fixture.remoteHead('refs/heads/main'), remoteMain);
});

test('rejects missing, extra, invalid, and branch-incompatible arguments before changing Git state', async t => {
  const fixture = await repository(t);
  for (const args of [[], [assignment], [assignment, 'architecture', 'extra'], [assignment, 'unknown'], ['bad;command', 'kata'], ['day//one', 'kata'], ['a'.repeat(121), 'kata']]) {
    const result = fixture.start(...args);
    assert.notEqual(result.status, 0, JSON.stringify(args));
    assert.doesNotMatch(result.stdout, /^```practice/m);
    unchangedMain(fixture);
  }
});

test('refuses missing Git identity before creating the assignment branch', async t => {
  const fixture = await repository(t);
  fixture.git('config', '--unset', 'user.email');
  fixture.git('config', 'user.useConfigOnly', 'true');
  const result = fixture.start(assignment, 'architecture');
  assert.notEqual(result.status, 0);
  unchangedMain(fixture);
});

test('a rejected push retains the original clock and prints usable recovery metadata', async t => {
  const fixture = await repository(t);
  const hook = join(fixture.remote, 'hooks', 'pre-receive');
  await writeFile(hook, '#!/bin/sh\necho "Test remote rejects this push" >&2\nexit 1\n');
  await chmod(hook, 0o755);
  const result = fixture.start(assignment, 'architecture');
  assert.notEqual(result.status, 0);
  assert.equal(fixture.git('branch', '--show-current'), branch);
  const original = fixture.git('rev-parse', 'HEAD');
  assert.notEqual(original, fixture.baseline);
  assert.deepEqual(metadata(result), { assignment, kind: 'architecture', start_commit: original });
  assert.equal(fixture.git('rev-list', '--reverse', 'main..HEAD'), original);
  assert.equal(fixture.remoteBranches(), 'refs/heads/main');
  assert.match(result.stdout + result.stderr, /git push.*origin/);

  const retry = fixture.start(assignment, 'architecture');
  assert.notEqual(retry.status, 0);
  assert.equal(fixture.git('rev-parse', 'HEAD'), original);
  await rm(hook);
  fixture.git('push', '-u', 'origin', branch);
  assert.equal(fixture.remoteHead(`refs/heads/${branch}`), original);
});
