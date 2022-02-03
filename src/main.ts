import * as core from '@actions/core';
import { getNodeVersion } from './getNodeVersion';

async function run() {
  try {
    const path = core.getInput('path');
    core.debug(`Load package.json at ${path}`);

    const fallback = core.getInput('fallback-version')
    core.debug(`Fallback ${path}`);

    const result = getNodeVersion(path) || fallback;

    core.debug(`set output: version: ${result}`);
    core.setOutput('version', result);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
