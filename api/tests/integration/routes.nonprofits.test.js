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

describe('routes : nonprofits', () => {
  before((done) => {
    umzug.up()
      .then(async function (migrations) {
        seed.down(db.sequelize.getQueryInterface())
          .then (() => {
            seed.up(db.sequelize.getQueryInterface())
              .then (() => {
                done()
              })
          })
      })
      .catch (err => {
        console.log(err)
      })
  });

  after((done) => {
    umzug.down({ to: 0 })
      .then(function (migrations) {
        done()
      })
      .catch (err => {
        console.log(err)
      });
  });

  it('should return 10 nonprofits if no more params are provided', (done) => {
    chai.request(app)
    .get('/v1/nonprofits')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.body.length.should.eql(10);
      done();
    });
  });

  it('should return 11 nonprofits and 1 page if more than 10 posts_per_page are requested', (done) => {
    chai.request(app)
    .get('/v1/nonprofits/?posts_per_page=20')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.body.length.should.eql(11);
      done();
    });
  });

  it('should return 1 nonprofit when requested with posts_per_page=10&page=2', (done) => {
    chai.request(app)
    .get('/v1/nonprofits/?posts_per_page=10&page=2')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.body.length.should.eql(1);
      done();
    });
  });

  it('should return 2 nonprofit2 when requested with posts_per_page=3&page=4', (done) => {
    chai.request(app)
    .get('/v1/nonprofits/?posts_per_page=3&page=4')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.body.length.should.eql(2);
      done();
    });
  });

  it('should return a nonprofit by EIN', (done) => {
    chai.request(app)
    .get('/v1/nonprofits/10018605')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.body.length.should.eql(1);
      done();
    });
  });

  it('should return an empty array for an EIN that cannot be found', (done) => {
    chai.request(app)
    .get('/v1/nonprofits/10018604')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.body.length.should.eql(0);
      done();
    });
  });

});
