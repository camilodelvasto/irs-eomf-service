process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../../index');
const knex = require('../../../config/pg');


// const router = express.Router();

describe('routes : update', function() {
  // This is needed as downloading the large files will take several minutes.
  this.timeout(150000);

  before(async () => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
//    .then(() => { return knex.seed.run(); });
  });

  after(() => {
//    return knex.migrate.rollback();
  });

  it('should populate a new database and return 4328 records', (done) => {
    chai.request(app)
    .get('/v1/download')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.status.should.eql('success');
      res.body.message.should.eql('Import performed successfully');
      res.body.count.should.eql(3428);
      done();
    });
  });

  it('should parse the data and copy it to a new table', (done) => {
    chai.request(app)
    .get('/v1/update')
    .end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      res.type.should.equal('application/json');
      res.body.status.should.eql('success');
      res.body.message.should.eql('Update performed successfully');
      res.body.count.should.eql(2414);
      done();
    });
  });

});

