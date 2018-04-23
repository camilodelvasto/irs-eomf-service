'use strict';
module.exports = (sequelize, DataTypes) => {
  var newNonprofits = sequelize.define('new_nonprofits', {
    EIN: DataTypes.BIGINT,
    NAME: DataTypes.STRING,
    ICO: DataTypes.STRING,
    STREET: DataTypes.STRING,
    CITY: DataTypes.STRING,
    STATE: DataTypes.STRING,
    ZIP: DataTypes.STRING,
    GROUP: DataTypes.STRING,
    SUBSECTION: DataTypes.STRING,
    AFFILIATION: DataTypes.STRING,
    CLASSIFICATION: DataTypes.STRING,
    RULING: DataTypes.STRING,
    DEDUCTIBILITY: DataTypes.INTEGER,
    FOUNDATION: DataTypes.STRING,
    ACTIVITY: DataTypes.STRING,
    ORGANIZATION: DataTypes.STRING,
    STATUS: DataTypes.STRING,
    TAX_PERIOD: DataTypes.STRING,
    ASSET_CD: DataTypes.STRING,
    INCOME_CD: DataTypes.STRING,
    FILING_REQ_CD: DataTypes.STRING,
    PF_FILING_REQ_CD: DataTypes.STRING,
    ACCT_PD: DataTypes.STRING,
    ASSET_AMT: DataTypes.BIGINT,
    INCOME_AMT: DataTypes.BIGINT,
    REVENUE_AMT: DataTypes.BIGINT,
    NTEE_CD: DataTypes.STRING,
    SORT_NAME: DataTypes.STRING,
  }, {});
  return newNonprofits;
};