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

describe('routes : protected', function() {
  // This is needed as downloading the large files will take several minutes.
  this.timeout(150000);

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

  it('should reject the connection if not authorized via token bearer ', (done) => {
    chai.request(app)
    .get('/v1/protected/nonprofits')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hs')
    .end((err, res) => {
      should.exist(err);
      res.status.should.equal(401);
      done();
    });
  });

  // Starting here, these tests are not for this endpoint but just preparing the setup for the correct tests.
  // No need to assert anything here.
  it('should clear the DB and return 0 records', (done) => {
    chai.request(app)
    .get('/v1/update/clear')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      done();
    });
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

  it('should count 2400 revoked nonprofits', (done) => {
    chai.request(app)
    .get('/v1/protected/revoked/count')
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

  it('should count 168 revoked nonprofits', (done) => {
    chai.request(app)
    .get('/v1/protected/revoked/count')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.count.should.equal(168);
      done();
    });
  });

  it('should return 10 revoked nonprofits', (done) => {
    chai.request(app)
    .get('/v1/protected/revoked')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.length.should.equal(10);
      done();
    });
  });

  it('should delete all the revoked nonprofits', (done) => {
    chai.request(app)
    .get('/v1/protected/revoked/delete')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.count.should.equal(168);
      done();
    });
  });

  it('should count 0 revoked nonprofits after delete method is called', (done) => {
    chai.request(app)
    .get('/v1/protected/revoked/count')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.count.should.equal(0);
      done();
    });
  });

  it('should return nonprofits ordered by income, descending', (done) => {
    chai.request(app)
    .get('/v1/protected/custom/?posts_per_page=2&order=DESC&sort_by="income_amt')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.length.should.equal(2);
      parseInt(res.body[0]['INCOME_AMT'], 10).should.be.above(parseInt(res.body[1]['INCOME_AMT'], 10));
      done();
    });
  });

});

