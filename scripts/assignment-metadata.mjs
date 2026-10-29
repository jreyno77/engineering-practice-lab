const kinds = new Set(['fluency', 'kata', 'refactor', 'security', 'performance', 'pitch', 'architecture', 'communication', 'review', 'tooling', 'project', 'adoption', 'simulation', 'debugging', 'testing', 'reliability']);

// Shared by the starter and reporter so printed metadata uses the same contract.
export function validateAssignment(assignment, kind) {
  if (typeof assignment !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9/_-]{0,119}$/.test(assignment)) {
    throw new Error('Use a single assignment ID containing ASCII letters, digits, slash, underscore, or hyphen (1–120 characters).');
  }
  if (!kinds.has(kind)) throw new Error('Choose a supported assignment kind; see docs/assignment-workflow.md.');
}
