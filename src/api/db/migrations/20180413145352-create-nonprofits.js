'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('nonprofits', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      EIN: {
        type: Sequelize.INTEGER,
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('nonprofits')
  }
};