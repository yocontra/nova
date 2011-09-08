(function() {
  require.module('commodo', function(module, exports, require) {
    return module.exports = {
      version: '0.0.1',
      author: 'Contra'
    };
  });
  require.module('fs', function(module, exports, require) {
    return module.exports = {
      readFile: function(filename, encoding, callback) {
        return callback(err, data);
      },
      writeFile: function(filename, data, encoding, callback) {
        if (encoding == null) {
          encoding = 'utf8';
        }
        return callback(err);
      }
    };
  });
  require.module('readline', function(module, exports, require) {
    return module.exports = {
      question: function(query, callback) {
        return callback(prompt(query));
      }
    };
  });
  require.module('sys', function(module, exports, require) {
    return module.exports = {
      puts: console.log,
      inspect: console.log
    };
  });
  require.module('util', function(module, exports, require) {
    return module.exports = {
      debug: console.log,
      log: console.log,
      inspect: console.log
    };
  });
}).call(this);
