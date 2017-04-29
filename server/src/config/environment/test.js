'use strict';

// Test specific configuration
// ===========================
module.exports = {
  logging: 'ERROR',
  // MongoDB connection options
  port: process.env.PORT || 3000,
  mongo: {
    uri: 'mongodb://' + process.env.IP + '/cash-stash-test'
  }
};
