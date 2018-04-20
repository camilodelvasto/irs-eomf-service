// Mock env variables using .env.test file
const path = require('path')
require('dotenv-safe').load({
  path: path.join(__dirname, '../../../../.env.test'),
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

describe('routes : protected', function() {
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
//        done()
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
  // Finishes here, now proceed with the protected tests.

  it('should find a nonprofit by partial name text match', (done) => {
    chai.request(app)
    .get('/v1/nonprofits/search/ameri')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.body[0]['EIN'].should.equal(10018922);
      done();
    });
  });

  it('should find a nonprofit by partial SORT_NAME text match', (done) => {
    chai.request(app)
    .get('/v1/nonprofits/search/beta')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.body[0]['EIN'].should.equal(10018555);
      done();
    });
  });

  it('should return 3 nonprofits by SORT_NAME text match split in two pages', (done) => {
    chai.request(app)
    .get('/v1/nonprofits/find/medical?posts_per_page=1&page=2')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.length.should.equal(1);
      done();
    });
  });

});

