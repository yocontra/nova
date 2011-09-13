require.register 'fs', (module, exports, require) ->
  module.exports = 
  
    # Any file writes/deletes/creations will take place in local storage
    # Any file reads will try local storage and then ajax request from base URL
    
    readFile: (filename, callback) ->
      superagent.get filename, (res) ->
        if !res.body?
          console.log 'ERROR - ' + res
        else
          callback res
        
    writeFile: (filename, data, encoding, callback) ->
      encoding ?= 'utf8'
      callback err
