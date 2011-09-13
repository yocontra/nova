require.register 'sys', (module, exports, require) ->
  module.exports = 
    puts: console.log
    inspect: console.log
