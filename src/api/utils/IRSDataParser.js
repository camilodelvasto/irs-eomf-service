function getClassification(subsection, classification) {
  var codes = classification.split('')
  var classificationAsText = []

  switch (subsection) {
    case "01":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Government Instrumentality')
            break;
        }
      })
      break;
    case "02":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Title-Holding Corporation')
            break;
        }
      })
      break;
    case "03":
      codes.forEach((code) => {
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
      codes.forEach((code) => {
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
      codes.forEach((code) => {
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
      codes.forEach((code) => {
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
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Pleasure, Recreational, or Social Club')
            break;
        }
      })
      break;
    case "08":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Fraternal Beneficiary Society, Order or Association')
            break;
        }
      })
      break;
    case "09":
      codes.forEach((code) => {
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
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Domestic Fraternal Societies and Associations')
            break;
        }
      })
      break;
    case "11":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Teachers Retirement Fund Assoc')
            break;
        }
      })
      break;
    case "12":
      codes.forEach((code) => {
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
      codes.forEach((code) => {
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
      codes.forEach((code) => {
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
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Mutual Insurance Company or Assoc. Other Than Life or Marine')
            break;
        }
      })
      break;
    case "16":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Corp. Financing Crop Operations')
            break;
        }
      })
      break;
    case "17":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Supplemental Unemployment Compensation Trust or Plan')
            break;
        }
      })
      break;
    case "18":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Employee Funded Pension Trust (Created Before 6/25/59)')
            break;
        }
      })
      break;
    case "19":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Post or Organization of War Veterans')
            break;
        }
      })
      break;
    case "20":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Legal Service Organization')
            break;
        }
      })
      break;
    case "21":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Black Lung Trust')
            break;
        }
      })
      break;
    case "22":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Multiemployer Pension Plan')
            break;
        }
      })
      break;
    case "23":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Veterans Assoc. Formed Prior to 1880')
            break;
        }
      })
      break;
    case "24":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Trust Described in Sect. 4049 of ERISA')
            break;
        }
      })
      break;
    case "25":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Title Holding Co. for Pensions, etc.')
            break;
        }
      })
      break;
    case "26":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('State-Sponsored High Risk Health Insurance Organizations')
            break;
        }
      })
      break;
    case "27":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('State-Sponsored Workers\' Compensation Reinsurance')
            break;
        }
      })
      break;
    case "29":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('ACA 1322 Qualified Nonprofit Health Insurance Issuers')
            break;
        }
      })
      break;
    case "40":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Apostolic and Religious Org. (501(d))')
            break;
        }
      })
      break;
    case "50":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Cooperative Hospital Service Organization (501(e))')
            break;
        }
      })
      break;
    case "60":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Cooperative Service Organization of Operating Educational Organization (501(f))')
            break;
        }
      })
      break;
    case "70":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Child Care Organization (501(k))')
            break;
        }
      })
      break;
    case "71":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Charitable Risk Pool')
            break;
        }
      })
      break;
    case "81":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('Qualified State-Sponsored Tuition Program')
            break;
        }
      })
      break;
    case "92":
      codes.forEach((code) => {
        switch (code) {
          case "1": 
            classificationAsText.push('4947(a)(1) - Private Foundation (Form 990PF Filer)')
            break;
        }
      })
      break;
  }
  return classificationAsText.join('; ')
}

