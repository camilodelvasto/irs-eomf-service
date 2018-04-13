'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('nonprofits', {
      EIN: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
      },
      NAME: {
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
      ACTIVITY: {
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
    return queryInterface.dropTable('nonprofits');
  }
};