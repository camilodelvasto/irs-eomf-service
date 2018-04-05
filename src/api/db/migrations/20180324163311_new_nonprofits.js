exports.up = knex => {
  return knex.schema
    .createTable('new_nonprofits', table => {
      table
        .integer('EIN')
        .notNullable();
      table.string('NAME');
      table.string('ICO');
      table.string('STREET');
      table.string('CITY');
      table.string('STATE');
      table.string('ZIP');
      table.string('GROUP');
      table.string('SUBSECTION');
      table.string('AFFILIATION');
      table.string('CLASSIFICATION');
      table.string('RULING');
      table.integer('DEDUCTIBILITY');
      table.string('FOUNDATION');
      table.string('ACTIVITY');
      table.string('ORGANIZATION');
      table.string('STATUS');
      table.string('TAX_PERIOD');
      table.string('ASSET_CD');
      table.string('INCOME_CD');
      table.string('FILING_REQ_CD');
      table.string('PF_FILING_REQ_CD');
      table.string('ACCT_PD');
      table.string('ASSET_AMT');
      table.string('INCOME_AMT');
      table.integer('REVENUE_AMT');
      table.string('NTEE_CD');
      table.string('SORT_NAME');
    });
};

exports.down = knex => {
  return knex.schema.dropTable('new_nonprofits');
};
