'use strict';

// Development specific configuration
// ==================================
module.exports = {

  port: process.env.PORT || 3000,
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/cash-stash-development'
  },
  // Seed database on startup
  seedDB: true
};
