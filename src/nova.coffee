# CommonJS require() functionality
require = (p) ->
  path = require.resolve(p)
  module = require.modules[path]
  throw ("couldn't find module for: " + p)  unless module
  unless module.exports
    module.exports = {}
    module.call module.exports, module, module.exports, require.bind(path)
  module.exports
    
require.modules = {}

require.resolve = (path) ->
  return path  if require.modules[path]
  unless path.match(/\.js$/)
    return path + ".js"  if require.modules[path + ".js"]
    return path + "/index.js"  if require.modules[path + "/index.js"]
    path + "/index"  if require.modules[path + "/index"]

require.bind = (path) ->
  (p) ->
    return require(p)  unless p.match(/^\./)
    fullPath = path.split("/")
    fullPath.pop()
    parts = p.split("/")
    i = 0
    
    while i < parts.length
      part = parts[i]
      if part == ".."
        fullPath.pop()
      else fullPath.push part  unless part == "."
      i++
    require fullPath.join("/")

require.register = (path, fn) ->
  require.modules[path] = fn

require.register 'nova', (module, exports, require) ->
  module.exports = 
    version: '0.0.1'
    author: 'Contra'
