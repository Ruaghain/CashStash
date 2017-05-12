var log4js = require('log4js');
var config = require('../config/environment');

log4js.loadAppender('file');
log4js.configure('src/config/log4js-configuration.json', { reloadSecs: 120 });
// log4js.configure('config/log4js-configuration.json', { reloadSecs: 120 });

var logger = log4js.getLogger('cash-stash');
logger.setLevel(config.logging);

exports = module.exports = {
  log: logger,
  log4js: log4js
};
