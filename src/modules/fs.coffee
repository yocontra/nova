require.module 'fs', (module, exports, require) ->
  module.exports = 
  
    # Any file writes/deletes/creations will take place in local storage
    # Any file reads will try local storage and then ajax request from base URL
      
    readFile: (filename, encoding, callback) ->
      # If encoding is specified then this function returns a string. Otherwise it returns a buffer.
      callback err, data
        
    writeFile: (filename, data, encoding, callback) ->
      encoding ?= 'utf8'
      callback err
