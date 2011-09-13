require.register 'util', (module, exports, require) ->
  module.exports = 
    debug: console.log
    log: console.log
    inspect: console.log
