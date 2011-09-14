# CommonJS require() functionality
require = (path) ->
  module = require.modules[path]
  throw 'module '+path+' does not exists' unless module
  unless module.exports
    module.exports = {}
    module.call module.exports, module, module.exports, require(path)
  return module.exports
    
require.modules = {}

require.register = (path, fn) -> require.modules[path] = fn
