'use strict';

var path = require('path');
var fs = require('fs');
var url = require('url');

var connect = require('connect');
var proxy = require('proxy-middleware');

/**
 * @constructor
 * @name GiraffeWeb
 * @param {hash} options
 * @param {integer} options.port Port to start the webserver on
 * @param {string} options.graphiteUrl Graphite URL to connect to
 * @param {string} options.configFile Path for the dashboardsfile to read
 * @param {boolean} options.proxyGraphite Flag if we need to proxy Graphite requests via this webserver
 */
var GiraffeWeb = function(options) {

  var self = this;
  self.settings = options;

  self.config = self.loadConfig(options.configFile);

};

module.exports = GiraffeWeb;


/**
 * Method to read the config dashboard and replace the graphite according to settings
 * If we proxy it replaces the graphiteURL to point to this webserver/graphite
 *
 * @name loadConfig
 * @memberof GiraffeWeb
 * @public
 * @param {string} filename Filename to read the dashboard config from
 * @returns {string} The correct dashboard file with the options specified
 */

GiraffeWeb.prototype.loadConfig = function(filename) {
  var self = this;
  var settings = self.settings;

  var fileConfig = fs.readFileSync(filename, 'utf-8');

  var graphiteRegEx = /^var.*graphite_url.*\n/;
  var graphiteUrl;

  if (settings.proxyGraphite) {
    graphiteUrl = 'http://localhost:' + settings.port + '/graphite';
  } else {
    graphiteUrl = settings.graphiteUrl;
  }

  var config = fileConfig.replace(graphiteRegEx , 'var graphite_url = "'+ graphiteUrl + '";\n');

  return config;
};

/**
 * Method to launch the webserver
 *
 * - If we proxyGraphite, we will proxy the request to another Graphite HTTP server
 * - We override the dashboards.js file provided by plain Giraffe by our own dashboard file specified
 *
 * @name start
 * @memberof GiraffeWeb
 * @public
 */

GiraffeWeb.prototype.start = function() {
  var self = this;
  var settings = self.settings;
  var app = connect();

  app.use(connect.logger('dev'));
  if (settings.proxyGraphite) {
    console.log('proxying Graphite to ' + settings.graphiteUrl);
    app.use('/graphite', proxy(url.parse(settings.graphiteUrl)));
  }

  // Server dashboards.js from the config file
  app.use(function logItHandle(req, res, next) {
   if (req.url === '/dashboards.js') {
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.end(self.config);
   } else {
    next();
   }
  });

  app.use(connect.static(path.join(__dirname , '..', 'vendor', 'giraffe')));

  connect.createServer(app).listen(settings.port);

};
