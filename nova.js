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
            callback(null, JSON.parse(contents));
            return;
          }
        }
        superagent.get(filename, function(res) {
          if (res.text) {
            callback(null, res.text);
          } else {
            callback('failed to read file', null);
          }
        });
      },
      readFileSync: function(filename) {
        if (!localStorage) {
          throw 'browser does not support localStorage';
        }
        return JSON.parse(localStorage.getItem(filename));
      },
      writeFile: function(filename, data, encoding, callback) {
        callback || (callback = encoding);
        if (!localStorage) {
          callback('browser does not support localStorage');
        }
        localStorage.setItem(filename, JSON.stringify(data));
        if (callback != null) {
          callback(null);
        }
      },
      writeFileSync: function(filename, data, encoding) {
        if (!localStorage) {
          throw 'browser does not support localStorage';
        }
        localStorage.setItem(filename, JSON.stringify(data));
      },
      rename: function(oldf, newf, callback) {
        var contents;
        if (!localStorage) {
          throw 'browser does not support localStorage';
        }
        contents = localStorage.getItem(oldf);
        if (contents != null) {
          localStorage.removeItem(oldf);
          localStorage.setItem(newf, contents);
          if (callback != null) {
            return callback(null);
          }
        } else {
          if (callback != null) {
            return callback('file ' + oldf + ' does not exist');
          }
        }
      }
    };
  });
  /*
  console.log 'Starting FS tests'
  fs = require 'fs'
  fs.readFile '/bin/index.html', (err, txt) -> console.log txt
  fs.writeFile 'config.json', {hey:'test',what:'dood'}, (err) -> if err then console.log err  
  fs.readFile 'config.json', (err, txt) -> console.log txt
  fs.rename 'config.json', 'cfg.js', (err) -> console.log fs.readFileSync 'cfg.js'
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
