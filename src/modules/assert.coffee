require.register 'assert', (module, exports, require) ->
  util = require 'util'
  
  AssertionError = (options) ->
    @name = 'AssertionError'
    @actual = options.actual
    @expected = options.expected
    @operator = options.operator
    @message = options.message or [JSON.stringify(@actual), @operator, JSON.stringify(@expected)].join(' ')
    if Error.captureStackTrace
      console.log 'capturing trace'
      Error.captureStackTrace @, options.stackStartFunction or fail
               
  util.inherits AssertionError, Error
  AssertionError:: = Error::
  
  AssertionError::toString = ->
    if @message?
      return @name + ': ' + @message
    else
      return  [@name + ':', JSON.stringify(@actual), @operator, JSON.stringify(@expected)].join ' '
      
  fail = (actual, expected, message, operator, stackStartFunction) ->
      throw new AssertionError
        message: message
        actual: actual
        expected: expected
        operator: operator
        stackStartFunction: stackStartFunction
  
  expectedException = (actual, expected) ->
    if !actual and !expected then return false
    else if expected instanceof RegExp then return expected.test actual
    else if actual instanceof expected then return true
    else if expected.call({}, actual) then return true
    else return false
          
  module.exports =
    AssertionError: AssertionError
    fail: fail
    ok: (value, message) -> fail value, true, message, '==', module.exports.ok unless !!value
    equal: (actual, expected, message) -> fail actual, expected, message, '==', module.exports.equal unless actual == expected
    notEqual: (actual, expected, message) -> fail actual, expected, message, '!=', module.exports.notEqual if actual == expected
    # TODO: The node.js version of these deep calls have massive amounts of junk code tied to them. Skipping it (for now)
    deepEqual: (actual, expected, message) -> fail actual, expected, message, 'deepEqual', module.exports.deepEqual unless actual is expected
    notDeepEqual: (actual, expected, message) -> fail actual, expected, message, 'notDeepEqual', module.exports.notDeepEqual if actual is expected
    strictEqual: (actual, expected, message) -> fail actual, expected, message, '===', module.exports.strictEqual  unless actual is expected
    notStrictEqual: (actual, expected, message) -> fail actual, expected, message, '!==', module.exports.notStrictEqual if actual is expected
    # This code is super messy but it conforms with the nodejs specifications... their code was worse (trust me).
    throws: (block, expected, message) ->
      if typeof expected is 'string'
        message = expected
        expected = null
      try
        block()
      catch e
        actual = e
      message = (if expected and expected.name then ' (' + expected.name + ').' else '.') + (if message then ' ' + message else '.')
      fail 'Missing expected exception' + message unless actual
      throw actual unless expectedException(actual, expected)
        
    doesNotThrow: (block, expected, message) ->
      if typeof expected is 'string'
        message = expected
        expected = null
      try
        block()
      catch e
        actual = e
      message = (if expected and expected.name then ' (' + expected.name + ').' else '.') + (if message then ' ' + message else '.')
      fail 'Got unwanted exception' + message if actual and expectedException(actual, expected)
      throw actual if actual
        
    ifError: (err) -> throw err if err
