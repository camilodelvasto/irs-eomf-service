process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../../index');
const knex = require('../../../config/pg');


// const router = express.Router();

describe('routes : nonprofits', () => {

  beforeEach(async () => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
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
    .get('/v1/nonprofits/search/medical?posts_per_page=1&page=2')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.length.should.equal(1);
      done();
    });
  });

});
