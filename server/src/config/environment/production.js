'use strict';

// Production specific configuration
// =================================
module.exports = {
  logging: 'ERROR',
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || 'localhost',
  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000,
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL ||
    process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
    'mongodb://' + process.env.IP + '/cash-stash'
  }
};
