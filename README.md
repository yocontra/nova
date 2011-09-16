**Nova is a library for running NodeJS code in the browser.**

## Usage

Using Nova is as simple as including nova.js on your web page. Please not that Nova is a newborn baby and only supports certain NodeJS functionality.

## Support

Nova currently supports the following NodeJS modules:

```
events - 100%
util - 100%
assert - 100%
sys - 100%
readline - 85% (All console management functionality does nothing though)
fs - 50%
```

## Examples

You can view further examples in the [example folder.](https://github.com/wearefractal/nova/tree/master/examples)

## Dependencies

Nova only aims to be compliant with WebKit. If you want nova to work with older browsers, use [Modernizr](http://www.modernizr.com/) and [es5-shim](https://github.com/kriskowal/es5-shim) or something similar.
Developers will need coffee-script and uglify-js installed globally via npm to build nova and fusker to run the test server.

## Contributors

- [Contra](https://github.com/Contra)

## LICENSE

(MIT License)

Copyright (c) 2011 Fractal <contact@wearefractal.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
