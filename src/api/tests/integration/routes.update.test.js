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
var serveStatic = require('serve-static')
var appx = express()
var serveStatic = require('serve-static')
appx.use(serveStatic(path.join(__dirname, '../data')))
appx.listen(1341)

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
  });
/*
  after((done) => {
    umzug.down({ to: 0 })
      .then(() => {
        done()
      })
      .catch (err => {
        console.log(err)
      });
  });
*/
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

  it('should download a newer file and return 3429 records', (done) => {
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

  it('should parse the newer large file and return 2408 total records', (done) => {
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

  it('should return a list of revoked nonprofits', (done) => {
    chai.request(app)
    .get('/v1/update/revoked')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.length.should.equal(10);
      done();
    });
  });

});

