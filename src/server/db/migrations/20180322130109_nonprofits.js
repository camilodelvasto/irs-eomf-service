exports.up = knex => {
  return knex.schema
    .createTable('nonprofits', table => {
      table.increments();
      table
        .integer('EIN')
        .notNullable();
      table.string('NAME');
      table.string('STREET');
      table.string('CITY');
      table.string('STATE');
      table.string('ZIP');
      table.string('GROUP');
      table.string('SUBSECTION');
      table.string('AFFILIATION');
      table.string('CLASSIFICATION');
      table.string('RULING');
      table.string('DEDUCTIBILITY');
      table.string('FOUNDATION');
      table.string('ACTIVITY');
      table.string('ORGANIZATION');
      table.string('ASSET_AMT');
      table.string('INCOME_AMT');
      table.string('REVENUE_AMT');
      table.string('NTEE_CD');
      table.string('SORT_NAME');
    });
};

exports.down = knex => {
  return knex.schema.dropTable('nonprofits');
};
