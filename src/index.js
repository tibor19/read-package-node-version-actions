const fs = require('fs');
const path = require('path');

const { getInput, setFailed, debug, setOutput } = require('@actions/core');

/**
 * Find package.json with path.
 * @param folder
 */
 const findPackageJson = (folder) => {
    return fs.readFileSync(path.join(folder, 'package.json')).toString();
  };
  
  /**
   * Get version field within package.json
   * @param path
   */
  const getNodeVersion = (filePath) => {
    const packageJson = findPackageJson(filePath);
  
    return JSON.parse(packageJson).engines.node;
  };
  

const main = async () => {

    const folder = getInput('path');
    debug(`Load package.json at ${folder}`);

    const fallback = getInput('fallback-version')
    debug(`Fallback version ${fallback}`);

    const result = getNodeVersion(folder) || fallback;

    debug(`set output: version: ${result}`);
    setOutput('version', result);
};

main().catch(err => {
    console.error(err);
    console.error(err.stack);
    setFailed(err);
    process.exit(-1);
});