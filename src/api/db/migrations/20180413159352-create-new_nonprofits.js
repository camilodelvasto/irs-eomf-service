'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('new_nonprofits', {
      EIN: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
      },
      NAME: {
        type: Sequelize.STRING
      },
      ICO: {
        type: Sequelize.STRING
      },
      STREET: {
        type: Sequelize.STRING
      },
      CITY: {
        type: Sequelize.STRING
      },
      STATE: {
        type: Sequelize.STRING
      },
      ZIP: {
        type: Sequelize.STRING
      },
      GROUP: {
        type: Sequelize.STRING
      },
      SUBSECTION: {
        type: Sequelize.STRING
      },
      AFFILIATION: {
        type: Sequelize.STRING
      },
      CLASSIFICATION: {
        type: Sequelize.STRING
      },
      RULING: {
        type: Sequelize.STRING
      },
      DEDUCTIBILITY: {
        type: Sequelize.INTEGER
      },
      FOUNDATION: {
        type: Sequelize.STRING
      },
      ACTIVITY: {
        type: Sequelize.STRING
      },
      ORGANIZATION: {
        type: Sequelize.STRING
      },
      STATUS: {
        type: Sequelize.STRING
      },
      TAX_PERIOD: {
        type: Sequelize.STRING
      },
      ASSET_CD: {
        type: Sequelize.STRING
      },
      INCOME_CD: {
        type: Sequelize.STRING
      },
      FILING_REQ_CD: {
        type: Sequelize.STRING
      },
      PF_FILING_REQ_CD: {
        type: Sequelize.STRING
      },
      ACCT_PD: {
        type: Sequelize.STRING
      },
      ASSET_AMT: {
        type: Sequelize.BIGINT
      },
      INCOME_AMT: {
        type: Sequelize.BIGINT
      },
      REVENUE_AMT: {
        type: Sequelize.BIGINT
      },
      NTEE_CD: {
        type: Sequelize.STRING
      },
      SORT_NAME: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('new_nonprofits');
  }
};