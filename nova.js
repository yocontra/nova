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
        return superagent.get(filename, function(res) {
          if (res.text) {
            return callback(res.text);
          } else {
            return console.log('Error! No content found for ' + filename);
          }
        });
      },
      writeFile: function(filename, data, encoding, callback) {
        if (encoding == null) {
          encoding = 'utf8';
        }
        return callback(err);
      }
    };
  });
  require('fs').readFile('/bin/index.html', function(txt) {
    return console.log(txt);
  });
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
