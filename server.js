var flo = require('fb-flo'),
    path = require('path'),
    fs = require('fs');

var express = require('express')
var app = express()
app.use(express.static(__dirname))
app.listen(process.env.PORT || 3000)

var server = flo(
  '.',
  {
    port: 8888,
    host: 'localhost',
    verbose: false,
    glob: [
       // All JS files in `sourceDirToWatch` and subdirectories
      '**/*.js',
       // All CSS files in `sourceDirToWatch` and subdirectories
      '**/*.css',
      '**/*.html'
    ]
  },
  function resolver(filepath, callback) {
    // 1. Call into your compiler / bundler.
    // 2. Assuming that `bundle.js` is your output file, update `bundle.js`
    //    and `bundle.css` when a JS or CSS file changes.
    callback({
      resourceURL: filepath,
      // any string-ish value is acceptable. i.e. strings, Buffers etc.
      contents: fs.readFileSync(filepath),
      reload: true
    });
  }
);
