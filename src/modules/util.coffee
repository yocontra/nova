require.register 'util', (module, exports, require) ->
  module.exports = 
    print: console.log
    puts: console.log
    debug: console.debug
    error: console.error
    inspect: JSON.stringify
    p: -> console.log JSON.stringify arguments
    log: console.log
    pump: -> console.error 'util.pump is not supported in nova at this time'
    inherits: (ctor, superCtor) ->
      ctor.super_ = superCtor
      ctor:: = Object.create superCtor::, 
        constructor: 
          value: ctor
          enumerable: false
          writable: true
          configurable: true
