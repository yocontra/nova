(function() {
  var require;
  var __slice = Array.prototype.slice;
  require = function(name) {
    var module;
    module = require.modules[name];
    if (!module) {
      throw 'module "' + name + '" does not exist';
    }
    if (!module.exports) {
      module.exports = {};
      module.call(module.exports, module, module.exports, require);
    }
    return module.exports;
  };
  require.modules = {};
  require.register = function(name, fn) {
    return require.modules[name] = fn;
  };
  window.require = require;
  require.register('nova', function(module, exports, require) {
    return module.exports = {
      version: '0.0.1',
      author: 'Contra'
    };
  });
  require.register('assert', function(module, exports, require) {
    var AssertionError, expectedException, fail, util;
    util = require('util');
    AssertionError = function(options) {
      this.name = 'AssertionError';
      this.actual = options.actual;
      this.expected = options.expected;
      this.operator = options.operator;
      this.message = options.message || [JSON.stringify(this.actual), this.operator, JSON.stringify(this.expected)].join(' ');
      if (Error.captureStackTrace) {
        console.log('capturing trace');
        return Error.captureStackTrace(this, options.stackStartFunction || fail);
      }
    };
    util.inherits(AssertionError, Error);
    AssertionError.prototype = Error.prototype;
    AssertionError.prototype.toString = function() {
      if (this.message != null) {
        return this.name + ': ' + this.message;
      } else {
        return [this.name + ':', JSON.stringify(this.actual), this.operator, JSON.stringify(this.expected)].join(' ');
      }
    };
    fail = function(actual, expected, message, operator, stackStartFunction) {
      throw new AssertionError({
        message: message,
        actual: actual,
        expected: expected,
        operator: operator,
        stackStartFunction: stackStartFunction
      });
    };
    expectedException = function(actual, expected) {
      if (!actual && !expected) {
        return false;
      } else if (expected instanceof RegExp) {
        return expected.test(actual);
      } else if (actual instanceof expected) {
        return true;
      } else if (expected.call({}, actual)) {
        return true;
      } else {
        return false;
      }
    };
    return module.exports = {
      AssertionError: AssertionError,
      fail: fail,
      ok: function(value, message) {
        if (!value) {
          return fail(value, true, message, '==', module.exports.ok);
        }
      },
      equal: function(actual, expected, message) {
        if (actual !== expected) {
          return fail(actual, expected, message, '==', module.exports.equal);
        }
      },
      notEqual: function(actual, expected, message) {
        if (actual === expected) {
          return fail(actual, expected, message, '!=', module.exports.notEqual);
        }
      },
      deepEqual: function(actual, expected, message) {
        if (actual !== expected) {
          return fail(actual, expected, message, 'deepEqual', module.exports.deepEqual);
        }
      },
      notDeepEqual: function(actual, expected, message) {
        if (actual === expected) {
          return fail(actual, expected, message, 'notDeepEqual', module.exports.notDeepEqual);
        }
      },
      strictEqual: function(actual, expected, message) {
        if (actual !== expected) {
          return fail(actual, expected, message, '===', module.exports.strictEqual);
        }
      },
      notStrictEqual: function(actual, expected, message) {
        if (actual === expected) {
          return fail(actual, expected, message, '!==', module.exports.notStrictEqual);
        }
      },
      throws: function(block, expected, message) {
        var actual;
        if (typeof expected === 'string') {
          message = expected;
          expected = null;
        }
        try {
          block();
        } catch (e) {
          actual = e;
        }
        message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');
        if (!actual) {
          fail('Missing expected exception' + message);
        }
        if (!expectedException(actual, expected)) {
          throw actual;
        }
      },
      doesNotThrow: function(block, expected, message) {
        var actual;
        if (typeof expected === 'string') {
          message = expected;
          expected = null;
        }
        try {
          block();
        } catch (e) {
          actual = e;
        }
        message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');
        if (actual && expectedException(actual, expected)) {
          fail('Got unwanted exception' + message);
        }
        if (actual) {
          throw actual;
        }
      },
      ifError: function(err) {
        if (err) {
          throw err;
        }
      }
    };
  });
  require.register('events', function(module, exports, require) {
    var EventEmitter;
    EventEmitter = function() {
      this.callbacks = {};
      return this.maxListeners = 10;
    };
    EventEmitter.prototype.listeners = function(event) {
      return this.callbacks[event];
    };
    EventEmitter.prototype.setMaxListeners = function(n) {
      return this.maxListeners = n;
    };
    EventEmitter.prototype.addListener = function(event, fn) {
      var total, _base, _ref;
      if (typeof fn !== 'function') {
        throw new Error('addListener only takes instances of Function');
      }
      (_base = this.callbacks)[event] || (_base[event] = []);
      this.callbacks[event].push(fn);
      total = this.callbacks[event].length;
      if ((total > (_ref = this.maxListeners) && _ref > 0)) {
        console.error('warning: possible EventEmitter memory leak detected. ' + total + ' listeners added. Use emitter.setMaxListeners() to increase limit.');
      }
      return this;
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function(event, fn) {
      fn._emitOnce = true;
      this.addListener(event, fn);
      return this;
    };
    EventEmitter.prototype.removeListener = function(event, fn) {
      var x, _i, _len, _ref;
      if (typeof fn !== 'function') {
        throw new Error('addListener only takes instances of Function');
      }
      if (this.callbacks[event] != null) {
        _ref = this.callbacks[event](where(x !== fn));
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          this.callbacks[event] = x;
        }
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function(event) {
      if (event != null) {
        if (this.callbacks[event] != null) {
          delete this.callbacks[event];
        }
      } else {
        this.callbacks = {};
      }
      return this;
    };
    EventEmitter.prototype.emit = function() {
      var args, event, fn, _i, _len, _ref;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (this.callbacks[event] != null) {
        _ref = this.callbacks[event];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          fn = _ref[_i];
          fn.apply(fn, args);
          if (fn._emitOnce) {
            this.callbacks[event].splice(_i, 1);
            if (this.callbacks[event].length === 0) {
              delete this.callbacks[event];
              break;
            }
          }
        }
      } else if (event === 'error') {
        if (!(args[0] != null)) {
          throw new Error("Uncaught, unspecified 'error' event.");
        } else if (args[0] instanceof Error) {
          throw args[0];
        } else {
          throw new Error(args[0]);
        }
      }
      return this;
    };
    return module.exports.EventEmitter = EventEmitter;
  });
  require.register('fs', function(module, exports, require) {
    var LOCAL_STORAGE_NOT_FOUND;
    LOCAL_STORAGE_NOT_FOUND = new Error('browser does not support localStorage');
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
          if (res.ok) {
            callback(null, res.text);
          } else {
            callback(new Error('ENOENT, The system cannot find the file specified. ' + filename), null);
          }
        });
      },
      readFileSync: function(filename) {
        if (!localStorage) {
          throw LOCAL_STORAGE_NOT_FOUND;
        }
        return JSON.parse(localStorage.getItem(filename));
      },
      writeFile: function(filename, data, encoding, callback) {
        callback || (callback = encoding);
        if (!localStorage) {
          callback;
        }
        localStorage.setItem(filename, JSON.stringify(data));
        if (callback != null) {
          callback(null);
        }
      },
      writeFileSync: function(filename, data, encoding) {
        if (!localStorage) {
          throw LOCAL_STORAGE_NOT_FOUND;
        }
        localStorage.setItem(filename, JSON.stringify(data));
      },
      rename: function(filename, newname, callback) {
        var contents;
        if (!localStorage) {
          throw LOCAL_STORAGE_NOT_FOUND;
        }
        contents = localStorage.getItem(filename);
        if (contents != null) {
          localStorage.removeItem(filename);
          localStorage.setItem(newname, contents);
          if (callback != null) {
            return callback(null);
          }
        } else {
          if (callback != null) {
            return callback(new Error('ENOENT, The system cannot find the file specified. ' + filename));
          }
        }
      }
    };
  });
  require.register('readline', function(module, exports, require) {
    return module.exports = {
      question: function(query, callback) {
        callback(prompt(query));
      }
    };
  });
  require.register('sys', function(module, exports, require) {
    return module.exports = require('util');
  });
  require.register('util', function(module, exports, require) {
    return module.exports = {
      print: console.log,
      puts: console.log,
      debug: console.debug,
      error: console.error,
      inspect: JSON.stringify,
      p: function() {
        return console.log(JSON.stringify(arguments));
      },
      log: console.log,
      pump: function() {
        return console.error('util.pump is not supported in nova at this time');
      },
      inherits: function(ctor, superCtor) {
        ctor.super_ = superCtor;
        return ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  });
}).call(this);
