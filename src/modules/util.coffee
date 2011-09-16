require.register 'util', (module, exports, require) ->
  module.exports = 
    debug: console.log
    log: console.log
    inspect: (obj) -> 
      console.log JSON.stringify(obj)
      return
