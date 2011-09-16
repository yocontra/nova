require.register 'fs', (module, exports, require) ->
  
  LOCAL_STORAGE_NOT_FOUND = new Error 'browser does not support localStorage'
  
  module.exports = 
    # Attempts localStorage and then ajax request from base URL if no file is found
    readFile: (filename, callback) ->
      if localStorage?
        contents = localStorage.getItem filename
        if contents?
          callback null, JSON.parse(contents)
          return
            
      superagent.get filename, (res) ->
        if res.ok
          callback null, res.text
          return
        else
          callback new Error('ENOENT, The system cannot find the file specified. ' + filename), null
          return
      return
    
    # Only supports localStorage        
    readFileSync: (filename) ->
      if !localStorage then throw LOCAL_STORAGE_NOT_FOUND
      return JSON.parse localStorage.getItem(filename)
    
    # Only supports localStorage     
    writeFile: (filename, data, encoding, callback) ->
      callback or= encoding
      if !localStorage then callback 
      localStorage.setItem filename, JSON.stringify(data)
      if callback?
        callback null
      return
    
    # Only supports localStorage      
    writeFileSync: (filename, data, encoding) -> 
      if !localStorage then throw LOCAL_STORAGE_NOT_FOUND
      localStorage.setItem filename, JSON.stringify(data)
      return
    
    # Only supports localStorage     
    # watchFile: (filename, options, callback) ->
    
    # Only supports localStorage           
    rename: (oldf, newf, callback) ->
      if !localStorage then throw LOCAL_STORAGE_NOT_FOUND
      contents = localStorage.getItem oldf
      if contents?
        localStorage.removeItem oldf
        localStorage.setItem newf, contents
        if callback?
          callback null
      else
        if callback?
          callback new Error('ENOENT, The system cannot find the file specified. ' + oldf)

# Tests
###
console.log 'Starting FS tests'
fs = require 'fs'
fs.readFile '/bin/index.html', (err, txt) -> console.log txt
fs.writeFile 'config.json', {hey:'test',what:'dood'}, (err) -> if err then console.log err  
fs.readFile 'config.json', (err, txt) -> console.log txt
fs.rename 'config.json', 'cfg.js', (err) -> console.log fs.readFileSync 'cfg.js'
###
