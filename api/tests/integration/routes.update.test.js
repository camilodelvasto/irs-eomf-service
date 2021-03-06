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

describe('routes : update', function() {
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
    .get('/v1/update/clear')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hs')
    .end((err, res) => {
      should.exist(err);
      res.status.should.equal(401);
      done();
    });
  });

  it('should clear the DB and return 0 records', (done) => {
    chai.request(app)
    .get('/v1/update/clear')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.status.should.eql('success');
      res.body.message.should.eql('The table was successfully emptied');
      done();
    });
  });

  it('should import nothing if the URL part does not exist', (done) => {
    chai.request(app)
    .get('/v1/update/download/0')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.status.should.eql('error');
      res.body.message.should.eql('Import was not completed/bad request');
      done();
    });
  });

  it('should download 9 records', (done) => {
    chai.request(app)
    .get('/v1/update/download/1')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.status.should.eql('success');
      res.body.message.should.eql('Import performed successfully');
      res.body.count.should.eql(9);
      done();
    });
  });

  it('should parse the data and return exactly 8', (done) => {
    chai.request(app)
    .get('/v1/update/parse')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.status.should.eql('success');
      res.body.message.should.eql('Update performed successfully');
      res.body.count.should.eql(8);
      done();
    });
  });

  it('should download a large file and return 3429 records', (done) => {
    chai.request(app)
    .get('/v1/update/download/3')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.status.should.eql('success');
      res.body.message.should.eql('Import performed successfully');
      res.body.count.should.eql(3429);
      done();
    });
  });

  it('should parse a large file and return 2408 records', (done) => {
    chai.request(app)
    .get('/v1/update/parse')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.status.should.eql('success');
      res.body.message.should.eql('Update performed successfully');
      res.body.count.should.eql(2408);
      done();
    });
  });

  it('should count 0 revoked nonprofits', (done) => {
    chai.request(app)
    .get('/v1/protected/revoked/count')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.count.should.eql(0);
      done();
    });
  });

  it('should mark all nonprofits as non-validated', (done) => {
    chai.request(app)
    .get('/v1/update/download/prepare')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      done();
    });
  });


  it('should download a newer file and return 3461 records', (done) => {
    chai.request(app)
    .get('/v1/update/download/4')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.status.should.eql('success');
      res.body.message.should.eql('Import performed successfully');
      res.body.count.should.eql(3461);
      done();
    });
  });

  it('should parse the newer large file and return 2511 total records', (done) => {
    chai.request(app)
    .get('/v1/update/parse')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.status.should.eql('success');
      res.body.message.should.eql('Update performed successfully');
      res.body.count.should.eql(2511);
      done();
    });
  });

  it('should count 66 revoked nonprofits', (done) => {
    chai.request(app)
    .get('/v1/protected/revoked/count')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.count.should.equal(66);
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

  it('should return 66 revoked nonprofits with EIN and last updated date', (done) => {
    chai.request(app)
    .get('/v1/protected/revoked/list')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.length.should.equal(66);
      res.body[0].should.include.keys('EIN', 'updatedAt');
      done();
    });
  });

  it('should count 0 revoked nonprofits, before the new bulletin comes', (done) => {
    chai.request(app)
    .get('/v1/update/download/prepare')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      done();
    });
  });

  it('should download a newer file', (done) => {
    chai.request(app)
    .get('/v1/update/download/4')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.status.should.eql('success');
      res.body.message.should.eql('Import performed successfully');
      done();
    });
  });

  it('should parse the newer large file and return 2511 total records', (done) => {
    chai.request(app)
    .get('/v1/update/parse')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.status.should.eql('success');
      res.body.message.should.eql('Update performed successfully');
      res.body.count.should.eql(2511);
      done();
    });
  });

  it('should count 66 revoked nonprofits', (done) => {
    chai.request(app)
    .get('/v1/protected/revoked/count')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.count.should.equal(66);
      done();
    });
  });

  it('should clear the DB and return 0 records', (done) => {
    chai.request(app)
    .get('/v1/update/clear')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      done();
    });
  });

  it('should perform the update automatically and keep polling until completion', (done) => {
    var response = {}
    chai.request(app)
    .get('/v1/update/auto')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      response = res;
      setInterval(async () => {
        if (response.body.message && response.body.message === "The update has been completed.") {
          response.body.message.should.equal("The update has been completed.");
          done();
        } else {
          response = await repeatRequest()
        }
      }, 300)
    })
  });
});

function repeatRequest() {
  return new Promise(resolve => {
    chai.request(app)
    .get('/v1/update/auto')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      resolve(res);
    })
  })
}