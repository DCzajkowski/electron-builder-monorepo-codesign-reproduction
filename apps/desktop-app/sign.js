// @ts-check

/**
 * @param {import('electron-builder').CustomWindowsSignTaskConfiguration} configuration
 */
module.exports.default = async (configuration) => {
  console.log('Custom signing with path:', configuration.path)
}
