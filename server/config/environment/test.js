'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  port: process.env.PORT || 3000,
  mongo: {
    uri: 'mongodb://localhost/cash-stash-test'
  }
};
