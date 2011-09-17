**Nova is a library for running NodeJS code in the browser. Nova is written in coffeescript, deal with it.**

## Usage

Using nova is as simple as including nova.js on your web page. Please note that nova is a newborn baby and only supports certain NodeJS functionality. Obviously we can't run an HTTP server from IE6 and we can't initiate TCP connections from your Netscape. (or can we?)

## Size

When developing libraries for the browser, size matters. nova is currently 4.3k minified and 1.1k gzipped. NodeJS functionality in under 10k? That's cool. For comparison, jQuery is currently 91.6k. You can always pick and choose which modules are included in nova so your size may be even smaller.

## Plugins

Not only does nova plan on mapping most NodeJS functionality to the browser, we also plan on extending it! This means full support for DOM manipulation and other browser-only goodies. Say goodbye to jQuery! You can also easily write your own modules for nova (check the example folder) that extend or bring new functionality to it entirely. 

## Support

nova currently comes with the following NodeJS modules:

```
events - 100%
util - 100%
assert - 100%
sys - 100%
readline - 85% (All console management functionality does nothing though)
fs - 50% (LocalStorage filesystem models need refinement)
http - 25% (Based on superagent AJAX which needs to go)
```

## Examples

You can view further examples in the [example folder.](https://github.com/wearefractal/nova/tree/master/examples)

## Dependencies

As of now, nova only aims to be compliant with the latest browsers. A separate build will be available that is jammed packed with polyfills and shims at some point in the future. If you want nova to work with older browsers THIS MOMENT you can check out [this page by Modernizr](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills) that has a massive list of shims/polyfills.
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
