const express = require('express');
const router = express.Router();
const queries = require('../../db/queries/nonprofits');
const csv = require('csv-stream');
const request = require('request');
const knex = require('../../../config/pg');

// TODO
// write tests
// move parsing of file to another file
// - post a success or error message after import: fix count
// - use socket IO to update client while performing the updates
// - update 'nonprofits' table with new data & clean up file: remove extra columns not needed when updating the main table
// - compare and create diff for endpoint
// prevent update to be performed if not authenticated for that endpoint (update)
// prevent the process to start over again if the request is repeated (also, do not download the files)
// - repeat for all the 4 files

const timeout = require('connect-timeout');

router.use(timeout(6000000));
router.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

router.get('/', async function(req, res, next) {
  try {
    const a3 = await queries.clearDB('nonprofits');
    const a4 = await updateDB(a3);

    const count = await queries.getCount('nonprofits', a4);
    if (count.length) {
      res.status(200)
      res.json({
        status: 'success',
        message: 'Update performed successfully',
        count: parseInt(count[0].count, 10),        
      })
    } else {
      res.json({
        status: 'error',
        message: 'Update was not completed'
      })
    }
  } catch (err) {
    console.log(err);
  }
});

function compareBatch(index, batchCount) {
  return new Promise(async resolve => {
    try {
      var batchSize = 1000
      var batch = await knex('new_nonprofits').select('*').limit(batchSize).offset(batchSize * index)
      .then(batch => {
        // fix for 1.5M+ rows (client ): DONE.
        // remove unused keys
        // decode/parse some columns
        // create diff?
        console.log(index, batch[0].EIN)
        console.log('batch.length: ', batch.length)

        // Remove all nonprofits with a non 1 deductibility code.
        var newBatch = batch.filter(nonprofit => {
          return nonprofit.DEDUCTIBILITY === 1
        })
        console.log('newBatch.length: ', newBatch.length)

        newBatch.forEach(nonprofit => {
          delete nonprofit.ICO
          delete nonprofit.STATUS
          delete nonprofit.TAX_PERIOD
          delete nonprofit.ASSET_CD
          delete nonprofit.INCOME_CD
          delete nonprofit.FILING_REQ_CD
          delete nonprofit.PF_FILING_REQ_CD
          delete nonprofit.ACCT_PD
          delete nonprofit.FOUNDATION
          delete nonprofit.ORGANIZATION

          // Parse data following IRS infosheet
          var classification = nonprofit.CLASSIFICATION.split('')
          var classificationAsText = []
          switch (nonprofit.SUBSECTION) {
            case "01":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Government Instrumentality')
                    break;
                }
              })
              break;
            case "02":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Title-Holding Corporation')
                    break;
                }
              })
              break;
            case "03":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Charitable Organization')
                    break;
                  case "2": 
                    classificationAsText.push('Educational Organization')
                    break;
                  case "3": 
                    classificationAsText.push('Literary Organization')
                    break;
                  case "4": 
                    classificationAsText.push('Organization to Prevent Cruelty to Animals')
                    break;
                  case "5": 
                    classificationAsText.push('Organization to Prevent Cruelty to Children')
                    break;
                  case "6": 
                    classificationAsText.push('Organization for Public Safety Testing')
                    break;
                  case "7": 
                    classificationAsText.push('Religious Organization')
                    break;
                  case "8": 
                    classificationAsText.push('Scientific Organization')
                    break;
                }
              })
              break;
            case "04":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Civic League')
                    break;
                  case "2": 
                    classificationAsText.push('Local Association of Employees')
                    break;
                  case "3": 
                    classificationAsText.push('Social Welfare Organization')
                    break;
                }
              })
              break;
            case "05":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Agricultural Organization')
                    break;
                  case "2": 
                    classificationAsText.push('Horticultural Organization')
                    break;
                  case "3": 
                    classificationAsText.push('Labor Organization')
                    break;
                }
              })
              break;
            case "06":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Board of Trade')
                    break;
                  case "2": 
                    classificationAsText.push('Business League')
                    break;
                  case "3": 
                    classificationAsText.push('Chamber of Commerce')
                    break;
                  case "4": 
                    classificationAsText.push('Real Estate Board')
                    break;
                }
              })
              break;
            case "07":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Pleasure, Recreational, or Social Club')
                    break;
                }
              })
              break;
            case "08":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Fraternal Beneficiary Society, Order or Association')
                    break;
                }
              })
              break;
            case "09":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Voluntary Employees\' Beneficiary Association (Non-Govt. Emps.)')
                    break;
                  case "2": 
                    classificationAsText.push('Voluntary Employees\' Beneficiary Association (Govt. Emps.)')
                    break;
                }
              })
              break;
            case "10":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Domestic Fraternal Societies and Associations')
                    break;
                }
              })
              break;
            case "11":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Teachers Retirement Fund Assoc')
                    break;
                }
              })
              break;
            case "12":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Benevolent Life Insurance Assoc.')
                    break;
                  case "2": 
                    classificationAsText.push('Mutual Ditch or Irrigation Co.')
                    break;
                  case "3": 
                    classificationAsText.push('Mutual Cooperative Telephone Co.')
                    break;
                  case "4": 
                    classificationAsText.push('Organization Like Those on Three Preceding Lines')
                    break;
                }
              })
              break;
            case "13":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Burial Association')
                    break;
                  case "2": 
                    classificationAsText.push('Cemetery Company')
                    break;
                }
              })
              break;
            case "14":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Credit Union')
                    break;
                  case "2": 
                    classificationAsText.push('Other Mutual Corp. or Assoc.')
                    break;
                }
              })
              break;
            case "15":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Mutual Insurance Company or Assoc. Other Than Life or Marine')
                    break;
                }
              })
              break;
            case "16":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Corp. Financing Crop Operations')
                    break;
                }
              })
              break;
            case "17":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Supplemental Unemployment Compensation Trust or Plan')
                    break;
                }
              })
              break;
            case "18":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Employee Funded Pension Trust (Created Before 6/25/59)')
                    break;
                }
              })
              break;
            case "19":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Post or Organization of War Veterans')
                    break;
                }
              })
              break;
            case "20":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Legal Service Organization')
                    break;
                }
              })
              break;
            case "21":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Black Lung Trust')
                    break;
                }
              })
              break;
            case "22":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Multiemployer Pension Plan')
                    break;
                }
              })
              break;
            case "23":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Veterans Assoc. Formed Prior to 1880')
                    break;
                }
              })
              break;
            case "24":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Trust Described in Sect. 4049 of ERISA')
                    break;
                }
              })
              break;
            case "25":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Title Holding Co. for Pensions, etc.')
                    break;
                }
              })
              break;
            case "26":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('State-Sponsored High Risk Health Insurance Organizations')
                    break;
                }
              })
              break;
            case "27":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('State-Sponsored Workers\' Compensation Reinsurance')
                    break;
                }
              })
              break;
            case "29":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('ACA 1322 Qualified Nonprofit Health Insurance Issuers')
                    break;
                }
              })
              break;
            case "40":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Apostolic and Religious Org. (501(d))')
                    break;
                }
              })
              break;
            case "50":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Cooperative Hospital Service Organization (501(e))')
                    break;
                }
              })
              break;
            case "60":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Cooperative Service Organization of Operating Educational Organization (501(f))')
                    break;
                }
              })
              break;
            case "70":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Child Care Organization (501(k))')
                    break;
                }
              })
              break;
            case "71":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Charitable Risk Pool')
                    break;
                }
              })
              break;
            case "81":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('Qualified State-Sponsored Tuition Program')
                    break;
                }
              })
              break;
            case "92":
              classification.forEach((code) => {
                switch (code) {
                  case "1": 
                    classificationAsText.push('4947(a)(1) - Private Foundation (Form 990PF Filer)')
                    break;
                }
              })
              break;
          }
          nonprofit.CLASSIFICATION = classificationAsText.join('; ')
          delete nonprofit.SUBSECTION

          var activity = nonprofit.ACTIVITY.match(/.{3}/g)
          var activityAsText = []
          activity.forEach(value => {
            switch (value) {
              case "001":
                activityAsText.push('Church, synagogue, etc')
                break;
              case "002":
                activityAsText.push('Association or convention of churches')
                break;
              case "003":
                activityAsText.push('Religious order')
                break;
              case "004":
                activityAsText.push('Church auxiliary')
                break;
              case "005":
                activityAsText.push('Mission')
                break;
              case "006":
                activityAsText.push('Missionary activities')
                break;
              case "007":
                activityAsText.push('Evangelism')
                break;
              case "008":
                activityAsText.push('Religious publishing activities')
                break;
              case "029":
                activityAsText.push('Other religious activities')
                break;
              case "030":
                activityAsText.push('School, college, trade school, etc.')
                break;
              case "031":
                activityAsText.push('Special school for the blind, handicapped, etc.')
                break;
              case "032":
                activityAsText.push('Nursery school')
                break;
              case "033":
                activityAsText.push('Faculty group')
                break;
              case "034":
                activityAsText.push('Alumni association or group')
                break;
              case "035":
                activityAsText.push('Parent or parent-teachers association')
                break;
              case "036":
                activityAsText.push('Fraternity or sorority')
                break;
              case "037":
                activityAsText.push('Other student society or group')
                break;
              case "038":
                activityAsText.push('School or college athletic association')
                break;
              case "039":
                activityAsText.push('Scholarships for children of employees')
                break;
              case "040":
                activityAsText.push('Scholarships (other)')
                break;
              case "041":
                activityAsText.push('Student loans')
                break;
              case "042":
                activityAsText.push('Student housing activities')
                break;
              case "043":
                activityAsText.push('Other student aid')
                break;
              case "044":
                activityAsText.push('Student exchange with foreign country')
                break;
              case "045":
                activityAsText.push('Student operated business')
                break;
              case "046":
                activityAsText.push('Private school')
                break;
              case "059":
                activityAsText.push('Other school related activities')
                break;
              case "060":
                activityAsText.push('Museum, zoo, planetarium, etc.')
                break;
              case "061":
                activityAsText.push('Library')
                break;
              case "062":
                activityAsText.push('Historical site, records or reenactment')
                break;
              case "063":
                activityAsText.push('Monument')
                break;
              case "064":
                activityAsText.push('Commemorative event (centennial, festival, pageant, etc.)')
                break;
              case "065":
                activityAsText.push('Fair')
                break;
              case "088":
                activityAsText.push('Community theatrical group')
                break;
              case "089":
                activityAsText.push('Singing society or group')
                break;
              case "090":
                activityAsText.push('Cultural performances')
                break;
              case "091":
                activityAsText.push('Art exhibit')
                break;
              case "092":
                activityAsText.push('Literary activities')
                break;
              case "093":
                activityAsText.push('Cultural exchanges with foreign country')
                break;
              case "094":
                activityAsText.push('Genealogical activities')
                break;
              case "119":
                activityAsText.push('Other cultural or historical activities')
                break;
              case "120":
                activityAsText.push('Publishing activities')
                break;
              case "121":
                activityAsText.push('Radio or television broadcasting')
                break;
              case "122":
                activityAsText.push('Producing films')
                break;
              case "123":
                activityAsText.push('Discussion groups, forums, panels lectures, etc.')
                break;
              case "124":
                activityAsText.push('Study and research (non-scientific)')
                break;
              case "125":
                activityAsText.push('Giving information or opinion (see also Advocacy)')
                break;
              case "126":
                activityAsText.push('Apprentice training')
                break;
              case "149":
                activityAsText.push('Other instruction and training')
                break;
              case "150":
                activityAsText.push('Hospital')
                break;
              case "151":
                activityAsText.push('Hospital auxiliary')
                break;
              case "152":
                activityAsText.push('Nursing or convalescent home')
                break;
              case "153":
                activityAsText.push('Care and housing for the aged')
                break;
              case "154":
                activityAsText.push('Health clinic')
                break;
              case "155":
                activityAsText.push('Rural medical facility')
                break;
              case "156":
                activityAsText.push('Blood bank')
                break;
              case "157":
                activityAsText.push('Cooperative hospital service organization')
                break;
              case "158":
                activityAsText.push('Rescue and emergency service')
                break;
              case "159":
                activityAsText.push('Nurses register or bureau')
                break;
              case "160":
                activityAsText.push('Aid to the handicapped')
                break;
              case "161":
                activityAsText.push('Scientific research (diseases)')
                break;
              case "162":
                activityAsText.push('Other medical research')
                break;
              case "163":
                activityAsText.push('Health insurance (medical, dental, optical, etc.)')
                break;
              case "164":
                activityAsText.push('Prepared group health plan')
                break;
              case "165":
                activityAsText.push('Community health planning')
                break;
              case "166":
                activityAsText.push('Mental health care')
                break;
              case "167":
                activityAsText.push('Group medical practice association')
                break;
              case "168":
                activityAsText.push('In-faculty group practice association')
                break;
              case "169":
                activityAsText.push('Hospital pharmacy, parking facility, food services, etc.')
                break;
              case "179":
                activityAsText.push('Other health services')
                break;
              case "180":
                activityAsText.push('Contact or sponsored scientific research for industry')
                break;
              case "181":
                activityAsText.push('Scientific research for government')
                break;
              case "199":
                activityAsText.push('Other scientific research activities')
                break;
              case "200":
                activityAsText.push('Business promotion (chamber of commerce, business league, etc.)')
                break;
              case "201":
                activityAsText.push('Real estate association')
                break;
              case "202":
                activityAsText.push('Board of trade')
                break;
              case "203":
                activityAsText.push('Regulating business')
                break;
              case "204":
                activityAsText.push('Promotion of fair business practices')
                break;
              case "205":
                activityAsText.push('Professional association')
                break;
              case "206":
                activityAsText.push('Professional association auxiliary')
                break;
              case "207":
                activityAsText.push('Industry trade shows')
                break;
              case "208":
                activityAsText.push('Convention displays')
                break;
              case "209":
                activityAsText.push('Research, development and testing')
                break;
              case "210":
                activityAsText.push('Professional athletic league')
                break;
              case "211":
                activityAsText.push('Underwriting municipal insurance')
                break;
              case "212":
                activityAsText.push('Assigned risk insurance activities')
                break;
              case "213":
                activityAsText.push('Tourist bureau')
                break;
              case "229":
                activityAsText.push('Other business or professional group')
                break;
              case "230":
                activityAsText.push('Farming')
                break;
              case "231":
                activityAsText.push('Farm bureau')
                break;
              case "232":
                activityAsText.push('Agricultural group')
                break;
              case "233":
                activityAsText.push('Horticultural group')
                break;
              case "234":
                activityAsText.push('Farmers cooperative marketing or purchasing')
                break;
              case "235":
                activityAsText.push('Farmers cooperative marketing or purchasing')
                break;
              case "236":
                activityAsText.push('Dairy herd improvement association')
                break;
              case "237":
                activityAsText.push('Breeders association')
                break;
              case "249":
                activityAsText.push('Other farming and related activities')
                break;
              case "250":
                activityAsText.push('Mutual ditch, irrigation, telephone, electric company or like organization')
                break;
              case "251":
                activityAsText.push('Credit union')
                break;
              case "252":
                activityAsText.push('Reserve funds or insurance for domestic building and loan association, cooperative bank, or mutual savings bank')
                break;
              case "253":
                activityAsText.push('Mutual insurance company')
                break;
              case "254":
                activityAsText.push('Corporation organized under an Act of Congress')
                break;
              case "259":
                activityAsText.push('Other mutual organization')
                break;
              case "260":
                activityAsText.push('Fraternal Beneficiary society, order, or association')
                break;
              case "261":
                activityAsText.push('Improvement of conditions of workers')
                break;
              case "262":
                activityAsText.push('Association of municipal employees')
                break;
              case "263":
                activityAsText.push('Association of employees')
                break;
              case "264":
                activityAsText.push('Employee or member welfare association')
                break;
              case "265":
                activityAsText.push('Sick, accident, death, or similar benefits')
                break;
              case "266":
                activityAsText.push('Strike benefits')
                break;
              case "267":
                activityAsText.push('Unemployment benefits')
                break;
              case "268":
                activityAsText.push('Pension or retirement benefits')
                break;
              case "269":
                activityAsText.push('Vacation benefits')
                break;
              case "279":
                activityAsText.push('Other services or benefits to members or employees')
                break;
              case "280":
                activityAsText.push('Country club')
                break;
              case "281":
                activityAsText.push('Hobby club')
                break;
              case "282":
                activityAsText.push('Dinner club')
                break;
              case "283":
                activityAsText.push('Variety club')
                break;
              case "284":
                activityAsText.push('Dog club')
                break;
              case "285":
                activityAsText.push('Women\'s club')
                break;
              case "286":
                activityAsText.push('Hunting or fishing club')
                break;
              case "287":
                activityAsText.push('Swimming or tennis club')
                break;
              case "288":
                activityAsText.push('Other sports club')
                break;
              case "296":
                activityAsText.push('Community center')
                break;
              case "297":
                activityAsText.push('Community recreational facilities (park, playground, etc)')
                break;
              case "298":
                activityAsText.push('Training in sports')
                break;
              case "299":
                activityAsText.push('Travel tours')
                break;
              case "300":
                activityAsText.push('Amateur athletic association')
                break;
              case "301":
                activityAsText.push('Fundraising athletic or sports event')
                break;
              case "317":
                activityAsText.push('Other sports or athletic activities')
                break;
              case "318":
                activityAsText.push('Other recreational activities')
                break;
              case "319":
                activityAsText.push('Other social activities')
                break;
              case "320":
                activityAsText.push('Boy Scouts, Girl Scouts, etc.')
                break;
              case "321":
                activityAsText.push('Boys Club, Little League, etc.')
                break;
              case "322":
                activityAsText.push('FFA, FHA, 4-H club, etc.')
                break;
              case "323":
                activityAsText.push('Key club')
                break;
              case "324":
                activityAsText.push('YMCA, YWCA, YMCA, etc.')
                break;
              case "325":
                activityAsText.push('Camp')
                break;
              case "326":
                activityAsText.push('Care and housing of children (orphanage, etc)')
                break;
              case "327":
                activityAsText.push('Prevention of cruelty to children')
                break;
              case "328":
                activityAsText.push('Combat juvenile delinquency')
                break;
              case "349":
                activityAsText.push('Other youth organization or activities')
                break;
              case "350":
                activityAsText.push('Preservation of natural resources (conservation)')
                break;
              case "351":
                activityAsText.push('Combating or preventing pollution (air, water, etc)')
                break;
              case "352":
                activityAsText.push('Land acquisition for preservation')
                break;
              case "353":
                activityAsText.push('Soil or water conservation')
                break;
              case "354":
                activityAsText.push('Preservation of scenic beauty')
                break;
              case "355":
                activityAsText.push('Wildlife sanctuary or refuge')
                break;
              case "356":
                activityAsText.push('Garden club')
                break;
              case "379":
                activityAsText.push('Other conservation, environmental or beautification activities')
                break;
              case "380":
                activityAsText.push('Low-income housing')
                break;
              case "381":
                activityAsText.push('Low and moderate income housing')
                break;
              case "382":
                activityAsText.push('Housing for the aged')
                break;
              case "398":
                activityAsText.push('Instruction and guidance on housing')
                break;
              case "399":
                activityAsText.push('Other housing activities')
                break;
              case "400":
                activityAsText.push('Area development, redevelopment of renewal')
                break;
              case "401":
                activityAsText.push('Homeowners association')
                break;
              case "402":
                activityAsText.push('Other activity aimed at combating community deterioration')
                break;
              case "403":
                activityAsText.push('Attracting new industry or retaining industry in an area')
                break;
              case "404":
                activityAsText.push('Community promotion')
                break;
              case "405":
                activityAsText.push('Loans or grants for minority businesses')
                break;
              case "406":
                activityAsText.push('Crime prevention')
                break;
              case "407":
                activityAsText.push('Voluntary firemen\'s organization or auxiliary')
                break;
              case "408":
                activityAsText.push('Community service organization')
                break;
              case "429":
                activityAsText.push('Other inner city or community benefit activities')
                break;
              case "430":
                activityAsText.push('Defense of human and civil rights')
                break;
              case "431":
                activityAsText.push('Elimination of prejudice and discrimination (race, religion, sex, national origin, etc)')
                break;
              case "432":
                activityAsText.push('Lessen neighborhood tensions')
                break;
              case "449":
                activityAsText.push('Other civil rights activities')
                break;
              case "460":
                activityAsText.push('Public interest litigation activities')
                break;
              case "461":
                activityAsText.push('Other litigation or support of litigation')
                break;
              case "462":
                activityAsText.push('Legal aid to indigents')
                break;
              case "463":
                activityAsText.push('Providing bail')
                break;
              case "465":
                activityAsText.push('Plan under IRC section 120')
                break;
              case "480":
                activityAsText.push('Propose, support, or oppose legislation')
                break;
              case "481":
                activityAsText.push('Voter information on issues or candidates')
                break;
              case "482":
                activityAsText.push('Voter education (mechanics of registering, voting etc.)')
                break;
              case "483":
                activityAsText.push('Support, oppose, or rate political candidates')
                break;
              case "484":
                activityAsText.push('Provide facilities or services for political campaign activities')
                break;
              case "509":
                activityAsText.push('Other legislative and political activities')
                break;
              case "510":
                activityAsText.push('Firearms control')
                break;
              case "511":
                activityAsText.push('Selective Service System')
                break;
              case "512":
                activityAsText.push('National defense policy')
                break;
              case "513":
                activityAsText.push('Weapons systems')
                break;
              case "514":
                activityAsText.push('Government spending')
                break;
              case "515":
                activityAsText.push('Taxes or tax exemption')
                break;
              case "516":
                activityAsText.push('Separation of church and state')
                break;
              case "517":
                activityAsText.push('Government aid to parochial schools')
                break;
              case "518":
                activityAsText.push('U.S. foreign policy')
                break;
              case "519":
                activityAsText.push('U.S. military involvement')
                break;
              case "520":
                activityAsText.push('Pacifism and peace')
                break;
              case "521":
                activityAsText.push('Economic-political system of U.S.')
                break;
              case "522":
                activityAsText.push('Anti-communism')
                break;
              case "523":
                activityAsText.push('Right to work')
                break;
              case "524":
                activityAsText.push('Zoning or rezoning')
                break;
              case "525":
                activityAsText.push('Location of highway or transportation system')
                break;
              case "526":
                activityAsText.push('Rights of criminal defendants')
                break;
              case "527":
                activityAsText.push('Capital punishment')
                break;
              case "528":
                activityAsText.push('Stricter law enforcement')
                break;
              case "529":
                activityAsText.push('Ecology or conservation')
                break;
              case "530":
                activityAsText.push('Protection of consumer interests')
                break;
              case "531":
                activityAsText.push('Medical care service')
                break;
              case "532":
                activityAsText.push('Welfare systems')
                break;
              case "533":
                activityAsText.push('Urban renewal')
                break;
              case "534":
                activityAsText.push('Busing student to achieve racial balance')
                break;
              case "535":
                activityAsText.push('Racial integration')
                break;
              case "536":
                activityAsText.push('Use of intoxicating beverage')
                break;
              case "537":
                activityAsText.push('Use of drugs or narcotics')
                break;
              case "538":
                activityAsText.push('Use of tobacco')
                break;
              case "539":
                activityAsText.push('Prohibition of erotica')
                break;
              case "540":
                activityAsText.push('Sex education in public schools')
                break;
              case "541":
                activityAsText.push('Population control')
                break;
              case "542":
                activityAsText.push('Birth control methods')
                break;
              case "543":
                activityAsText.push('Legalized abortion')
                break;
              case "559":
                activityAsText.push('Other matters')
                break;
              case "560":
                activityAsText.push('Supplying money, goods or services to the poor')
                break;
              case "561":
                activityAsText.push('Gifts or grants to individuals')
                break;
              case "562":
                activityAsText.push('Other loans to individuals')
                break;
              case "563":
                activityAsText.push('Marriage counseling')
                break;
              case "564":
                activityAsText.push('Family planning')
                break;
              case "565":
                activityAsText.push('Credit counseling and assistance')
                break;
              case "566":
                activityAsText.push('Job training, counseling, or assistance')
                break;
              case "567":
                activityAsText.push('Draft counseling')
                break;
              case "568":
                activityAsText.push('Vocational counseling')
                break;
              case "569":
                activityAsText.push('Referral service (social agencies)')
                break;
              case "572":
                activityAsText.push('Rehabilitating convicts or ex-convicts')
                break;
              case "573":
                activityAsText.push('Rehabilitating alcoholics, drug abusers, compulsive gamblers, etc.')
                break;
              case "574":
                activityAsText.push('Day care center')
                break;
              case "575":
                activityAsText.push('Services for the aged')
                break;
              case "600":
                activityAsText.push('Community Chest, United Way, etc.')
                break;
              case "601":
                activityAsText.push('Booster club')
                break;
              case "602":
                activityAsText.push('Gifts, grants, or loans to other organizations')
                break;
              case "603":
                activityAsText.push('Non-financial services of facilities to other organizations')
                break;
              case "900":
                activityAsText.push('Cemetery or burial activities')
                break;
              case "901":
                activityAsText.push('Perpetual (care fund (cemetery, columbarium, etc)')
                break;
              case "902":
                activityAsText.push('Emergency or disaster aid fund')
                break;
              case "903":
                activityAsText.push('Community trust or component')
                break;
              case "904":
                activityAsText.push('Government instrumentality or agency')
                break;
              case "905":
                activityAsText.push('Testing products for public safety')
                break;
              case "906":
                activityAsText.push('Consumer interest group')
                break;
              case "907":
                activityAsText.push('Veterans activities')
                break;
              case "908":
                activityAsText.push('Patriotic activities')
                break;
              case "909":
                activityAsText.push('Non-exempt charitable trust described in section 4947(a)(1) of the Code')
                break;
              case "910":
                activityAsText.push('Domestic organization with activities outside U.S.')
                break;
              case "910":
                activityAsText.push('Domestic organization with activities outside U.S.')
                break;
              case "911":
                activityAsText.push('Foreign organization')
                break;
              case "912":
                activityAsText.push('Title holding corporation')
                break;
              case "913":
                activityAsText.push('Prevention of cruelty to animals')
                break;
              case "914":
                activityAsText.push('Achievement pries of awards')
                break;
              case "915":
                activityAsText.push('Erection or maintenance of public building or works')
                break;
              case "916":
                activityAsText.push('Cafeteria, restaurant, snack bar, food services, etc.')
                break;
              case "917":
                activityAsText.push('Thrift ship, retail outlet, etc.')
                break;
              case "918":
                activityAsText.push('Book, gift or supply store')
                break;
              case "919":
                activityAsText.push('Advertising')
                break;
              case "920":
                activityAsText.push('Association of employees')
                break;
              case "921":
                activityAsText.push('Loans or credit reporting')
                break;
              case "922":
                activityAsText.push('Endowment fund or financial services')
                break;
              case "923":
                activityAsText.push('Indians (tribes, cultures, etc.)')
                break;
              case "924":
                activityAsText.push('Traffic or tariff bureau')
                break;
              case "925":
                activityAsText.push('Section 501(c)(1) with 50% deductibility')
                break;
              case "926":
                activityAsText.push('Government instrumentality other than section 501(c)')
                break;
              case "927":
                activityAsText.push('Fundraising')
                break;
              case "928":
                activityAsText.push('4947(a)(2) trust')
                break;
              case "930":
                activityAsText.push('Prepaid legal services pan exempt under IRC section 501(c)(20)')
                break;
              case "931":
                activityAsText.push('Withdrawal liability payment fund')
                break;
              case "990":
                activityAsText.push('Section 501(k) child care organization')
                break;
              case "994":
                activityAsText.push('Described in section 170(b)1)(a)(vi) of the Code')
                break;
              case "995":
                activityAsText.push('Described in section 509(a)(2) of the Code')
                break;
              case "922":
                activityAsText.push('"Unspecified"')
                break;
            }
          })
          nonprofit.ACTIVITY = activityAsText.join('; ')

          var ntee = nonprofit.NTEE_CD.substring(0, 3)
          switch (ntee) {
            case "A01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "A02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "A03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "A05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "A11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "A12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "A19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.*'
              break;
            case "A20":
              nonprofit.NTEE = 'Arts, Cultural Organizations - Multipurpose'
              break;
            case "A23":
              nonprofit.NTEE = 'Cultural, Ethnic Awareness'
              break;
            case "A25":
              nonprofit.NTEE = 'Arts Education'
              break;
            case "A26":
              nonprofit.NTEE = 'Arts Council/Agency'
              break;
            case "A30":
              nonprofit.NTEE = 'Media, Communications Organizations'
              break;
            case "A31":
              nonprofit.NTEE = 'Film, Video'
              break;
            case "A32":
              nonprofit.NTEE = 'Television'
              break;
            case "A33":
              nonprofit.NTEE = 'Printing, Publishing'
              break;
            case "A34":
              nonprofit.NTEE = 'Radio'
              break;
            case "A40":
              nonprofit.NTEE = 'Visual Arts Organizations'
              break;
            case "A50":
              nonprofit.NTEE = 'Museum, Museum Activities'
              break;
            case "A51":
              nonprofit.NTEE = 'Art Museums'
              break;
            case "A52":
              nonprofit.NTEE = 'Children\'s Museums'
              break;
            case "A54":
              nonprofit.NTEE = 'History Museums'
              break;
            case "A56":
              nonprofit.NTEE = 'Natural History, Natural Science Museums'
              break;
            case "A57":
              nonprofit.NTEE = 'Science and Technology Museums'
              break;
            case "A60":
              nonprofit.NTEE = 'Performing Arts Organizations'
              break;
            case "A61":
              nonprofit.NTEE = 'Performing Arts Centers'
              break;
            case "A62":
              nonprofit.NTEE = 'Dance'
              break;
            case "A63":
              nonprofit.NTEE = 'Ballet'
              break;
            case "A65":
              nonprofit.NTEE = 'Theater'
              break;
            case "A68":
              nonprofit.NTEE = 'Music'
              break;
            case "A69":
              nonprofit.NTEE = 'Symphony Orchestras'
              break;
            case "A6A":
              nonprofit.NTEE = 'Opera'
              break;
            case "A6B":
              nonprofit.NTEE = 'Singing, Choral'
              break;
            case "A6C":
              nonprofit.NTEE = 'Music Groups, Bands, Ensembles'
              break;
            case "A6E":
              nonprofit.NTEE = 'Performing Arts Schools'
              break;
            case "A70":
              nonprofit.NTEE = 'Humanities Organizations'
              break;
            case "A80":
              nonprofit.NTEE = 'Historical Societies, Related Historical Activities'
              break;
            case "A84":
              nonprofit.NTEE = 'Commemorative Events'
              break;
            case "A90":
              nonprofit.NTEE = 'Arts Service Organizations and Activities'
              break;
            case "A99":
              nonprofit.NTEE = 'Arts, Culture, and Humanities N.E.C.'
              break;
            case "B01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "B02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "B03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "B05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "B11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "B12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "B19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "B20":
              nonprofit.NTEE = 'Elementary, Secondary Education, K - 12'
              break;
            case "B21":
              nonprofit.NTEE = 'Kindergarten, Preschool, Nursery School, Early Admissions'
              break;
            case "B24":
              nonprofit.NTEE = 'Primary, Elementary Schools'
              break;
            case "B25":
              nonprofit.NTEE = 'Secondary, High School'
              break;
            case "B28":
              nonprofit.NTEE = 'Specialized Education Institutions'
              break;
            case "B30":
              nonprofit.NTEE = 'Vocational, Technical Schools'
              break;
            case "B40":
              nonprofit.NTEE = 'Higher Education Institutions'
              break;
            case "B41":
              nonprofit.NTEE = 'Community or Junior Colleges'
              break;
            case "B42":
              nonprofit.NTEE = 'Undergraduate College (4-year)'
              break;
            case "B43":
              nonprofit.NTEE = 'University or Technological Institute'
              break;
            case "B50":
              nonprofit.NTEE = 'Graduate, Professional Schools (Separate Entities)'
              break;
            case "B60":
              nonprofit.NTEE = 'Adult, Continuing Education'
              break;
            case "B70":
              nonprofit.NTEE = 'Libraries'
              break;
            case "B80":
              nonprofit.NTEE = 'Student Services, Organizations of Students'
              break;
            case "B82":
              nonprofit.NTEE = 'Scholarships, Student Financial Aid Services, Awards'
              break;
            case "B83":
              nonprofit.NTEE = 'Student Sororities, Fraternities'
              break;
            case "B84":
              nonprofit.NTEE = 'Alumni Associations'
              break;
            case "B90":
              nonprofit.NTEE = 'Educational Services and Schools - Other'
              break;
            case "B92":
              nonprofit.NTEE = 'Remedial Reading, Reading Encouragement '
              break;
            case "B94":
              nonprofit.NTEE = 'Parent/Teacher Group'
              break;
            case "B99":
              nonprofit.NTEE = 'Education N.E.C.'
              break;
            case "C01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "C02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "C03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "C05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "C11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "C12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "C19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "C20":
              nonprofit.NTEE = 'Pollution Abatement and Control Services'
              break;
            case "C27":
              nonprofit.NTEE = 'Recycling Programs'
              break;
            case "C30":
              nonprofit.NTEE = 'Natural Resources Conservation and Protection'
              break;
            case "C32":
              nonprofit.NTEE = 'Water Resource, Wetlands Conservation and Management'
              break;
            case "C34":
              nonprofit.NTEE = 'Land Resources Conservation'
              break;
            case "C35":
              nonprofit.NTEE = 'Energy Resources Conservation and Development'
              break;
            case "C36":
              nonprofit.NTEE = 'Forest Conservation'
              break;
            case "C40":
              nonprofit.NTEE = 'Botanical, Horticultural, and Landscape Services'
              break;
            case "C41":
              nonprofit.NTEE = 'Botanical Gardens, Arboreta and Botanical Organizations'
              break;
            case "C42":
              nonprofit.NTEE = 'Garden Club, Horticultural Program'
              break;
            case "C50":
              nonprofit.NTEE = 'Environmental Beautification and Aesthetics'
              break;
            case "C60":
              nonprofit.NTEE = 'Environmental Education and Outdoor Survival Programs'
              break;
            case "C99":
              nonprofit.NTEE = 'Environmental Quality, Protection, and Beautification N.E.C.'
              break;
            case "D01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "D02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "D03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "D05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "D11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "D12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "D19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "D20":
              nonprofit.NTEE = 'Animal Protection and Welfare'
              break;
            case "D30":
              nonprofit.NTEE = 'Wildlife Preservation, Protection'
              break;
            case "D31":
              nonprofit.NTEE = 'Protection of Endangered Species'
              break;
            case "D32":
              nonprofit.NTEE = 'Bird Sanctuary, Preserve'
              break;
            case "D33":
              nonprofit.NTEE = 'Fisheries Resources'
              break;
            case "D34":
              nonprofit.NTEE = 'Wildlife Sanctuary, Refuge'
              break;
            case "D40":
              nonprofit.NTEE = 'Veterinary Services'
              break;
            case "D50":
              nonprofit.NTEE = 'Zoo, Zoological Society'
              break;
            case "D60":
              nonprofit.NTEE = 'Other Services - Specialty Animals'
              break;
            case "D61":
              nonprofit.NTEE = 'Animal Training, Behavior'
              break;
            case "D99":
              nonprofit.NTEE = 'Animal-Related N.E.C.'
              break;
            case "E01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "E02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "E03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "E05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "E11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "E12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "E19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "E20":
              nonprofit.NTEE = 'Hospitals and Related Primary Medical Care Facilities'
              break;
            case "E21":
              nonprofit.NTEE = 'Community Health Systems'
              break;
            case "E22":
              nonprofit.NTEE = 'Hospital, General'
              break;
            case "E24":
              nonprofit.NTEE = 'Hospital, Specialty'
              break;
            case "E30":
              nonprofit.NTEE = 'Health Treatment Facilities, Primarily Outpatient'
              break;
            case "E31":
              nonprofit.NTEE = 'Group Health Practice (Health Maintenance Organizations)'
              break;
            case "E32":
              nonprofit.NTEE = 'Ambulatory Health Center, Community Clinic'
              break;
            case "E40":
              nonprofit.NTEE = 'Reproductive Health Care Facilities and Allied Services'
              break;
            case "E42":
              nonprofit.NTEE = 'Family Planning Centers'
              break;
            case "E50":
              nonprofit.NTEE = 'Rehabilitative Medical Services'
              break;
            case "E60":
              nonprofit.NTEE = 'Health Support Services'
              break;
            case "E61":
              nonprofit.NTEE = 'Blood Supply Related'
              break;
            case "E62":
              nonprofit.NTEE = 'Ambulance, Emergency Medical Transport Services'
              break;
            case "E65":
              nonprofit.NTEE = 'Organ and Tissue Banks'
              break;
            case "E70":
              nonprofit.NTEE = 'Public Health Program (Includes General Health and Wellness Promotion Services)'
              break;
            case "E80":
              nonprofit.NTEE = 'Health, General and Financing'
              break;
            case "E86":
              nonprofit.NTEE = 'Patient Services - Entertainment, Recreation'
              break;
            case "E90":
              nonprofit.NTEE = 'Nursing Services (General)'
              break;
            case "E91":
              nonprofit.NTEE = 'Nursing, Convalescent Facilities'
              break;
            case "E92":
              nonprofit.NTEE = 'Home Health Care'
              break;
            case "E99":
              nonprofit.NTEE = 'Health - General and Rehabilitative N.E.C.'
              break;
            case "F01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "F02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "F03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "F05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "F11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "F12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "F19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "F20":
              nonprofit.NTEE = 'Alcohol, Drug and Substance Abuse, Dependency Prevention and Treatment'
              break;
            case "F21":
              nonprofit.NTEE = 'Alcohol, Drug Abuse, Prevention Only'
              break;
            case "F22":
              nonprofit.NTEE = 'Alcohol, Drug Abuse, Treatment Only'
              break;
            case "F30":
              nonprofit.NTEE = 'Mental Health Treatment - Multipurpose and N.E.C.'
              break;
            case "F31":
              nonprofit.NTEE = 'Psychiatric, Mental Health Hospital'
              break;
            case "F32":
              nonprofit.NTEE = 'Community Mental Health Center'
              break;
            case "F33":
              nonprofit.NTEE = 'Group Home, Residential Treatment Facility - Mental Health Related'
              break;
            case "F40":
              nonprofit.NTEE = 'Hot Line, Crisis Intervention Services'
              break;
            case "F42":
              nonprofit.NTEE = 'Rape Victim Services'
              break;
            case "F50":
              nonprofit.NTEE = 'Addictive Disorders N.E.C.'
              break;
            case "F52":
              nonprofit.NTEE = 'Smoking Addiction'
              break;
            case "F53":
              nonprofit.NTEE = 'Eating Disorder, Addiction'
              break;
            case "F54":
              nonprofit.NTEE = 'Gambling Addiction'
              break;
            case "F60":
              nonprofit.NTEE = 'Counseling, Support Groups'
              break;
            case "F70":
              nonprofit.NTEE = 'Mental Health Disorders'
              break;
            case "F80":
              nonprofit.NTEE = 'Mental Health Association, Multipurpose'
              break;
            case "F99":
              nonprofit.NTEE = 'Mental Health, Crisis Intervention N.E.C.'
              break;
            case "G01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "G02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "G03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "G05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "G11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "G12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "G19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "G20":
              nonprofit.NTEE = 'Birth Defects and Genetic Diseases'
              break;
            case "G25":
              nonprofit.NTEE = 'Down Syndrome'
              break;
            case "G30":
              nonprofit.NTEE = 'Cancer'
              break;
            case "G40":
              nonprofit.NTEE = 'Diseases of Specific Organs'
              break;
            case "G41":
              nonprofit.NTEE = 'Eye Diseases, Blindness and Vision Impairments'
              break;
            case "G42":
              nonprofit.NTEE = 'Ear and Throat Diseases'
              break;
            case "G43":
              nonprofit.NTEE = 'Heart and Circulatory System Diseases, Disorders'
              break;
            case "G44":
              nonprofit.NTEE = 'Kidney Disease'
              break;
            case "G45":
              nonprofit.NTEE = 'Lung Disease'
              break;
            case "G48":
              nonprofit.NTEE = 'Brain Disorders'
              break;
            case "G50":
              nonprofit.NTEE = 'Nerve, Muscle and Bone Diseases'
              break;
            case "G51":
              nonprofit.NTEE = 'Arthritis'
              break;
            case "G54":
              nonprofit.NTEE = 'Epilepsy'
              break;
            case "G60":
              nonprofit.NTEE = 'Allergy Related Diseases'
              break;
            case "G61":
              nonprofit.NTEE = 'Asthma'
              break;
            case "G70":
              nonprofit.NTEE = 'Digestive Diseases, Disorders'
              break;
            case "G80":
              nonprofit.NTEE = 'Specifically Named Diseases'
              break;
            case "G81":
              nonprofit.NTEE = 'AIDS'
              break;
            case "G83":
              nonprofit.NTEE = 'Alzheimer\'s Disease'
              break;
            case "G84":
              nonprofit.NTEE = 'Autism'
              break;
            case "G90":
              nonprofit.NTEE = 'Medical Disciplines'
              break;
            case "G92":
              nonprofit.NTEE = 'Biomedicine, Bioengineering'
              break;
            case "G94":
              nonprofit.NTEE = 'Geriatrics'
              break;
            case "G96":
              nonprofit.NTEE = 'Neurology, Neuroscience'
              break;
            case "G98":
              nonprofit.NTEE = 'Pediatrics'
              break;
            case "G9B":
              nonprofit.NTEE = 'Surgery'
              break;
            case "G99":
              nonprofit.NTEE = 'Diseases, Disorders, Medical Disciplines N.E.C.'
              break;
            case "H01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "H02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "H03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "H05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "H11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "H12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "H19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "H20":
              nonprofit.NTEE = 'Birth Defects, Genetic Diseases Research'
              break;
            case "H25":
              nonprofit.NTEE = 'Down Syndrome Research'
              break;
            case "H30":
              nonprofit.NTEE = 'Cancer Research'
              break;
            case "H40":
              nonprofit.NTEE = 'Specific Organ Research'
              break;
            case "H41":
              nonprofit.NTEE = 'Eye Research'
              break;
            case "H42":
              nonprofit.NTEE = 'Ear and Throat Research'
              break;
            case "H43":
              nonprofit.NTEE = 'Heart, Circulatory Research'
              break;
            case "H44":
              nonprofit.NTEE = 'Kidney Research'
              break;
            case "H45":
              nonprofit.NTEE = 'Lung Research'
              break;
            case "H48":
              nonprofit.NTEE = 'Brain Disorders Research'
              break;
            case "H50":
              nonprofit.NTEE = 'Nerve, Muscle, Bone Research'
              break;
            case "H51":
              nonprofit.NTEE = 'Arthritis Research'
              break;
            case "H54":
              nonprofit.NTEE = 'Epilepsy Research'
              break;
            case "H60":
              nonprofit.NTEE = 'Allergy Related Disease Research'
              break;
            case "H61":
              nonprofit.NTEE = 'Asthma Research'
              break;
            case "H70":
              nonprofit.NTEE = 'Digestive Disease, Disorder Research'
              break;
            case "H80":
              nonprofit.NTEE = 'Specifically Named Diseases Research'
              break;
            case "H81":
              nonprofit.NTEE = 'AIDS Research'
              break;
            case "H83":
              nonprofit.NTEE = 'Alzheimer\'s Disease Research'
              break;
            case "H84":
              nonprofit.NTEE = 'Autism Research'
              break;
            case "H90":
              nonprofit.NTEE = 'Medical Specialty Research'
              break;
            case "H92":
              nonprofit.NTEE = 'Biomedicine, Bioengineering Research'
              break;
            case "H94":
              nonprofit.NTEE = 'Geriatrics Research'
              break;
            case "H96":
              nonprofit.NTEE = 'Neurology, Neuroscience Research'
              break;
            case "H98":
              nonprofit.NTEE = 'Pediatrics Research'
              break;
            case "H9B":
              nonprofit.NTEE = 'Surgery Research'
              break;
            case "H99":
              nonprofit.NTEE = 'Medical Research N.E.C.'
              break;
            case "I01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "I02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "I03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "I05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "I11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "I12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "I19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "I20":
              nonprofit.NTEE = 'Crime Prevention N.E.C.'
              break;
            case "I21":
              nonprofit.NTEE = 'Delinquency Prevention'
              break;
            case "I23":
              nonprofit.NTEE = 'Drunk Driving Related'
              break;
            case "I30":
              nonprofit.NTEE = 'Correctional Facilities N.E.C.'
              break;
            case "I31":
              nonprofit.NTEE = 'Transitional Care, Half-Way House for Offenders, Ex-Offenders'
              break;
            case "I40":
              nonprofit.NTEE = 'Rehabilitation Services for Offenders'
              break;
            case "I43":
              nonprofit.NTEE = 'Services to Prisoners and Families - Multipurpose'
              break;
            case "I44":
              nonprofit.NTEE = 'Prison Alternatives'
              break;
            case "I50":
              nonprofit.NTEE = 'Administration of Justice, Courts'
              break;
            case "I51":
              nonprofit.NTEE = 'Dispute Resolution, Mediation Services'
              break;
            case "I60":
              nonprofit.NTEE = 'Law Enforcement Agencies (Police Departments)'
              break;
            case "I70":
              nonprofit.NTEE = 'Protection Against, Prevention of Neglect, Abuse, Exploitation'
              break;
            case "I71":
              nonprofit.NTEE = 'Spouse Abuse, Prevention of'
              break;
            case "I72":
              nonprofit.NTEE = 'Child Abuse, Prevention of'
              break;
            case "I73":
              nonprofit.NTEE = 'Sexual Abuse, Prevention of'
              break;
            case "I80":
              nonprofit.NTEE = 'Legal Services'
              break;
            case "I83":
              nonprofit.NTEE = 'Public Interest Law, Litigation'
              break;
            case "I99":
              nonprofit.NTEE = 'Crime, Legal Related N.E.C.'
              break;
            case "J01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "J02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "J03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "J05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "J11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "J12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "J19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "J20":
              nonprofit.NTEE = 'Employment Procurement Assistance, Job Training'
              break;
            case "J21":
              nonprofit.NTEE = 'Vocational Counseling, Guidance and Testing'
              break;
            case "J22":
              nonprofit.NTEE = 'Vocational Training'
              break;
            case "J30":
              nonprofit.NTEE = 'Vocational Rehabilitation'
              break;
            case "J32":
              nonprofit.NTEE = 'Goodwill Industries'
              break;
            case "J33":
              nonprofit.NTEE = 'Sheltered Remunerative Employment, Work Activity Center N.E.C. '
              break;
            case "J40":
              nonprofit.NTEE = 'Labor Unions, Organizations'
              break;
            case "J99":
              nonprofit.NTEE = 'Employment, Job Related N.E.C.'
              break;
            case "K01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "K02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "K03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "K05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "K11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "K12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "K19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "K20":
              nonprofit.NTEE = 'Agricultural Programs'
              break;
            case "K25":
              nonprofit.NTEE = 'Farmland Preservation'
              break;
            case "K26":
              nonprofit.NTEE = 'Livestock Breeding, Development, Management '
              break;
            case "K28":
              nonprofit.NTEE = 'Farm Bureau, Grange'
              break;
            case "K30":
              nonprofit.NTEE = 'Food Service, Free Food Distribution Programs'
              break;
            case "K31":
              nonprofit.NTEE = 'Food Banks, Food Pantries'
              break;
            case "K34":
              nonprofit.NTEE = 'Congregate Meals'
              break;
            case "K35":
              nonprofit.NTEE = 'Eatery, Agency, Organization Sponsored'
              break;
            case "K36":
              nonprofit.NTEE = 'Meals on Wheels'
              break;
            case "K40":
              nonprofit.NTEE = 'Nutrition Programs'
              break;
            case "K50":
              nonprofit.NTEE = 'Home Economics'
              break;
            case "K99":
              nonprofit.NTEE = 'Food, Agriculture, and Nutrition N.E.C.'
              break;
            case "L01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "L02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "L03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "L05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "L11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "L12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "L19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "L20":
              nonprofit.NTEE = 'Housing Development, Construction, Management'
              break;
            case "L21":
              nonprofit.NTEE = 'Public Housing Facilities'
              break;
            case "L22":
              nonprofit.NTEE = 'Senior Citizens\' Housing/Retirement Communities'
              break;
            case "L25":
              nonprofit.NTEE = 'Housing Rehabilitation'
              break;
            case "L30":
              nonprofit.NTEE = 'Housing Search Assistance'
              break;
            case "L40":
              nonprofit.NTEE = 'Low-Cost Temporary Housing'
              break;
            case "L41":
              nonprofit.NTEE = 'Homeless, Temporary Shelter For'
              break;
            case "L50":
              nonprofit.NTEE = 'Housing Owners, Renters Organizations'
              break;
            case "L80":
              nonprofit.NTEE = 'Housing Support Services -- Other'
              break;
            case "L81":
              nonprofit.NTEE = 'Home Improvement and Repairs'
              break;
            case "L82":
              nonprofit.NTEE = 'Housing Expense Reduction Support'
              break;
            case "L99":
              nonprofit.NTEE = 'Housing, Shelter N.E.C.'
              break;
            case "M01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "M02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "M03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "M05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "M11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "M12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "M19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "M20":
              nonprofit.NTEE = 'Disaster Preparedness and Relief Services'
              break;
            case "M23":
              nonprofit.NTEE = 'Search and Rescue Squads, Services'
              break;
            case "M24":
              nonprofit.NTEE = 'Fire Prevention, Protection, Control'
              break;
            case "M40":
              nonprofit.NTEE = 'Safety Education'
              break;
            case "M41":
              nonprofit.NTEE = 'First Aid Training, Services'
              break;
            case "M42":
              nonprofit.NTEE = 'Automotive Safety'
              break;
            case "M99":
              nonprofit.NTEE = 'Public Safety, Disaster Preparedness, and Relief N.E.C.'
              break;
            case "N01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "N02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "N03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "N05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "N11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "N12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "N19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "N20":
              nonprofit.NTEE = 'Recreational and Sporting Camps'
              break;
            case "N30":
              nonprofit.NTEE = 'Physical Fitness and Community Recreational Facilities'
              break;
            case "N31":
              nonprofit.NTEE = 'Community Recreational Centers'
              break;
            case "N32":
              nonprofit.NTEE = 'Parks and Playgrounds'
              break;
            case "N40":
              nonprofit.NTEE = 'Sports Training Facilities, Agencies'
              break;
            case "N50":
              nonprofit.NTEE = 'Recreational, Pleasure, or Social Club'
              break;
            case "N52":
              nonprofit.NTEE = 'Fairs, County and Other'
              break;
            case "N60":
              nonprofit.NTEE = 'Amateur Sports Clubs, Leagues, N.E.C.'
              break;
            case "N61":
              nonprofit.NTEE = 'Fishing, Hunting Clubs'
              break;
            case "N62":
              nonprofit.NTEE = 'Basketball'
              break;
            case "N63":
              nonprofit.NTEE = 'Baseball, Softball'
              break;
            case "N64":
              nonprofit.NTEE = 'Soccer Clubs, Leagues'
              break;
            case "N65":
              nonprofit.NTEE = 'Football Clubs, Leagues'
              break;
            case "N66":
              nonprofit.NTEE = 'Tennis, Racquet Sports Clubs, Leagues'
              break;
            case "N67":
              nonprofit.NTEE = 'Swimming, Water Recreation'
              break;
            case "N68":
              nonprofit.NTEE = 'Winter Sports (Snow and Ice)'
              break;
            case "N69":
              nonprofit.NTEE = 'Equestrian, Riding'
              break;
            case "N6A":
              nonprofit.NTEE = 'Golf'
              break;
            case "N70":
              nonprofit.NTEE = 'Amateur Sports Competitions'
              break;
            case "N71":
              nonprofit.NTEE = 'Olympics Committees and Related International Competitions'
              break;
            case "N72":
              nonprofit.NTEE = 'Special Olympics'
              break;
            case "N80":
              nonprofit.NTEE = 'Professional Athletic Leagues'
              break;
            case "N99":
              nonprofit.NTEE = 'Recreation, Sports, Leisure, Athletics N.E.C.'
              break;
            case "O01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "O02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "O03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "O05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "O11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "O12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "O19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "O20":
              nonprofit.NTEE = 'Youth Centers, Clubs, Multipurpose'
              break;
            case "O21":
              nonprofit.NTEE = 'Boys Clubs'
              break;
            case "O22":
              nonprofit.NTEE = 'Girls Clubs'
              break;
            case "O23":
              nonprofit.NTEE = 'Boys and Girls Clubs (Combined)'
              break;
            case "O30":
              nonprofit.NTEE = 'Adult, Child Matching Programs'
              break;
            case "O31":
              nonprofit.NTEE = 'Big Brothers, Big Sisters'
              break;
            case "O40":
              nonprofit.NTEE = 'Scouting Organizations'
              break;
            case "O41":
              nonprofit.NTEE = 'Boy Scouts of America'
              break;
            case "O42":
              nonprofit.NTEE = 'Girl Scouts of the U.S.A.'
              break;
            case "O43":
              nonprofit.NTEE = 'Camp Fire'
              break;
            case "O50":
              nonprofit.NTEE = 'Youth Development Programs, Other'
              break;
            case "O51":
              nonprofit.NTEE = 'Youth Community Service Clubs'
              break;
            case "052":
              nonprofit.NTEE = 'Youth Development - Agricultural'
              break;
            case "O53":
              nonprofit.NTEE = 'Youth Development - Business'
              break;
            case "O54":
              nonprofit.NTEE = 'Youth Development - Citizenship Programs'
              break;
            case "O55":
              nonprofit.NTEE = 'Youth Development - Religious Leadership'
              break;
            case "O99":
              nonprofit.NTEE = 'Youth Development N.E.C.'
              break;
            case "P01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "P02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "P03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "P05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "P11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "P12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "P19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "P20":
              nonprofit.NTEE = 'Human Service Organizations - Multipurpose'
              break;
            case "P21":
              nonprofit.NTEE = 'American Red Cross'
              break;
            case "P22":
              nonprofit.NTEE = 'Urban League'
              break;
            case "P24":
              nonprofit.NTEE = 'Salvation Army'
              break;
            case "P26":
              nonprofit.NTEE = 'Volunteers of America'
              break;
            case "P27":
              nonprofit.NTEE = 'Young Men\'s or Women\'s Associations (YMCA, YWCA, YWHA, YMHA)'
              break;
            case "P28":
              nonprofit.NTEE = 'Neighborhood Centers, Settlement Houses'
              break;
            case "P29":
              nonprofit.NTEE = 'Thrift Shops'
              break;
            case "P30":
              nonprofit.NTEE = 'Children\'s, Youth Services'
              break;
            case "P31":
              nonprofit.NTEE = 'Adoption'
              break;
            case "P32":
              nonprofit.NTEE = 'Foster Care'
              break;
            case "P33":
              nonprofit.NTEE = 'Child Day Care'
              break;
            case "P40":
              nonprofit.NTEE = 'Family Services'
              break;
            case "P42":
              nonprofit.NTEE = 'Single Parent Agencies, Services'
              break;
            case "P43":
              nonprofit.NTEE = 'Family Violence Shelters, Services'
              break;
            case "P44":
              nonprofit.NTEE = 'Homemaker, Home Health Aide'
              break;
            case "P45":
              nonprofit.NTEE = 'Family Services, Adolescent Parents'
              break;
            case "P46":
              nonprofit.NTEE = 'Family Counseling'
              break;
            case "P50":
              nonprofit.NTEE = 'Personal Social Services'
              break;
            case "P51":
              nonprofit.NTEE = 'Financial Counseling, Money Management '
              break;
            case "P52":
              nonprofit.NTEE = 'Transportation, Free or Subsidized'
              break;
            case "P58":
              nonprofit.NTEE = 'Gift Distribution'
              break;
            case "P60":
              nonprofit.NTEE = 'Emergency Assistance (Food, Clothing, Cash)'
              break;
            case "P61":
              nonprofit.NTEE = 'Travelers\' Aid'
              break;
            case "P62":
              nonprofit.NTEE = 'Victims\' Services'
              break;
            case "P70":
              nonprofit.NTEE = 'Residential, Custodial Care'
              break;
            case "P72":
              nonprofit.NTEE = 'Half-Way House (Short-Term Residential Care)'
              break;
            case "P73":
              nonprofit.NTEE = 'Group Home (Long Term)'
              break;
            case "P74":
              nonprofit.NTEE = 'Hospice'
              break;
            case "P75":
              nonprofit.NTEE = 'Senior Continuing Care Communities'
              break;
            case "P80":
              nonprofit.NTEE = 'Services to Promote the Independence of Specific Populations'
              break;
            case "P81":
              nonprofit.NTEE = 'Senior Centers, Services'
              break;
            case "P82":
              nonprofit.NTEE = 'Developmentally Disabled Centers, Services'
              break;
            case "P84":
              nonprofit.NTEE = 'Ethnic, Immigrant Centers, Services'
              break;
            case "P85":
              nonprofit.NTEE = 'Homeless Persons Centers, Services'
              break;
            case "P86":
              nonprofit.NTEE = 'Blind/Visually Impaired Centers, Services'
              break;
            case "P87":
              nonprofit.NTEE = 'Deaf/Hearing Impaired Centers, Services'
              break;
            case "P99":
              nonprofit.NTEE = 'Human Services - Multipurpose and Other N.E.C.'
              break;
            case "Q01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "Q02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "Q03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "Q05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "Q11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "Q12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "Q19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "Q20":
              nonprofit.NTEE = 'Promotion of International Understanding'
              break;
            case "Q21":
              nonprofit.NTEE = 'International Cultural Exchange'
              break;
            case "Q22":
              nonprofit.NTEE = 'International Student Exchange and Aid'
              break;
            case "Q23":
              nonprofit.NTEE = 'International Exchanges, N.E.C.'
              break;
            case "Q30":
              nonprofit.NTEE = 'International Development, Relief Services'
              break;
            case "Q31":
              nonprofit.NTEE = 'International Agricultural Development'
              break;
            case "Q32":
              nonprofit.NTEE = 'International Economic Development'
              break;
            case "Q33":
              nonprofit.NTEE = 'International Relief'
              break;
            case "Q40":
              nonprofit.NTEE = 'International Peace and Security'
              break;
            case "Q41":
              nonprofit.NTEE = 'Arms Control, Peace Organizations'
              break;
            case "Q42":
              nonprofit.NTEE = 'United Nations Association'
              break;
            case "Q43":
              nonprofit.NTEE = 'National Security, Domestic'
              break;
            case "Q70":
              nonprofit.NTEE = 'International Human Rights'
              break;
            case "Q71":
              nonprofit.NTEE = 'International Migration, Refugee Issues'
              break;
            case "Q99":
              nonprofit.NTEE = 'International, Foreign Affairs, and National Security N.E.C.'
              break;
            case "R01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "R02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "R03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "R05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "R11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "R12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "R19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "R20":
              nonprofit.NTEE = 'Civil Rights, Advocacy for Specific Groups'
              break;
            case "R22":
              nonprofit.NTEE = 'Minority Rights'
              break;
            case "R23":
              nonprofit.NTEE = 'Disabled Persons\' Rights'
              break;
            case "R24":
              nonprofit.NTEE = 'Women\'s Rights'
              break;
            case "R25":
              nonprofit.NTEE = 'Seniors\' Rights'
              break;
            case "R26":
              nonprofit.NTEE = 'Lesbian, Gay Rights'
              break;
            case "R30":
              nonprofit.NTEE = 'Intergroup, Race Relations'
              break;
            case "R40":
              nonprofit.NTEE = 'Voter Education, Registration'
              break;
            case "R60":
              nonprofit.NTEE = 'Civil Liberties Advocacy'
              break;
            case "R61":
              nonprofit.NTEE = 'Reproductive Rights'
              break;
            case "R62":
              nonprofit.NTEE = 'Right to Life'
              break;
            case "R63":
              nonprofit.NTEE = 'Censorship, Freedom of Speech and Press Issues'
              break;
            case "R67":
              nonprofit.NTEE = 'Right to Die, Euthanasia Issues'
              break;
            case "R99":
              nonprofit.NTEE = 'Civil Rights, Social Action, Advocacy N.E.C.'
              break;
            case "S01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "S02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "S03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "S05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "S11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "S12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "S19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "S20":
              nonprofit.NTEE = 'Community, Neighborhood Development, Improvement (General)'
              break;
            case "S21":
              nonprofit.NTEE = 'Community Coalitions'
              break;
            case "S22":
              nonprofit.NTEE = 'Neighborhood, Block Associations'
              break;
            case "S30":
              nonprofit.NTEE = 'Economic Development'
              break;
            case "S31":
              nonprofit.NTEE = 'Urban, Community Economic Development'
              break;
            case "S32":
              nonprofit.NTEE = 'Rural Development'
              break;
            case "S40":
              nonprofit.NTEE = 'Business and Industry'
              break;
            case "S41":
              nonprofit.NTEE = 'Promotion of Business'
              break;
            case "S43":
              nonprofit.NTEE = 'Management Services for Small Business, Entrepreneurs'
              break;
            case "S46":
              nonprofit.NTEE = 'Boards of Trade'
              break;
            case "S47":
              nonprofit.NTEE = 'Real Estate Organizations'
              break;
            case "S50":
              nonprofit.NTEE = 'Nonprofit Management'
              break;
            case "S80":
              nonprofit.NTEE = 'Community Service Clubs'
              break;
            case "S81":
              nonprofit.NTEE = 'Women\'s Service Clubs'
              break;
            case "S82":
              nonprofit.NTEE = 'Men\'s Service Clubs'
              break;
            case "S99":
              nonprofit.NTEE = 'Community Improvement, Capacity Building N.E.C.'
              break;
            case "T01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "T02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "T03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "T05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "T11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "T12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "T19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "T20":
              nonprofit.NTEE = 'Private Grantmaking Foundations'
              break;
            case "T21":
              nonprofit.NTEE = 'Corporate Foundations'
              break;
            case "T22":
              nonprofit.NTEE = 'Private Independent Foundations'
              break;
            case "T23":
              nonprofit.NTEE = 'Private Operating Foundations'
              break;
            case "T30":
              nonprofit.NTEE = 'Public Foundations'
              break;
            case "T31":
              nonprofit.NTEE = 'Community Foundations'
              break;
            case "T40":
              nonprofit.NTEE = 'Voluntarism Promotion'
              break;
            case "T50":
              nonprofit.NTEE = 'Philanthropy, Charity, Voluntarism Promotion, General'
              break;
            case "T70":
              nonprofit.NTEE = 'Fund Raising Organizations That Cross Categories'
              break;
            case "T90":
              nonprofit.NTEE = 'Named Trusts/Foundations N.E.C.'
              break;
            case "T99":
              nonprofit.NTEE = 'Philanthropy, Voluntarism, and Grantmaking Foundations N.E.C.'
              break;
            case "U01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "U02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "U03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "U05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "U11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "U12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "U19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "U20":
              nonprofit.NTEE = 'Science, General'
              break;
            case "U21":
              nonprofit.NTEE = 'Marine Science and Oceanography'
              break;
            case "U30":
              nonprofit.NTEE = 'Physical Sciences, Earth Sciences Research and Promotion'
              break;
            case "U31":
              nonprofit.NTEE = 'Astronomy'
              break;
            case "U33":
              nonprofit.NTEE = 'Chemistry, Chemical Engineering'
              break;
            case "U34":
              nonprofit.NTEE = 'Mathematics'
              break;
            case "U36":
              nonprofit.NTEE = 'Geology'
              break;
            case "U40":
              nonprofit.NTEE = 'Engineering and Technology Research, Services'
              break;
            case "U41":
              nonprofit.NTEE = 'Computer Science'
              break;
            case "U42":
              nonprofit.NTEE = 'Engineering'
              break;
            case "U50":
              nonprofit.NTEE = 'Biological, Life Science Research'
              break;
            case "U99":
              nonprofit.NTEE = 'Science and Technology Research Institutes, Services N.E.C.'
              break;
            case "V01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "V02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "V03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "V05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "V11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "V12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "V19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "V20":
              nonprofit.NTEE = 'Social Science Institutes, Services'
              break;
            case "V21":
              nonprofit.NTEE = 'Anthropology, Sociology'
              break;
            case "V22":
              nonprofit.NTEE = 'Economics (as a social science)'
              break;
            case "V23":
              nonprofit.NTEE = 'Behavioral Science'
              break;
            case "V24":
              nonprofit.NTEE = 'Political Science'
              break;
            case "V25":
              nonprofit.NTEE = 'Population Studies'
              break;
            case "V26":
              nonprofit.NTEE = 'Law, International Law, Jurisprudence'
              break;
            case "V30":
              nonprofit.NTEE = 'Interdisciplinary Research'
              break;
            case "V31":
              nonprofit.NTEE = 'Black Studies'
              break;
            case "V32":
              nonprofit.NTEE = 'Women\'s Studies'
              break;
            case "V33":
              nonprofit.NTEE = 'Ethnic Studies'
              break;
            case "V34":
              nonprofit.NTEE = 'Urban Studies'
              break;
            case "V35":
              nonprofit.NTEE = 'International Studies'
              break;
            case "V36":
              nonprofit.NTEE = 'Gerontology (as a social science)'
              break;
            case "V37":
              nonprofit.NTEE = 'Labor Studies'
              break;
            case "V99":
              nonprofit.NTEE = 'Social Science Research Institutes, Services N.E.C.'
              break;
            case "W01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "W02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "W03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "W05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "W11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "W12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "W19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "W20":
              nonprofit.NTEE = 'Government and Public Administration'
              break;
            case "W22":
              nonprofit.NTEE = 'Public Finance, Taxation, Monetary Policy'
              break;
            case "W24":
              nonprofit.NTEE = 'Citizen Participation'
              break;
            case "W30":
              nonprofit.NTEE = 'Military, Veterans\' Organizations'
              break;
            case "W40":
              nonprofit.NTEE = 'Public Transportation Systems, Services'
              break;
            case "W50":
              nonprofit.NTEE = 'Telephone, Telegraph and Telecommunication Services'
              break;
            case "W60":
              nonprofit.NTEE = 'Financial Institutions, Services (Non-Government Related)'
              break;
            case "W61":
              nonprofit.NTEE = 'Credit Unions'
              break;
            case "W70":
              nonprofit.NTEE = 'Leadership Development'
              break;
            case "W80":
              nonprofit.NTEE = 'Public Utilities'
              break;
            case "W90":
              nonprofit.NTEE = 'Consumer Protection, Safety'
              break;
            case "W99":
              nonprofit.NTEE = 'Public, Society Benefit - Multipurpose and Other N.E.C.'
              break;
            case "X01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "X02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "X03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "X05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "X11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "X12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "X19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "X20":
              nonprofit.NTEE = 'Christian'
              break;
            case "X21":
              nonprofit.NTEE = 'Protestant'
              break;
            case "X22":
              nonprofit.NTEE = 'Roman Catholic'
              break;
            case "X30":
              nonprofit.NTEE = 'Jewish'
              break;
            case "X40":
              nonprofit.NTEE = 'Islamic'
              break;
            case "X50":
              nonprofit.NTEE = 'Buddhist'
              break;
            case "X70":
              nonprofit.NTEE = 'Hindu'
              break;
            case "X80":
              nonprofit.NTEE = 'Religious Media, Communications Organizations'
              break;
            case "X81":
              nonprofit.NTEE = 'Religious Film, Video'
              break;
            case "X82":
              nonprofit.NTEE = 'Religious Television'
              break;
            case "X83":
              nonprofit.NTEE = 'Religious Printing, Publishing'
              break;
            case "X84":
              nonprofit.NTEE = 'Religious Radio'
              break;
            case "X90":
              nonprofit.NTEE = 'Interfaith Issues'
              break;
            case "X99":
              nonprofit.NTEE = 'Religion Related, Spiritual Development N.E.C.'
              break;
            case "Y01":
              nonprofit.NTEE = 'Alliance/Advocacy Organizations'
              break;
            case "Y02":
              nonprofit.NTEE = 'Management & Technical Assistance'
              break;
            case "Y03":
              nonprofit.NTEE = 'Professional Societies, Associations'
              break;
            case "Y05":
              nonprofit.NTEE = 'Research Institutes and/or Public Policy Analysis'
              break;
            case "Y11":
              nonprofit.NTEE = 'Single Organization Support'
              break;
            case "Y12":
              nonprofit.NTEE = 'Fund Raising and/or Fund Distribution'
              break;
            case "Y19":
              nonprofit.NTEE = 'Nonmonetary Support N.E.C.'
              break;
            case "Y20":
              nonprofit.NTEE = 'Insurance Providers, Services'
              break;
            case "Y22":
              nonprofit.NTEE = 'Local Benevolent Life Insurance Associations, Mutual Irrigation and Telephone Companies, and Like Organizations'
              break;
            case "Y23":
              nonprofit.NTEE = 'Mutual Insurance Company or Association'
              break;
            case "Y24":
              nonprofit.NTEE = 'Supplemental Unemployment Compensation'
              break;
            case "Y25":
              nonprofit.NTEE = 'State-Sponsored Worker\'s Compensation Reinsurance Organizations'
              break;
            case "Y30":
              nonprofit.NTEE = 'Pension and Retirement Funds'
              break;
            case "Y33":
              nonprofit.NTEE = 'Teachers Retirement Fund Association'
              break;
            case "Y34":
              nonprofit.NTEE = 'Employee Funded Pension Trust'
              break;
            case "Y35":
              nonprofit.NTEE = 'Multi-Employer Pension Plans'
              break;
            case "Y40":
              nonprofit.NTEE = 'Fraternal Beneficiary Societies'
              break;
            case "Y42":
              nonprofit.NTEE = 'Domestic Fraternal Societies'
              break;
            case "Y43":
              nonprofit.NTEE = 'Voluntary Employees Beneficiary Associations (Non-Government)'
              break;
            case "Y44":
              nonprofit.NTEE = 'Voluntary Employees Beneficiary Associations (Government)'
              break;
            case "Y50":
              nonprofit.NTEE = 'Cemeteries, Burial Services'
              break;
            case "Y99":
              nonprofit.NTEE = 'Mutual/Membership Benefit Organizations, Other N.E.C.'
              break;
            case "Z99":
              nonprofit.NTEE = 'Unknown'
              break;
          }
        })
        knex.batchInsert('nonprofits', newBatch, newBatch.length)
          .then(() => {
            console.log('inserted: ', newBatch.length);
          })
          .catch(err => {
            console.log(err, null);
          });

        if (index === batchCount) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
  })
}

function updateDB() {
  return new Promise(async resolve => {
    try {
      var count = await queries.getCount('new_nonprofits')
      var batchSize = 1000
      var batchCount = Math.ceil(count[0].count / batchSize)
      console.log('batchCount: ', batchCount)
      for (var i = 0; i < batchCount; i++) {
        var test = await compareBatch(i, batchCount - 1)
        if (test) {
          resolve()
        }
      }
    } catch (err) {
      console.log(err)
    }
  });
}

module.exports = router;