function getActivity(activity) {
  var codes = activity.match(/.{3}/g)
  var activityAsText = []
  if (!codes || !codes.length) {
    return
  }
  codes.forEach(value => {
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
  return activityAsText.join('; ')
}

function getNTEE(code) {
  var ntee = code.substring(0, 3)
  switch (ntee) {
    case "A01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "A02":
      return 'Management & Technical Assistance'
      break;
    case "A03":
      return 'Professional Societies, Associations'
      break;
    case "A05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "A11":
      return 'Single Organization Support'
      break;
    case "A12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "A19":
      return 'Nonmonetary Support N.E.C.*'
      break;
    case "A20":
      return 'Arts, Cultural Organizations - Multipurpose'
      break;
    case "A23":
      return 'Cultural, Ethnic Awareness'
      break;
    case "A25":
      return 'Arts Education'
      break;
    case "A26":
      return 'Arts Council/Agency'
      break;
    case "A30":
      return 'Media, Communications Organizations'
      break;
    case "A31":
      return 'Film, Video'
      break;
    case "A32":
      return 'Television'
      break;
    case "A33":
      return 'Printing, Publishing'
      break;
    case "A34":
      return 'Radio'
      break;
    case "A40":
      return 'Visual Arts Organizations'
      break;
    case "A50":
      return 'Museum, Museum Activities'
      break;
    case "A51":
      return 'Art Museums'
      break;
    case "A52":
      return 'Children\'s Museums'
      break;
    case "A54":
      return 'History Museums'
      break;
    case "A56":
      return 'Natural History, Natural Science Museums'
      break;
    case "A57":
      return 'Science and Technology Museums'
      break;
    case "A60":
      return 'Performing Arts Organizations'
      break;
    case "A61":
      return 'Performing Arts Centers'
      break;
    case "A62":
      return 'Dance'
      break;
    case "A63":
      return 'Ballet'
      break;
    case "A65":
      return 'Theater'
      break;
    case "A68":
      return 'Music'
      break;
    case "A69":
      return 'Symphony Orchestras'
      break;
    case "A6A":
      return 'Opera'
      break;
    case "A6B":
      return 'Singing, Choral'
      break;
    case "A6C":
      return 'Music Groups, Bands, Ensembles'
      break;
    case "A6E":
      return 'Performing Arts Schools'
      break;
    case "A70":
      return 'Humanities Organizations'
      break;
    case "A80":
      return 'Historical Societies, Related Historical Activities'
      break;
    case "A84":
      return 'Commemorative Events'
      break;
    case "A90":
      return 'Arts Service Organizations and Activities'
      break;
    case "A99":
      return 'Arts, Culture, and Humanities N.E.C.'
      break;
    case "B01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "B02":
      return 'Management & Technical Assistance'
      break;
    case "B03":
      return 'Professional Societies, Associations'
      break;
    case "B05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "B11":
      return 'Single Organization Support'
      break;
    case "B12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "B19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "B20":
      return 'Elementary, Secondary Education, K - 12'
      break;
    case "B21":
      return 'Kindergarten, Preschool, Nursery School, Early Admissions'
      break;
    case "B24":
      return 'Primary, Elementary Schools'
      break;
    case "B25":
      return 'Secondary, High School'
      break;
    case "B28":
      return 'Specialized Education Institutions'
      break;
    case "B30":
      return 'Vocational, Technical Schools'
      break;
    case "B40":
      return 'Higher Education Institutions'
      break;
    case "B41":
      return 'Community or Junior Colleges'
      break;
    case "B42":
      return 'Undergraduate College (4-year)'
      break;
    case "B43":
      return 'University or Technological Institute'
      break;
    case "B50":
      return 'Graduate, Professional Schools (Separate Entities)'
      break;
    case "B60":
      return 'Adult, Continuing Education'
      break;
    case "B70":
      return 'Libraries'
      break;
    case "B80":
      return 'Student Services, Organizations of Students'
      break;
    case "B82":
      return 'Scholarships, Student Financial Aid Services, Awards'
      break;
    case "B83":
      return 'Student Sororities, Fraternities'
      break;
    case "B84":
      return 'Alumni Associations'
      break;
    case "B90":
      return 'Educational Services and Schools - Other'
      break;
    case "B92":
      return 'Remedial Reading, Reading Encouragement '
      break;
    case "B94":
      return 'Parent/Teacher Group'
      break;
    case "B99":
      return 'Education N.E.C.'
      break;
    case "C01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "C02":
      return 'Management & Technical Assistance'
      break;
    case "C03":
      return 'Professional Societies, Associations'
      break;
    case "C05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "C11":
      return 'Single Organization Support'
      break;
    case "C12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "C19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "C20":
      return 'Pollution Abatement and Control Services'
      break;
    case "C27":
      return 'Recycling Programs'
      break;
    case "C30":
      return 'Natural Resources Conservation and Protection'
      break;
    case "C32":
      return 'Water Resource, Wetlands Conservation and Management'
      break;
    case "C34":
      return 'Land Resources Conservation'
      break;
    case "C35":
      return 'Energy Resources Conservation and Development'
      break;
    case "C36":
      return 'Forest Conservation'
      break;
    case "C40":
      return 'Botanical, Horticultural, and Landscape Services'
      break;
    case "C41":
      return 'Botanical Gardens, Arboreta and Botanical Organizations'
      break;
    case "C42":
      return 'Garden Club, Horticultural Program'
      break;
    case "C50":
      return 'Environmental Beautification and Aesthetics'
      break;
    case "C60":
      return 'Environmental Education and Outdoor Survival Programs'
      break;
    case "C99":
      return 'Environmental Quality, Protection, and Beautification N.E.C.'
      break;
    case "D01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "D02":
      return 'Management & Technical Assistance'
      break;
    case "D03":
      return 'Professional Societies, Associations'
      break;
    case "D05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "D11":
      return 'Single Organization Support'
      break;
    case "D12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "D19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "D20":
      return 'Animal Protection and Welfare'
      break;
    case "D30":
      return 'Wildlife Preservation, Protection'
      break;
    case "D31":
      return 'Protection of Endangered Species'
      break;
    case "D32":
      return 'Bird Sanctuary, Preserve'
      break;
    case "D33":
      return 'Fisheries Resources'
      break;
    case "D34":
      return 'Wildlife Sanctuary, Refuge'
      break;
    case "D40":
      return 'Veterinary Services'
      break;
    case "D50":
      return 'Zoo, Zoological Society'
      break;
    case "D60":
      return 'Other Services - Specialty Animals'
      break;
    case "D61":
      return 'Animal Training, Behavior'
      break;
    case "D99":
      return 'Animal-Related N.E.C.'
      break;
    case "E01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "E02":
      return 'Management & Technical Assistance'
      break;
    case "E03":
      return 'Professional Societies, Associations'
      break;
    case "E05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "E11":
      return 'Single Organization Support'
      break;
    case "E12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "E19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "E20":
      return 'Hospitals and Related Primary Medical Care Facilities'
      break;
    case "E21":
      return 'Community Health Systems'
      break;
    case "E22":
      return 'Hospital, General'
      break;
    case "E24":
      return 'Hospital, Specialty'
      break;
    case "E30":
      return 'Health Treatment Facilities, Primarily Outpatient'
      break;
    case "E31":
      return 'Group Health Practice (Health Maintenance Organizations)'
      break;
    case "E32":
      return 'Ambulatory Health Center, Community Clinic'
      break;
    case "E40":
      return 'Reproductive Health Care Facilities and Allied Services'
      break;
    case "E42":
      return 'Family Planning Centers'
      break;
    case "E50":
      return 'Rehabilitative Medical Services'
      break;
    case "E60":
      return 'Health Support Services'
      break;
    case "E61":
      return 'Blood Supply Related'
      break;
    case "E62":
      return 'Ambulance, Emergency Medical Transport Services'
      break;
    case "E65":
      return 'Organ and Tissue Banks'
      break;
    case "E70":
      return 'Public Health Program (Includes General Health and Wellness Promotion Services)'
      break;
    case "E80":
      return 'Health, General and Financing'
      break;
    case "E86":
      return 'Patient Services - Entertainment, Recreation'
      break;
    case "E90":
      return 'Nursing Services (General)'
      break;
    case "E91":
      return 'Nursing, Convalescent Facilities'
      break;
    case "E92":
      return 'Home Health Care'
      break;
    case "E99":
      return 'Health - General and Rehabilitative N.E.C.'
      break;
    case "F01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "F02":
      return 'Management & Technical Assistance'
      break;
    case "F03":
      return 'Professional Societies, Associations'
      break;
    case "F05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "F11":
      return 'Single Organization Support'
      break;
    case "F12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "F19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "F20":
      return 'Alcohol, Drug and Substance Abuse, Dependency Prevention and Treatment'
      break;
    case "F21":
      return 'Alcohol, Drug Abuse, Prevention Only'
      break;
    case "F22":
      return 'Alcohol, Drug Abuse, Treatment Only'
      break;
    case "F30":
      return 'Mental Health Treatment - Multipurpose and N.E.C.'
      break;
    case "F31":
      return 'Psychiatric, Mental Health Hospital'
      break;
    case "F32":
      return 'Community Mental Health Center'
      break;
    case "F33":
      return 'Group Home, Residential Treatment Facility - Mental Health Related'
      break;
    case "F40":
      return 'Hot Line, Crisis Intervention Services'
      break;
    case "F42":
      return 'Rape Victim Services'
      break;
    case "F50":
      return 'Addictive Disorders N.E.C.'
      break;
    case "F52":
      return 'Smoking Addiction'
      break;
    case "F53":
      return 'Eating Disorder, Addiction'
      break;
    case "F54":
      return 'Gambling Addiction'
      break;
    case "F60":
      return 'Counseling, Support Groups'
      break;
    case "F70":
      return 'Mental Health Disorders'
      break;
    case "F80":
      return 'Mental Health Association, Multipurpose'
      break;
    case "F99":
      return 'Mental Health, Crisis Intervention N.E.C.'
      break;
    case "G01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "G02":
      return 'Management & Technical Assistance'
      break;
    case "G03":
      return 'Professional Societies, Associations'
      break;
    case "G05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "G11":
      return 'Single Organization Support'
      break;
    case "G12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "G19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "G20":
      return 'Birth Defects and Genetic Diseases'
      break;
    case "G25":
      return 'Down Syndrome'
      break;
    case "G30":
      return 'Cancer'
      break;
    case "G40":
      return 'Diseases of Specific Organs'
      break;
    case "G41":
      return 'Eye Diseases, Blindness and Vision Impairments'
      break;
    case "G42":
      return 'Ear and Throat Diseases'
      break;
    case "G43":
      return 'Heart and Circulatory System Diseases, Disorders'
      break;
    case "G44":
      return 'Kidney Disease'
      break;
    case "G45":
      return 'Lung Disease'
      break;
    case "G48":
      return 'Brain Disorders'
      break;
    case "G50":
      return 'Nerve, Muscle and Bone Diseases'
      break;
    case "G51":
      return 'Arthritis'
      break;
    case "G54":
      return 'Epilepsy'
      break;
    case "G60":
      return 'Allergy Related Diseases'
      break;
    case "G61":
      return 'Asthma'
      break;
    case "G70":
      return 'Digestive Diseases, Disorders'
      break;
    case "G80":
      return 'Specifically Named Diseases'
      break;
    case "G81":
      return 'AIDS'
      break;
    case "G83":
      return 'Alzheimer\'s Disease'
      break;
    case "G84":
      return 'Autism'
      break;
    case "G90":
      return 'Medical Disciplines'
      break;
    case "G92":
      return 'Biomedicine, Bioengineering'
      break;
    case "G94":
      return 'Geriatrics'
      break;
    case "G96":
      return 'Neurology, Neuroscience'
      break;
    case "G98":
      return 'Pediatrics'
      break;
    case "G9B":
      return 'Surgery'
      break;
    case "G99":
      return 'Diseases, Disorders, Medical Disciplines N.E.C.'
      break;
    case "H01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "H02":
      return 'Management & Technical Assistance'
      break;
    case "H03":
      return 'Professional Societies, Associations'
      break;
    case "H05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "H11":
      return 'Single Organization Support'
      break;
    case "H12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "H19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "H20":
      return 'Birth Defects, Genetic Diseases Research'
      break;
    case "H25":
      return 'Down Syndrome Research'
      break;
    case "H30":
      return 'Cancer Research'
      break;
    case "H40":
      return 'Specific Organ Research'
      break;
    case "H41":
      return 'Eye Research'
      break;
    case "H42":
      return 'Ear and Throat Research'
      break;
    case "H43":
      return 'Heart, Circulatory Research'
      break;
    case "H44":
      return 'Kidney Research'
      break;
    case "H45":
      return 'Lung Research'
      break;
    case "H48":
      return 'Brain Disorders Research'
      break;
    case "H50":
      return 'Nerve, Muscle, Bone Research'
      break;
    case "H51":
      return 'Arthritis Research'
      break;
    case "H54":
      return 'Epilepsy Research'
      break;
    case "H60":
      return 'Allergy Related Disease Research'
      break;
    case "H61":
      return 'Asthma Research'
      break;
    case "H70":
      return 'Digestive Disease, Disorder Research'
      break;
    case "H80":
      return 'Specifically Named Diseases Research'
      break;
    case "H81":
      return 'AIDS Research'
      break;
    case "H83":
      return 'Alzheimer\'s Disease Research'
      break;
    case "H84":
      return 'Autism Research'
      break;
    case "H90":
      return 'Medical Specialty Research'
      break;
    case "H92":
      return 'Biomedicine, Bioengineering Research'
      break;
    case "H94":
      return 'Geriatrics Research'
      break;
    case "H96":
      return 'Neurology, Neuroscience Research'
      break;
    case "H98":
      return 'Pediatrics Research'
      break;
    case "H9B":
      return 'Surgery Research'
      break;
    case "H99":
      return 'Medical Research N.E.C.'
      break;
    case "I01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "I02":
      return 'Management & Technical Assistance'
      break;
    case "I03":
      return 'Professional Societies, Associations'
      break;
    case "I05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "I11":
      return 'Single Organization Support'
      break;
    case "I12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "I19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "I20":
      return 'Crime Prevention N.E.C.'
      break;
    case "I21":
      return 'Delinquency Prevention'
      break;
    case "I23":
      return 'Drunk Driving Related'
      break;
    case "I30":
      return 'Correctional Facilities N.E.C.'
      break;
    case "I31":
      return 'Transitional Care, Half-Way House for Offenders, Ex-Offenders'
      break;
    case "I40":
      return 'Rehabilitation Services for Offenders'
      break;
    case "I43":
      return 'Services to Prisoners and Families - Multipurpose'
      break;
    case "I44":
      return 'Prison Alternatives'
      break;
    case "I50":
      return 'Administration of Justice, Courts'
      break;
    case "I51":
      return 'Dispute Resolution, Mediation Services'
      break;
    case "I60":
      return 'Law Enforcement Agencies (Police Departments)'
      break;
    case "I70":
      return 'Protection Against, Prevention of Neglect, Abuse, Exploitation'
      break;
    case "I71":
      return 'Spouse Abuse, Prevention of'
      break;
    case "I72":
      return 'Child Abuse, Prevention of'
      break;
    case "I73":
      return 'Sexual Abuse, Prevention of'
      break;
    case "I80":
      return 'Legal Services'
      break;
    case "I83":
      return 'Public Interest Law, Litigation'
      break;
    case "I99":
      return 'Crime, Legal Related N.E.C.'
      break;
    case "J01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "J02":
      return 'Management & Technical Assistance'
      break;
    case "J03":
      return 'Professional Societies, Associations'
      break;
    case "J05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "J11":
      return 'Single Organization Support'
      break;
    case "J12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "J19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "J20":
      return 'Employment Procurement Assistance, Job Training'
      break;
    case "J21":
      return 'Vocational Counseling, Guidance and Testing'
      break;
    case "J22":
      return 'Vocational Training'
      break;
    case "J30":
      return 'Vocational Rehabilitation'
      break;
    case "J32":
      return 'Goodwill Industries'
      break;
    case "J33":
      return 'Sheltered Remunerative Employment, Work Activity Center N.E.C. '
      break;
    case "J40":
      return 'Labor Unions, Organizations'
      break;
    case "J99":
      return 'Employment, Job Related N.E.C.'
      break;
    case "K01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "K02":
      return 'Management & Technical Assistance'
      break;
    case "K03":
      return 'Professional Societies, Associations'
      break;
    case "K05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "K11":
      return 'Single Organization Support'
      break;
    case "K12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "K19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "K20":
      return 'Agricultural Programs'
      break;
    case "K25":
      return 'Farmland Preservation'
      break;
    case "K26":
      return 'Livestock Breeding, Development, Management '
      break;
    case "K28":
      return 'Farm Bureau, Grange'
      break;
    case "K30":
      return 'Food Service, Free Food Distribution Programs'
      break;
    case "K31":
      return 'Food Banks, Food Pantries'
      break;
    case "K34":
      return 'Congregate Meals'
      break;
    case "K35":
      return 'Eatery, Agency, Organization Sponsored'
      break;
    case "K36":
      return 'Meals on Wheels'
      break;
    case "K40":
      return 'Nutrition Programs'
      break;
    case "K50":
      return 'Home Economics'
      break;
    case "K99":
      return 'Food, Agriculture, and Nutrition N.E.C.'
      break;
    case "L01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "L02":
      return 'Management & Technical Assistance'
      break;
    case "L03":
      return 'Professional Societies, Associations'
      break;
    case "L05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "L11":
      return 'Single Organization Support'
      break;
    case "L12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "L19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "L20":
      return 'Housing Development, Construction, Management'
      break;
    case "L21":
      return 'Public Housing Facilities'
      break;
    case "L22":
      return 'Senior Citizens\' Housing/Retirement Communities'
      break;
    case "L25":
      return 'Housing Rehabilitation'
      break;
    case "L30":
      return 'Housing Search Assistance'
      break;
    case "L40":
      return 'Low-Cost Temporary Housing'
      break;
    case "L41":
      return 'Homeless, Temporary Shelter For'
      break;
    case "L50":
      return 'Housing Owners, Renters Organizations'
      break;
    case "L80":
      return 'Housing Support Services -- Other'
      break;
    case "L81":
      return 'Home Improvement and Repairs'
      break;
    case "L82":
      return 'Housing Expense Reduction Support'
      break;
    case "L99":
      return 'Housing, Shelter N.E.C.'
      break;
    case "M01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "M02":
      return 'Management & Technical Assistance'
      break;
    case "M03":
      return 'Professional Societies, Associations'
      break;
    case "M05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "M11":
      return 'Single Organization Support'
      break;
    case "M12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "M19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "M20":
      return 'Disaster Preparedness and Relief Services'
      break;
    case "M23":
      return 'Search and Rescue Squads, Services'
      break;
    case "M24":
      return 'Fire Prevention, Protection, Control'
      break;
    case "M40":
      return 'Safety Education'
      break;
    case "M41":
      return 'First Aid Training, Services'
      break;
    case "M42":
      return 'Automotive Safety'
      break;
    case "M99":
      return 'Public Safety, Disaster Preparedness, and Relief N.E.C.'
      break;
    case "N01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "N02":
      return 'Management & Technical Assistance'
      break;
    case "N03":
      return 'Professional Societies, Associations'
      break;
    case "N05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "N11":
      return 'Single Organization Support'
      break;
    case "N12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "N19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "N20":
      return 'Recreational and Sporting Camps'
      break;
    case "N30":
      return 'Physical Fitness and Community Recreational Facilities'
      break;
    case "N31":
      return 'Community Recreational Centers'
      break;
    case "N32":
      return 'Parks and Playgrounds'
      break;
    case "N40":
      return 'Sports Training Facilities, Agencies'
      break;
    case "N50":
      return 'Recreational, Pleasure, or Social Club'
      break;
    case "N52":
      return 'Fairs, County and Other'
      break;
    case "N60":
      return 'Amateur Sports Clubs, Leagues, N.E.C.'
      break;
    case "N61":
      return 'Fishing, Hunting Clubs'
      break;
    case "N62":
      return 'Basketball'
      break;
    case "N63":
      return 'Baseball, Softball'
      break;
    case "N64":
      return 'Soccer Clubs, Leagues'
      break;
    case "N65":
      return 'Football Clubs, Leagues'
      break;
    case "N66":
      return 'Tennis, Racquet Sports Clubs, Leagues'
      break;
    case "N67":
      return 'Swimming, Water Recreation'
      break;
    case "N68":
      return 'Winter Sports (Snow and Ice)'
      break;
    case "N69":
      return 'Equestrian, Riding'
      break;
    case "N6A":
      return 'Golf'
      break;
    case "N70":
      return 'Amateur Sports Competitions'
      break;
    case "N71":
      return 'Olympics Committees and Related International Competitions'
      break;
    case "N72":
      return 'Special Olympics'
      break;
    case "N80":
      return 'Professional Athletic Leagues'
      break;
    case "N99":
      return 'Recreation, Sports, Leisure, Athletics N.E.C.'
      break;
    case "O01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "O02":
      return 'Management & Technical Assistance'
      break;
    case "O03":
      return 'Professional Societies, Associations'
      break;
    case "O05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "O11":
      return 'Single Organization Support'
      break;
    case "O12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "O19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "O20":
      return 'Youth Centers, Clubs, Multipurpose'
      break;
    case "O21":
      return 'Boys Clubs'
      break;
    case "O22":
      return 'Girls Clubs'
      break;
    case "O23":
      return 'Boys and Girls Clubs (Combined)'
      break;
    case "O30":
      return 'Adult, Child Matching Programs'
      break;
    case "O31":
      return 'Big Brothers, Big Sisters'
      break;
    case "O40":
      return 'Scouting Organizations'
      break;
    case "O41":
      return 'Boy Scouts of America'
      break;
    case "O42":
      return 'Girl Scouts of the U.S.A.'
      break;
    case "O43":
      return 'Camp Fire'
      break;
    case "O50":
      return 'Youth Development Programs, Other'
      break;
    case "O51":
      return 'Youth Community Service Clubs'
      break;
    case "052":
      return 'Youth Development - Agricultural'
      break;
    case "O53":
      return 'Youth Development - Business'
      break;
    case "O54":
      return 'Youth Development - Citizenship Programs'
      break;
    case "O55":
      return 'Youth Development - Religious Leadership'
      break;
    case "O99":
      return 'Youth Development N.E.C.'
      break;
    case "P01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "P02":
      return 'Management & Technical Assistance'
      break;
    case "P03":
      return 'Professional Societies, Associations'
      break;
    case "P05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "P11":
      return 'Single Organization Support'
      break;
    case "P12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "P19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "P20":
      return 'Human Service Organizations - Multipurpose'
      break;
    case "P21":
      return 'American Red Cross'
      break;
    case "P22":
      return 'Urban League'
      break;
    case "P24":
      return 'Salvation Army'
      break;
    case "P26":
      return 'Volunteers of America'
      break;
    case "P27":
      return 'Young Men\'s or Women\'s Associations (YMCA, YWCA, YWHA, YMHA)'
      break;
    case "P28":
      return 'Neighborhood Centers, Settlement Houses'
      break;
    case "P29":
      return 'Thrift Shops'
      break;
    case "P30":
      return 'Children\'s, Youth Services'
      break;
    case "P31":
      return 'Adoption'
      break;
    case "P32":
      return 'Foster Care'
      break;
    case "P33":
      return 'Child Day Care'
      break;
    case "P40":
      return 'Family Services'
      break;
    case "P42":
      return 'Single Parent Agencies, Services'
      break;
    case "P43":
      return 'Family Violence Shelters, Services'
      break;
    case "P44":
      return 'Homemaker, Home Health Aide'
      break;
    case "P45":
      return 'Family Services, Adolescent Parents'
      break;
    case "P46":
      return 'Family Counseling'
      break;
    case "P50":
      return 'Personal Social Services'
      break;
    case "P51":
      return 'Financial Counseling, Money Management '
      break;
    case "P52":
      return 'Transportation, Free or Subsidized'
      break;
    case "P58":
      return 'Gift Distribution'
      break;
    case "P60":
      return 'Emergency Assistance (Food, Clothing, Cash)'
      break;
    case "P61":
      return 'Travelers\' Aid'
      break;
    case "P62":
      return 'Victims\' Services'
      break;
    case "P70":
      return 'Residential, Custodial Care'
      break;
    case "P72":
      return 'Half-Way House (Short-Term Residential Care)'
      break;
    case "P73":
      return 'Group Home (Long Term)'
      break;
    case "P74":
      return 'Hospice'
      break;
    case "P75":
      return 'Senior Continuing Care Communities'
      break;
    case "P80":
      return 'Services to Promote the Independence of Specific Populations'
      break;
    case "P81":
      return 'Senior Centers, Services'
      break;
    case "P82":
      return 'Developmentally Disabled Centers, Services'
      break;
    case "P84":
      return 'Ethnic, Immigrant Centers, Services'
      break;
    case "P85":
      return 'Homeless Persons Centers, Services'
      break;
    case "P86":
      return 'Blind/Visually Impaired Centers, Services'
      break;
    case "P87":
      return 'Deaf/Hearing Impaired Centers, Services'
      break;
    case "P99":
      return 'Human Services - Multipurpose and Other N.E.C.'
      break;
    case "Q01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "Q02":
      return 'Management & Technical Assistance'
      break;
    case "Q03":
      return 'Professional Societies, Associations'
      break;
    case "Q05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "Q11":
      return 'Single Organization Support'
      break;
    case "Q12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "Q19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "Q20":
      return 'Promotion of International Understanding'
      break;
    case "Q21":
      return 'International Cultural Exchange'
      break;
    case "Q22":
      return 'International Student Exchange and Aid'
      break;
    case "Q23":
      return 'International Exchanges, N.E.C.'
      break;
    case "Q30":
      return 'International Development, Relief Services'
      break;
    case "Q31":
      return 'International Agricultural Development'
      break;
    case "Q32":
      return 'International Economic Development'
      break;
    case "Q33":
      return 'International Relief'
      break;
    case "Q40":
      return 'International Peace and Security'
      break;
    case "Q41":
      return 'Arms Control, Peace Organizations'
      break;
    case "Q42":
      return 'United Nations Association'
      break;
    case "Q43":
      return 'National Security, Domestic'
      break;
    case "Q70":
      return 'International Human Rights'
      break;
    case "Q71":
      return 'International Migration, Refugee Issues'
      break;
    case "Q99":
      return 'International, Foreign Affairs, and National Security N.E.C.'
      break;
    case "R01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "R02":
      return 'Management & Technical Assistance'
      break;
    case "R03":
      return 'Professional Societies, Associations'
      break;
    case "R05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "R11":
      return 'Single Organization Support'
      break;
    case "R12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "R19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "R20":
      return 'Civil Rights, Advocacy for Specific Groups'
      break;
    case "R22":
      return 'Minority Rights'
      break;
    case "R23":
      return 'Disabled Persons\' Rights'
      break;
    case "R24":
      return 'Women\'s Rights'
      break;
    case "R25":
      return 'Seniors\' Rights'
      break;
    case "R26":
      return 'Lesbian, Gay Rights'
      break;
    case "R30":
      return 'Intergroup, Race Relations'
      break;
    case "R40":
      return 'Voter Education, Registration'
      break;
    case "R60":
      return 'Civil Liberties Advocacy'
      break;
    case "R61":
      return 'Reproductive Rights'
      break;
    case "R62":
      return 'Right to Life'
      break;
    case "R63":
      return 'Censorship, Freedom of Speech and Press Issues'
      break;
    case "R67":
      return 'Right to Die, Euthanasia Issues'
      break;
    case "R99":
      return 'Civil Rights, Social Action, Advocacy N.E.C.'
      break;
    case "S01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "S02":
      return 'Management & Technical Assistance'
      break;
    case "S03":
      return 'Professional Societies, Associations'
      break;
    case "S05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "S11":
      return 'Single Organization Support'
      break;
    case "S12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "S19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "S20":
      return 'Community, Neighborhood Development, Improvement (General)'
      break;
    case "S21":
      return 'Community Coalitions'
      break;
    case "S22":
      return 'Neighborhood, Block Associations'
      break;
    case "S30":
      return 'Economic Development'
      break;
    case "S31":
      return 'Urban, Community Economic Development'
      break;
    case "S32":
      return 'Rural Development'
      break;
    case "S40":
      return 'Business and Industry'
      break;
    case "S41":
      return 'Promotion of Business'
      break;
    case "S43":
      return 'Management Services for Small Business, Entrepreneurs'
      break;
    case "S46":
      return 'Boards of Trade'
      break;
    case "S47":
      return 'Real Estate Organizations'
      break;
    case "S50":
      return 'Nonprofit Management'
      break;
    case "S80":
      return 'Community Service Clubs'
      break;
    case "S81":
      return 'Women\'s Service Clubs'
      break;
    case "S82":
      return 'Men\'s Service Clubs'
      break;
    case "S99":
      return 'Community Improvement, Capacity Building N.E.C.'
      break;
    case "T01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "T02":
      return 'Management & Technical Assistance'
      break;
    case "T03":
      return 'Professional Societies, Associations'
      break;
    case "T05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "T11":
      return 'Single Organization Support'
      break;
    case "T12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "T19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "T20":
      return 'Private Grantmaking Foundations'
      break;
    case "T21":
      return 'Corporate Foundations'
      break;
    case "T22":
      return 'Private Independent Foundations'
      break;
    case "T23":
      return 'Private Operating Foundations'
      break;
    case "T30":
      return 'Public Foundations'
      break;
    case "T31":
      return 'Community Foundations'
      break;
    case "T40":
      return 'Voluntarism Promotion'
      break;
    case "T50":
      return 'Philanthropy, Charity, Voluntarism Promotion, General'
      break;
    case "T70":
      return 'Fund Raising Organizations That Cross Categories'
      break;
    case "T90":
      return 'Named Trusts/Foundations N.E.C.'
      break;
    case "T99":
      return 'Philanthropy, Voluntarism, and Grantmaking Foundations N.E.C.'
      break;
    case "U01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "U02":
      return 'Management & Technical Assistance'
      break;
    case "U03":
      return 'Professional Societies, Associations'
      break;
    case "U05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "U11":
      return 'Single Organization Support'
      break;
    case "U12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "U19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "U20":
      return 'Science, General'
      break;
    case "U21":
      return 'Marine Science and Oceanography'
      break;
    case "U30":
      return 'Physical Sciences, Earth Sciences Research and Promotion'
      break;
    case "U31":
      return 'Astronomy'
      break;
    case "U33":
      return 'Chemistry, Chemical Engineering'
      break;
    case "U34":
      return 'Mathematics'
      break;
    case "U36":
      return 'Geology'
      break;
    case "U40":
      return 'Engineering and Technology Research, Services'
      break;
    case "U41":
      return 'Computer Science'
      break;
    case "U42":
      return 'Engineering'
      break;
    case "U50":
      return 'Biological, Life Science Research'
      break;
    case "U99":
      return 'Science and Technology Research Institutes, Services N.E.C.'
      break;
    case "V01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "V02":
      return 'Management & Technical Assistance'
      break;
    case "V03":
      return 'Professional Societies, Associations'
      break;
    case "V05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "V11":
      return 'Single Organization Support'
      break;
    case "V12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "V19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "V20":
      return 'Social Science Institutes, Services'
      break;
    case "V21":
      return 'Anthropology, Sociology'
      break;
    case "V22":
      return 'Economics (as a social science)'
      break;
    case "V23":
      return 'Behavioral Science'
      break;
    case "V24":
      return 'Political Science'
      break;
    case "V25":
      return 'Population Studies'
      break;
    case "V26":
      return 'Law, International Law, Jurisprudence'
      break;
    case "V30":
      return 'Interdisciplinary Research'
      break;
    case "V31":
      return 'Black Studies'
      break;
    case "V32":
      return 'Women\'s Studies'
      break;
    case "V33":
      return 'Ethnic Studies'
      break;
    case "V34":
      return 'Urban Studies'
      break;
    case "V35":
      return 'International Studies'
      break;
    case "V36":
      return 'Gerontology (as a social science)'
      break;
    case "V37":
      return 'Labor Studies'
      break;
    case "V99":
      return 'Social Science Research Institutes, Services N.E.C.'
      break;
    case "W01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "W02":
      return 'Management & Technical Assistance'
      break;
    case "W03":
      return 'Professional Societies, Associations'
      break;
    case "W05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "W11":
      return 'Single Organization Support'
      break;
    case "W12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "W19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "W20":
      return 'Government and Public Administration'
      break;
    case "W22":
      return 'Public Finance, Taxation, Monetary Policy'
      break;
    case "W24":
      return 'Citizen Participation'
      break;
    case "W30":
      return 'Military, Veterans\' Organizations'
      break;
    case "W40":
      return 'Public Transportation Systems, Services'
      break;
    case "W50":
      return 'Telephone, Telegraph and Telecommunication Services'
      break;
    case "W60":
      return 'Financial Institutions, Services (Non-Government Related)'
      break;
    case "W61":
      return 'Credit Unions'
      break;
    case "W70":
      return 'Leadership Development'
      break;
    case "W80":
      return 'Public Utilities'
      break;
    case "W90":
      return 'Consumer Protection, Safety'
      break;
    case "W99":
      return 'Public, Society Benefit - Multipurpose and Other N.E.C.'
      break;
    case "X01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "X02":
      return 'Management & Technical Assistance'
      break;
    case "X03":
      return 'Professional Societies, Associations'
      break;
    case "X05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "X11":
      return 'Single Organization Support'
      break;
    case "X12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "X19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "X20":
      return 'Christian'
      break;
    case "X21":
      return 'Protestant'
      break;
    case "X22":
      return 'Roman Catholic'
      break;
    case "X30":
      return 'Jewish'
      break;
    case "X40":
      return 'Islamic'
      break;
    case "X50":
      return 'Buddhist'
      break;
    case "X70":
      return 'Hindu'
      break;
    case "X80":
      return 'Religious Media, Communications Organizations'
      break;
    case "X81":
      return 'Religious Film, Video'
      break;
    case "X82":
      return 'Religious Television'
      break;
    case "X83":
      return 'Religious Printing, Publishing'
      break;
    case "X84":
      return 'Religious Radio'
      break;
    case "X90":
      return 'Interfaith Issues'
      break;
    case "X99":
      return 'Religion Related, Spiritual Development N.E.C.'
      break;
    case "Y01":
      return 'Alliance/Advocacy Organizations'
      break;
    case "Y02":
      return 'Management & Technical Assistance'
      break;
    case "Y03":
      return 'Professional Societies, Associations'
      break;
    case "Y05":
      return 'Research Institutes and/or Public Policy Analysis'
      break;
    case "Y11":
      return 'Single Organization Support'
      break;
    case "Y12":
      return 'Fund Raising and/or Fund Distribution'
      break;
    case "Y19":
      return 'Nonmonetary Support N.E.C.'
      break;
    case "Y20":
      return 'Insurance Providers, Services'
      break;
    case "Y22":
      return 'Local Benevolent Life Insurance Associations, Mutual Irrigation and Telephone Companies, and Like Organizations'
      break;
    case "Y23":
      return 'Mutual Insurance Company or Association'
      break;
    case "Y24":
      return 'Supplemental Unemployment Compensation'
      break;
    case "Y25":
      return 'State-Sponsored Worker\'s Compensation Reinsurance Organizations'
      break;
    case "Y30":
      return 'Pension and Retirement Funds'
      break;
    case "Y33":
      return 'Teachers Retirement Fund Association'
      break;
    case "Y34":
      return 'Employee Funded Pension Trust'
      break;
    case "Y35":
      return 'Multi-Employer Pension Plans'
      break;
    case "Y40":
      return 'Fraternal Beneficiary Societies'
      break;
    case "Y42":
      return 'Domestic Fraternal Societies'
      break;
    case "Y43":
      return 'Voluntary Employees Beneficiary Associations (Non-Government)'
      break;
    case "Y44":
      return 'Voluntary Employees Beneficiary Associations (Government)'
      break;
    case "Y50":
      return 'Cemeteries, Burial Services'
      break;
    case "Y99":
      return 'Mutual/Membership Benefit Organizations, Other N.E.C.'
      break;
    case "Z99":
      return 'Unknown'
      break;
    default:
      return ""
      break;
  }

}

module.exports = {
  getActivity,
  getClassification,
  getNTEE
}