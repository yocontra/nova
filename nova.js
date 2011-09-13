(function() {
  var require;
  require = function(p) {
    var module, path;
    path = require.resolve(p);
    module = require.modules[path];
    if (!module) {
      throw "couldn't find module for: " + p;
    }
    if (!module.exports) {
      module.exports = {};
      module.call(module.exports, module, module.exports, require.bind(path));
    }
    return module.exports;
  };
  require.modules = {};
  require.resolve = function(path) {
    if (require.modules[path]) {
      return path;
    }
    if (!path.match(/\.js$/)) {
      if (require.modules[path + ".js"]) {
        return path + ".js";
      }
      if (require.modules[path + "/index.js"]) {
        return path + "/index.js";
      }
      if (require.modules[path + "/index"]) {
        return path + "/index";
      }
    }
  };
  require.bind = function(path) {
    return function(p) {
      var fullPath, i, part, parts;
      if (!p.match(/^\./)) {
        return require(p);
      }
      fullPath = path.split("/");
      fullPath.pop();
      parts = p.split("/");
      i = 0;
      while (i < parts.length) {
        part = parts[i];
        if (part === "..") {
          fullPath.pop();
        } else {
          if (part !== ".") {
            fullPath.push(part);
          }
        }
        i++;
      }
      return require(fullPath.join("/"));
    };
  };
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
