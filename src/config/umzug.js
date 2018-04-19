var db = require('../api/db/models')

module.exports = {
  storage: 'sequelize',
  storageOptions: {
      sequelize: db.sequelize,
  },

  migrations: {
    params: [
      db.sequelize.getQueryInterface(), // queryInterface
      db.sequelize.constructor, // DataTypes
      function() {
        throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
      }
    ],
    path: './src/api/db/migrations',
    pattern: /\.js$/
  },

  logging: function() {
    console.log.apply(null, arguments);
  }
}