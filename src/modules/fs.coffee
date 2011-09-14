require.register 'fs', (module, exports, require) ->
  module.exports = 
    # Any file writes/deletes/creations will take place in local storage
    # Any file reads will try local storage and then ajax request from base URL
    
    readFile: (filename, callback) ->
      if localStorage?
        contents = localStorage.getItem filename
        if contents?
          return callback contents
      superagent.get filename, (res) ->
        if res.text
          callback res.text
        else
          callback null
            
    readFileSync: (filename) ->
      if !localStorage then throw 'browser does not support localStorage'
      else localStorage.getItem filename
        
    writeFile: (filename, data, encoding, callback) ->
      callback = encoding unless callback
      if !localStorage then callback 'browser does not support localStorage'
      else callback localStorage.setItem(filename, JSON.stringify(data))
          
    writeFileSync: (filename, data, encoding) -> 
      if !localstorage then throw 'browser does not support localStorage' 
      else localStorage.setItem filename, JSON.stringify(data)

# Tests
###
console.log 'Starting FS tests'
fs = require 'fs'
fs.readFile '/bin/index.html', (txt) -> console.log txt
fs.writeFile 'config.json', {hey:'test',what:'dood'}, (err) -> 
  if err 
    console.log err  
fs.readFile 'config.json', (txt) -> console.log txt
###
