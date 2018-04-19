'use strict';
module.exports = (sequelize, DataTypes) => {
  var nonprofitsVectors = sequelize.define('nonprofits_vectors', {
    NONPROFIT_VECTOR: DataTypes.STRING,
    EIN: DataTypes.INTEGER
  }, {});
  return nonprofitsVectors;
};