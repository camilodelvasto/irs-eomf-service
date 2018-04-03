exports.seed = knex => {
  return knex('nonprofits')
    .del()
    .then(() => {
      return knex('nonprofits').insert({
        EIN: 10018555,
        NAME: 'ALPHA TAU OMEGA FRATERNITY',
        STREET: '81 COLLEGE AVE',
        CITY: 'ORONO',
        STATE: 'ME',
        ZIP: '04473-4210',
        GROUP: 287,
        SUBSECTION: 7,
        AFFILIATION: 9,
        CLASSIFICATION: 100,
        DEDUCTIBILITY: 2,
        FOUNDATION: 0,
        ACTIVITY: 263000000,
        ORGANIZATION: 5,
        ASSET_AMT: 0,
        INCOME_AMT: 0,
        REVENUE_AMT: 0,
        NTEE_CD: '',
        SORT_NAME: 'BETA UPSILION MAINE-ORONO',
      });
    })
    .then(() => {
      return knex('nonprofits').insert({
        EIN: 10018605,
        NAME: 'AMALGAMATED TRANSIT UNION',
        STREET: 'PO BOX 979',
        CITY: 'PORTLAND',
        STATE: 'ME',
        ZIP: '04104-0979',
        GROUP: 155,
        SUBSECTION: 7,
        AFFILIATION: 9,
        CLASSIFICATION: 100,
        DEDUCTIBILITY: 2,
        FOUNDATION: 0,
        ACTIVITY: 263000000,
        ORGANIZATION: 5,
        ASSET_AMT: 31782,
        INCOME_AMT: 75329,
        REVENUE_AMT: 75329,
        NTEE_CD: 'A69Z',
        SORT_NAME: '714 LOCAL',
      });
    })
    .then(() => {
      return knex('nonprofits').insert({
        EIN: 10018922,
        NAME: 'AMERICAN LEGION AUXILIARY',
        STREET: '5 VERTI DRIVE SUITE B',
        CITY: 'WINSLOW',
        STATE: 'NJ',
        ZIP: '04901-0727',
        GROUP: 964,
        SUBSECTION: 7,
        AFFILIATION: 9,
        CLASSIFICATION: 100,
        DEDUCTIBILITY: 2,
        FOUNDATION: 0,
        ACTIVITY: 263000000,
        ORGANIZATION: 5,
        ASSET_AMT: 224203,
        INCOME_AMT: 272883,
        REVENUE_AMT: 272883,
        NTEE_CD: '',
        SORT_NAME: '',
      });
    })
    .then(() => {
      return knex('nonprofits').insert({
        EIN: 10211501,
        NAME: 'EASTERN MAINE HEALTHCARE SYSTEMS',
        STREET: '5 VERTI DRIVE SUITE B',
        CITY: 'WINSLOW',
        STATE: 'NJ',
        ZIP: '04901-0727',
        GROUP: 964,
        SUBSECTION: 7,
        AFFILIATION: 9,
        CLASSIFICATION: 100,
        DEDUCTIBILITY: 2,
        FOUNDATION: 0,
        ACTIVITY: 263000000,
        ORGANIZATION: 5,
        ASSET_AMT: 224203,
        INCOME_AMT: 272883,
        REVENUE_AMT: 272883,
        NTEE_CD: '',
        SORT_NAME: 'EASTERN MAINE MEDICAL CENTER',
      });
    })
    .then(() => {
      return knex('nonprofits').insert({
        EIN: 10238552,
        NAME: 'MAINE MEDICAL CENTER',
        STREET: '5 VERTI DRIVE SUITE B',
        CITY: 'WINSLOW',
        STATE: 'NJ',
        ZIP: '04901-0727',
        GROUP: 964,
        SUBSECTION: 7,
        AFFILIATION: 9,
        CLASSIFICATION: 100,
        DEDUCTIBILITY: 2,
        FOUNDATION: 0,
        ACTIVITY: 263000000,
        ORGANIZATION: 5,
        ASSET_AMT: 224203,
        INCOME_AMT: 272883,
        REVENUE_AMT: 272883,
        NTEE_CD: '',
        SORT_NAME: '',
      });
    })
    .then(() => {
      return knex('nonprofits').insert({
        EIN: 10211534,
        NAME: 'MERCY HOSPITAL',
        STREET: '5 VERTI DRIVE SUITE B',
        CITY: 'WINSLOW',
        STATE: 'NJ',
        ZIP: '04901-0727',
        GROUP: 964,
        SUBSECTION: 7,
        AFFILIATION: 9,
        CLASSIFICATION: 100,
        DEDUCTIBILITY: 2,
        FOUNDATION: 0,
        ACTIVITY: 263000000,
        ORGANIZATION: 5,
        ASSET_AMT: 224203,
        INCOME_AMT: 272883,
        REVENUE_AMT: 272883,
        NTEE_CD: '',
        SORT_NAME: 'ATTN PAYROLL DEPT',
      });
    })
    .then(() => {
      return knex('nonprofits').insert({
        EIN: 10211494,
        NAME: 'CENTRAL MAINE MEDICAL CENTER',
        STREET: '5 VERTI DRIVE SUITE B',
        CITY: 'WINSLOW',
        STATE: 'NJ',
        ZIP: '04901-0727',
        GROUP: 964,
        SUBSECTION: 7,
        AFFILIATION: 9,
        CLASSIFICATION: 100,
        DEDUCTIBILITY: 2,
        FOUNDATION: 0,
        ACTIVITY: 263000000,
        ORGANIZATION: 5,
        ASSET_AMT: 224203,
        INCOME_AMT: 272883,
        REVENUE_AMT: 272883,
        NTEE_CD: '',
        SORT_NAME: '',
      });
    })
    .then(() => {
      return knex('nonprofits').insert({
        EIN: 10353275,
        NAME: 'MARTINS POINT HEALTH CARE INC',
        STREET: '5 VERTI DRIVE SUITE B',
        CITY: 'WINSLOW',
        STATE: 'NJ',
        ZIP: '04901-0727',
        GROUP: 964,
        SUBSECTION: 7,
        AFFILIATION: 9,
        CLASSIFICATION: 100,
        DEDUCTIBILITY: 2,
        FOUNDATION: 0,
        ACTIVITY: 263000000,
        ORGANIZATION: 5,
        ASSET_AMT: 224203,
        INCOME_AMT: 272883,
        REVENUE_AMT: 272883,
        NTEE_CD: '',
        SORT_NAME: '',
      });
    })
    .then(() => {
      return knex('nonprofits').insert({
        EIN: 10211513,
        NAME: 'JACKSON LABORATORY',
        STREET: '5 VERTI DRIVE SUITE B',
        CITY: 'WINSLOW',
        STATE: 'NJ',
        ZIP: '04901-0727',
        GROUP: 964,
        SUBSECTION: 7,
        AFFILIATION: 9,
        CLASSIFICATION: 100,
        DEDUCTIBILITY: 2,
        FOUNDATION: 0,
        ACTIVITY: 263000000,
        ORGANIZATION: 5,
        ASSET_AMT: 224203,
        INCOME_AMT: 272883,
        REVENUE_AMT: 272883,
        NTEE_CD: '',
        SORT_NAME: '',
      });
    })
    .then(() => {
      return knex('nonprofits').insert({
        EIN: 10179500,
        NAME: 'SOUTHERN MAINE HEALTH CARE',
        STREET: '5 VERTI DRIVE SUITE B',
        CITY: 'WINSLOW',
        STATE: 'NJ',
        ZIP: '04901-0727',
        GROUP: 964,
        SUBSECTION: 7,
        AFFILIATION: 9,
        CLASSIFICATION: 100,
        DEDUCTIBILITY: 2,
        FOUNDATION: 0,
        ACTIVITY: 263000000,
        ORGANIZATION: 5,
        ASSET_AMT: 224203,
        INCOME_AMT: 272883,
        REVENUE_AMT: 272883,
        NTEE_CD: '',
        SORT_NAME: '',
      });
    })
    .then(() => {
      return knex('nonprofits').insert({
        EIN: 10211810,
        NAME: 'UNIVERSITY OF NEW ENGLAND',
        STREET: '5 VERTI DRIVE SUITE B',
        CITY: 'WINSLOW',
        STATE: 'NJ',
        ZIP: '04901-0727',
        GROUP: 964,
        SUBSECTION: 7,
        AFFILIATION: 9,
        CLASSIFICATION: 100,
        DEDUCTIBILITY: 2,
        FOUNDATION: 0,
        ACTIVITY: 263000000,
        ORGANIZATION: 5,
        ASSET_AMT: 224203,
        INCOME_AMT: 272883,
        REVENUE_AMT: 272883,
        NTEE_CD: '',
        SORT_NAME: '',
      });
    });
};
