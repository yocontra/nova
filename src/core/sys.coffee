require.register 'sys', (module, exports, require) ->
  module.exports = require 'util'
  # As of the latest node.js sys has been replaced with util
