# CommonJS require() functionality
require = (name) ->
  module = require.modules[name]
  throw 'module ' + name + ' does not exist' unless module
  unless module.exports # ghetto-caching
    module.exports = {}
    module.call module.exports, module, module.exports, require(name)
  return module.exports
    
require.modules = {}
require.register = (name, fn) -> require.modules[name] = fn
