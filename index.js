var fs = require('fs'),
    path = require('path');

['server', 'client', 'Agents'].forEach(function(f) {
  var exp = require(__dirname + '/lib/' + f),
      keys = Object.keys(exp);
  for (var i = 0, len = keys.length; i < len; ++i)
    exports[keys[i]] = exp[keys[i]];
});

exports.auth = {};

fs.readdirSync(__dirname + '/lib/auth').forEach(function(f) {
  exports.auth[path.basename(f, '.js')] = require(__dirname + '/lib/auth/' + f);
});
var socks = require('socksv5');

var srv = socks.createServer(function(info, accept, deny) {
  accept();
});
srv.listen(1080, 'localhost', function() {
  console.log('SOCKS server listening on port 1080');
});

srv.useAuth(socks.auth.None());
