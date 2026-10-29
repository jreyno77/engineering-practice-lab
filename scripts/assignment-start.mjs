import { spawnSync } from 'node:child_process';
import { validateAssignment } from './assignment-metadata.mjs';

const usage = 'npm run assignment:start -- <assignment-id> <kind>';

function gitResult(...args) {
  // Pass arguments directly, never through a shell. Git still uses normal auth/hooks.
  const result = spawnSync('git', args, { encoding: 'utf8', stdio: ['inherit', 'pipe', 'pipe'] });
  if (result.error) throw result.error;
  return result;
}

function git(...args) {
  const result = gitResult(...args);
  if (result.status !== 0) {
    throw new Error(`git ${args[0]} failed.\n${result.stderr?.trim() || 'Git did not complete successfully.'}`);
  }
  return result.stdout.trim();
}

function prepareMain(branch) {
  if (git('rev-parse', '--is-inside-work-tree') !== 'true') throw new Error('Run this command in the lab checkout.');
  if (git('branch', '--show-current') !== 'main') {
    throw new Error('Start from main. If this assignment already has a branch, continue it and preserve its original start commit.');
  }
  if (git('status', '--porcelain', '--untracked-files=all')) {
    throw new Error('The checkout must be clean, including staged and untracked files. Save your existing work before starting.');
  }
  git('check-ref-format', '--branch', branch);
  if (git('branch', '--list', branch)) throw new Error(`Assignment branch ${branch} already exists. Preserve its original clock.`);
  git('var', 'GIT_AUTHOR_IDENT');
  git('var', 'GIT_COMMITTER_IDENT');
  if (git('ls-remote', '--heads', 'origin', `refs/heads/${branch}`)) {
    throw new Error(`Assignment branch ${branch} already exists on origin. Continue that attempt; do not start another clock.`);
  }

  git('fetch', '--no-tags', 'origin', 'refs/heads/main');
  const base = git('rev-parse', 'FETCH_HEAD');
  const ancestry = gitResult('merge-base', '--is-ancestor', 'HEAD', base);
  if (ancestry.status === 1) throw new Error('Local main is ahead of or diverged from origin/main. Resolve that history before starting an assignment.');
  if (ancestry.status !== 0) throw new Error(`Could not check main history.\n${ancestry.stderr.trim()}`);
  git('merge', '--ff-only', base);
  return base;
}

function printMetadata(assignment, kind, startCommit) {
  console.log('\nCopy this block into the assignment PR description:\n');
  console.log('```practice');
  console.log(JSON.stringify({ assignment, kind, start_commit: startCommit }));
  console.log('```');
}

function startAssignment(assignment, kind) {
  validateAssignment(assignment, kind);
  const branch = `practice/${assignment}`;
  const base = prepareMain(branch);
  git('switch', '-c', branch);
  let startCommit;
  try {
    git('commit', '--allow-empty', '-m', `start: ${assignment}`);
    startCommit = git('rev-parse', 'HEAD');
    if (!/^[a-f0-9]{40}$/.test(startCommit) || git('rev-parse', 'HEAD^') !== base) {
      throw new Error('The start commit does not match the expected first-commit history.');
    }
  } catch (error) {
    throw new Error(`${error.message}\nBranch ${branch} has been retained. Inspect its history before continuing; do not rerun the starter or replace an existing marker.`);
  }

  // Print immediately so even a rejected/interrupted push leaves the original SHA.
  console.log(`Started ${assignment} on ${branch}. Original start commit: ${startCommit}`);
  printMetadata(assignment, kind, startCommit);
  try {
    git('push', '-u', 'origin', branch);
  } catch (error) {
    throw new Error(`${error.message}\nThe original start commit is retained locally. Resolve the push failure, then run:\ngit push -u origin ${branch}\nDo not rerun the starter, amend the marker, or reset the clock.`);
  }
  console.log(`\nPushed ${branch} to origin. Open a draft PR against main and paste the metadata above.`);
  console.log('If GitHub needs a file change, commit a short submission intent note and push, keeping this original start SHA.');
}

const args = process.argv.slice(2);
if (args.length === 1 && args[0] === '--help') {
  console.log(`${usage}\n\nRun when you begin the assignment, before studying. Requires a clean checkout on main, Git identity, and origin push access.\nCreates practice/<assignment-id>, commits an empty start marker, pushes it, and prints PR metadata.\nExisting attempts are refused. No PR is opened automatically.`);
} else {
  try {
    if (args.length !== 2) throw new Error(`Usage: ${usage}`);
    startAssignment(...args);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
