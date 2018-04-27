'use strict';

const expandHomeDir = require('expand-home-dir')
const pluginManager = require('@arkecosystem/core-plugin-manager')

/**
 * Create a snapshot.
 * @param  {Object} options
 * @return {void}
 */
module.exports = async (options) => {
  const config = options.config

  pluginManager.init(config, {
    include: [
      '@arkecosystem/core-config',
      '@arkecosystem/core-config-json',
      '@arkecosystem/core-logger',
      '@arkecosystem/core-logger-winston',
      '@arkecosystem/core-blockchain',
      '@arkecosystem/core-database',
      '@arkecosystem/core-database-sequelize'
    ]
  })

  await pluginManager.hook('init', {config})
  await pluginManager.hook('beforeCreate')
  await pluginManager.hook('beforeMount')

  pluginManager.get('database').snapshot()

  pluginManager.get('logger').info('Snapshot saved')
}