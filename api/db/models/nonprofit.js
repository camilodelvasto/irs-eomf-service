'use strict';
module.exports = (sequelize, DataTypes) => {
  var nonprofits = sequelize.define('nonprofits', {
    EIN: DataTypes.BIGINT,
    NAME: DataTypes.STRING,
    STREET: DataTypes.STRING,
    CITY: DataTypes.STRING,
    STATE: DataTypes.STRING,
    ZIP: DataTypes.STRING,
    GROUP: DataTypes.STRING,
    AFFILIATION: DataTypes.STRING,
    CLASSIFICATION: DataTypes.STRING,
    RULING: DataTypes.STRING,
    DEDUCTIBILITY: DataTypes.INTEGER,
    ACTIVITY: DataTypes.STRING,
    ASSET_AMT: DataTypes.BIGINT,
    INCOME_AMT: DataTypes.BIGINT,
    REVENUE_AMT: DataTypes.BIGINT,
    NTEE_CD: DataTypes.STRING,
    SORT_NAME: DataTypes.STRING,
    validated: DataTypes.BOOLEAN
  }, {});
  return nonprofits;
};