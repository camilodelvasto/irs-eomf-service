'use strict';
var db = require('../models')
var Sequelize = db.Sequelize
var sequelize = db.sequelize

module.exports = {
  up: (queryInterface, Sequelize) => {
    return sequelize.query('CREATE TABLE nonprofits_vectors ("NONPROFIT_DATA" tsvector NOT NULL, "EIN" integer NOT NULL UNIQUE, "TRIGRAM" text, "NAME" text NOT NULL);')
      .then(() => {
        return sequelize.query('CREATE EXTENSION pg_trgm')
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('nonprofits_vectors');
  }
};