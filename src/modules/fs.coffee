require.register 'fs', (module, exports, require) ->
  module.exports = 
    # Any file writes/deletes/creations will take place in local storage
    # Any file reads will try local storage and then ajax request from base URL
    
    readFile: (filename, callback) ->
      if localStorage?
        contents = localStorage.getItem filename
        if contents?
          callback null, JSON.parse(contents)
          return
            
      superagent.get filename, (res) ->
        if res.text
          callback null, res.text
          return
        else
          callback 'failed to read file', null
          return
      return
            
    readFileSync: (filename) ->
      if !localStorage then throw 'browser does not support localStorage'
      return JSON.parse localStorage.getItem(filename)
        
    writeFile: (filename, data, encoding, callback) ->
      callback or= encoding
      if !localStorage then callback 'browser does not support localStorage'
      localStorage.setItem filename, JSON.stringify(data)
      if callback?
        callback null
      return
          
    writeFileSync: (filename, data, encoding) -> 
      if !localStorage then throw 'browser does not support localStorage' 
      localStorage.setItem filename, JSON.stringify(data)
      return
        
    # watchFile: (filename, options, callback) ->
              
    rename: (oldf, newf, callback) ->
      if !localStorage then throw 'browser does not support localStorage' 
      contents = localStorage.getItem oldf
      if contents?
        localStorage.removeItem oldf
        localStorage.setItem newf, contents
        if callback?
          callback null
      else
        if callback?
          callback 'file ' + oldf + ' does not exist'

# Tests
###
console.log 'Starting FS tests'
fs = require 'fs'
fs.readFile '/bin/index.html', (err, txt) -> console.log txt
fs.writeFile 'config.json', {hey:'test',what:'dood'}, (err) -> if err then console.log err  
fs.readFile 'config.json', (err, txt) -> console.log txt
fs.rename 'config.json', 'cfg.js', (err) -> console.log fs.readFileSync 'cfg.js'
###
