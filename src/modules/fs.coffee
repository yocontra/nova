require.register 'fs', (module, exports, require) ->
  module.exports = 
  
    # Any file writes/deletes/creations will take place in local storage
    # Any file reads will try local storage and then ajax request from base URL
    
    readFile: (filename, callback) ->
      superagent.get filename, (res) ->
        if res.text
          callback res.text
        else
          console.log 'Error! No content found for ' + filename
        
    writeFile: (filename, data, encoding, callback) ->
      encoding ?= 'utf8'
      callback err

require('fs').readFile '/bin/index.html', (txt) -> console.log txt
