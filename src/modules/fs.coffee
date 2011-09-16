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
    rename: (filename, newname, callback) ->
      if !localStorage then throw LOCAL_STORAGE_NOT_FOUND
      contents = localStorage.getItem filename
      if contents?
        localStorage.removeItem filename
        localStorage.setItem newname, contents
        if callback?
          callback null
      else
        if callback?
          callback new Error('ENOENT, The system cannot find the file specified. ' + filename)
