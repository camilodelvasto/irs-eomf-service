process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../../index');
const knex = require('../../../config/pg');

describe('routes : update', function() {
  // This is needed as downloading the large files will take several minutes.
  this.timeout(150000);

  before(async () => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
  });

  after(() => {
    return knex.migrate.rollback();
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

  it('should populate a new database and return 3461 records', (done) => {
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

  it('should parse the data and return exactly 2445', (done) => {
    chai.request(app)
    .get('/v1/update/parse')
    .set('Authorization', 'Bearer ndsvn2g8dnsb9hsg')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.status.should.eql('success');
      res.body.message.should.eql('Update performed successfully');
      res.body.count.should.eql(2445);
      done();
    });
  });

});

