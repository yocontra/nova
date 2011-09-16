(function() {
  var require;
  var __slice = Array.prototype.slice;
  require = function(name) {
    var module;
    module = require.modules[name];
    if (!module) {
      throw 'module ' + name + ' does not exist';
    }
    if (!module.exports) {
      module.exports = {};
      module.call(module.exports, module, module.exports, require(name));
    }
    return module.exports;
  };
  require.modules = {};
  require.register = function(name, fn) {
    return require.modules[name] = fn;
  };
  require.register('nova', function(module, exports, require) {
    return module.exports = {
      version: '0.0.1',
      author: 'Contra'
    };
  });
  require.register("events", function(module, exports, require) {
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
      (_base = this.callbacks)[event] || (_base[event] = []);
      total = this.callbacks[event].length;
      if ((total > (_ref = this.maxListeners) && _ref > 0)) {
        console.error('warning: possible EventEmitter memory leak detected. ' + total + ' listeners added. Use emitter.setMaxListeners() to increase limit.');
      } else {
        this.callbacks[event].push(fn);
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
      if (this.callbacks[event] != null) {
        delete this.callbacks[event];
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
      }
      return this;
    };
    return module.exports.EventEmitter = EventEmitter;
  });
  /*
  console.log 'Starting Events tests'
  EventEmitter = require('events').EventEmitter
  testobj = new EventEmitter
  EventEmitter.call testobj
  testobj.emit 'nobody listening :('
  testobj.on 'testevt1', (err, data) ->
    if err?
      console.error err
    console.log data
  testobj.emit 'testevt1', null, 'fake data'
  testobj.emit 'testevt1', 'fake error', null
    
  testobj.once 'testevt2', (err, data) ->
    if err?
      console.error err
    console.log data
  testobj.emit 'testevt2', null, 'fake data'
  testobj.emit 'testevt2', 'fake error', null
  console.log testobj.listeners('testevt2')
  console.log testobj.listeners('testevt1') 
    
  testobj.removeAllListeners 'testevt1'
  testobj.removeAllListeners 'testevt2'
  testobj.emit 'testevt1', null, 'fake data'
  testobj.emit 'testevt2', 'fake error', null
  */
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
      rename: function(oldf, newf, callback) {
        var contents;
        if (!localStorage) {
          throw LOCAL_STORAGE_NOT_FOUND;
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
            return callback(new Error('ENOENT, The system cannot find the file specified. ' + oldf));
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
