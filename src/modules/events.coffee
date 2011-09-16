require.register "events", (module, exports, require) ->
  
  EventEmitter = ->
    @callbacks = {}
    @maxListeners = 10
    
  EventEmitter::listeners = (event) -> @callbacks[event] 
  
  EventEmitter::setMaxListeners = (n) -> @maxListeners = n
    
  EventEmitter::addListener = (event, fn) ->
    @callbacks[event] or= []
    total = @callbacks[event].length
    if total > @maxListeners > 0
      console.error 'warning: possible EventEmitter memory leak detected. '+total+' listeners added. Use emitter.setMaxListeners() to increase limit.'
    else
      @callbacks[event].push fn
    return @   
  
  EventEmitter::on = EventEmitter::addListener  
  
  EventEmitter::once = (event, fn) ->
    fn._emitOnce = true
    @addListener event, fn
    return @
    
  EventEmitter::removeListener = (event, fn) ->
    if @callbacks[event]?
      @callbacks[event] = x for x in @callbacks[event] where x != fn
    return @
    
  EventEmitter::removeAllListeners = (event) ->
    if @callbacks[event]?
      delete @callbacks[event]
    return @ 
      
  EventEmitter::emit = (event, args...) ->
    if @callbacks[event]?
      for fn in @callbacks[event]
        fn.apply fn, args
        if fn._emitOnce
          @callbacks[event].splice _i, 1
          if @callbacks[event].length is 0
            delete @callbacks[event]
            break
    return @
  
  module.exports.EventEmitter = EventEmitter
  
# Tests
###
console.log 'Starting Events tests'
EventEmitter = require('events').EventEmitter
testobj = new EventEmitter
EventEmitter.call testobj
testobj.emit 'nobody listening :('
testobj.on 'testevt1', (err, data) ->
  if err?
    console.error err
  console.log data
testobj.emit 'testevt1', null, 'fake data'
testobj.emit 'testevt1', 'fake error', null
  
testobj.once 'testevt2', (err, data) ->
  if err?
    console.error err
  console.log data
testobj.emit 'testevt2', null, 'fake data'
testobj.emit 'testevt2', 'fake error', null
console.log testobj.listeners('testevt2')
console.log testobj.listeners('testevt1') 
  
testobj.removeAllListeners 'testevt1'
testobj.removeAllListeners 'testevt2'
testobj.emit 'testevt1', null, 'fake data'
testobj.emit 'testevt2', 'fake error', null
###
