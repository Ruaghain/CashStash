var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var http = require('http');
var logger = require('./utils/logging').log;

//Can I use something better than global.Promise
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
  logger.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

var app = express();
var server = http.createServer(app);

require('./config/express')(app);
require('./routes')(app);

function startServer() {
  server.listen(config.port, config.ip, function () {
    logger.info('STARTING - Express Server. Listening on port "%d", in "%s" mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;

