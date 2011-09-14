(function() {
  var require;
  require = function(path) {
    var module;
    module = require.modules[path];
    if (!module) {
      throw 'module ' + path + ' does not exists';
    }
    if (!module.exports) {
      module.exports = {};
      module.call(module.exports, module, module.exports, require(path));
    }
    return module.exports;
  };
  require.modules = {};
  require.register = function(path, fn) {
    return require.modules[path] = fn;
  };
  require.register('nova', function(module, exports, require) {
    return module.exports = {
      version: '0.0.1',
      author: 'Contra'
    };
  });
  require.register('fs', function(module, exports, require) {
    return module.exports = {
      readFile: function(filename, callback) {
        var contents;
        if (typeof localStorage !== "undefined" && localStorage !== null) {
          contents = localStorage.getItem(filename);
          if (contents != null) {
            return callback(JSON.parse(contents));
          }
        }
        return superagent.get(filename, function(res) {
          if (res.text) {
            return callback(res.text);
          } else {
            return callback(null);
          }
        });
      },
      readFileSync: function(filename) {
        if (!localStorage) {
          throw 'browser does not support localStorage';
        } else {
          return JSON.parse(localStorage.getItem(filename));
        }
      },
      writeFile: function(filename, data, encoding, callback) {
        if (!callback) {
          callback = encoding;
        }
        if (!localStorage) {
          return callback('browser does not support localStorage');
        } else {
          return callback(localStorage.setItem(filename, JSON.stringify(data)));
        }
      },
      writeFileSync: function(filename, data, encoding) {
        if (!localstorage) {
          throw 'browser does not support localStorage';
        } else {
          return localStorage.setItem(filename, JSON.stringify(data));
        }
      }
    };
  });
  /*
  console.log 'Starting FS tests'
  fs = require 'fs'
  fs.readFile '/bin/index.html', (txt) -> console.log txt
  fs.writeFile 'config.json', {hey:'test',what:'dood'}, (err) -> 
    if err 
      console.log err  
  fs.readFile 'config.json', (txt) -> console.log txt
  */
  require.register('readline', function(module, exports, require) {
    return module.exports = {
      question: function(query, callback) {
        return callback(prompt(query));
      }
    };
  });
  require.register('sys', function(module, exports, require) {
    return module.exports = {
      puts: console.log,
      inspect: console.log
    };
  });
  require.register('util', function(module, exports, require) {
    return module.exports = {
      debug: console.log,
      log: console.log,
      inspect: console.log
    };
  });
}).call(this);
