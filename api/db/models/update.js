'use strict';
module.exports = (sequelize, DataTypes) => {
  var update = sequelize.define('update', {
    phase: DataTypes.STRING,
    status: DataTypes.STRING,
    lastUpdated: DataTypes.DATE
  }, {});
  update.associate = function(models) {
    // associations can be defined here
  };
  return update;
};