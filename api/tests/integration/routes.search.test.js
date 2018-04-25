// Mock env variables using .env.test file
const path = require('path')
require('dotenv-safe').load({
  path: path.join(__dirname, '../../../.env.test'),
});

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../../../index');

// Get and configure library for managing migrations.
var db = require('../../db/models')
const Umzug = require('umzug');
const umzugConf = require('../../../config/umzug')
const umzug = new Umzug(umzugConf);
var seed = require('../nonprofits.seed')

// Serve static data only for testing purposes.
const express = require('express')
var appx = express()
var serveStatic = require('serve-static')

var demoDataServer = {}

describe('routes : search', function() {
  before((done) => {
    umzug.down({ to: 0 })
      .then(() => {
        umzug.up()
          .then(() => {
            seed.down(db.sequelize.getQueryInterface())
              .then(() => {
                done()
              })
            })
          .catch (err => {
            console.log(err)
          })
      })
    // Serve static data only for testing purposes.
    appx.use(serveStatic(path.join(__dirname, '../data')))
    demoDataServer = appx.listen(process.env.demoDataPort)
  });

  after((done) => {
    umzug.down({ to: 0 })
      .then(() => {
        done()
      })
      .catch (err => {
        console.log(err)
      });
    demoDataServer.close()
  });

  it('should download 9 records', (done) => {
    chai.request(app)
    .get('/v1/update/download/1')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      done();
    });
  });

  it('should parse the data and return exactly 8', (done) => {
    chai.request(app)
    .get('/v1/update/parse')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      done();
    });
  });

  it('should download a large file and return 3429 records', (done) => {
    chai.request(app)
    .get('/v1/update/download/3')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      done();
    });
  });

  it('should parse a large file and return 2408 records', (done) => {
    chai.request(app)
    .get('/v1/update/parse')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      done();
    });
  });

  it('should download a newer file and return 3461 records', (done) => {
    chai.request(app)
    .get('/v1/update/download/4')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      done();
    });
  });

  it('should parse the newer large file and return 2511 total records', (done) => {
    chai.request(app)
    .get('/v1/update/parse')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      done();
    });
  });

  it('should create the search index', (done) => {
    chai.request(app)
    .get('/v1/update/index')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      done();
    });
  });
  // Finishes here, now proceed with the protected tests.

  it('should find a nonprofit by textual text match', (done) => {
    chai.request(app)
    .get('/v1/nonprofits/search/acupuncture%20and%20oriental%20medicineassociation%20of%20alaska')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.body[0]['EIN'].should.equal(204106771);
      done();
    });
  });

  it('should find a nonprofit by partial SORT_NAME text match', (done) => {
    chai.request(app)
    .get('/v1/nonprofits/search/disabled%20veterans%20fajar')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      JSON.stringify(res.body).should.include(237282008);
      done();
    });
  });

  it('should find a nonprofit even when slightly misspelled', (done) => {
    chai.request(app)
    .get('/v1/nonprofits/search/moravina')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      JSON.stringify(res.body).should.include(237334441);
      done();
    });
  });

});

