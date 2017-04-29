var express = require('express');
var mongoose = require('mongoose');
var config = require('./environment/index');

var helmet = require('helmet');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('../utils/logging');
var bodyParser = require('body-parser');

module.exports = function (app) {
  var env = app.get('env');

  // view engine setup
  app.set('view engine', 'hbs');
  app.use(logger.log4js.connectLogger(logger.log, {
    level: config.logging,
    format: ':method :url',
    nolog: '\\.gif|\\.jpg$|\\.ico$'
  }));
  // app.use(helmet());
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type, accept, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');

    //CORS requires that an OPTIONS request is made first. Just return 200 for these.
    if ('OPTIONS' === req.method) {
      res.send(200);
    } else {
      next();
    }
  });
};
