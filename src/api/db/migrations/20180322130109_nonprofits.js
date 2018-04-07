exports.up = knex => {
  return knex.schema
    .createTable('nonprofits', table => {
      table
        .integer('EIN')
        .notNullable()
        .unique();
      table.string('NAME');
      table.string('STREET');
      table.string('CITY');
      table.string('STATE');
      table.string('ZIP');
      table.string('GROUP');
      table.string('AFFILIATION');
      table.string('CLASSIFICATION');
      table.string('RULING');
      table.integer('DEDUCTIBILITY');
      table.string('ACTIVITY');
      table.string('ASSET_AMT');
      table.string('INCOME_AMT');
      table.integer('REVENUE_AMT');
      table.string('NTEE_CD');
      table.string('NTEE');
      table.string('SORT_NAME');
    });
};

exports.down = knex => {
  return knex.schema.dropTable('nonprofits');
};
