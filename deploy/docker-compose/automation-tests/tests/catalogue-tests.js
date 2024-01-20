// automation-tests/test.js

  import { expect } from 'chai';
  import chai from 'chai';
  import chaiHttp from 'chai-http';


  chai.use(chaiHttp);

  describe('Catalog API', () => {
  const baseUrl = 'http://catalogue';

  describe('GET /catalogue', () => {

    it('should return 404 for a non-existing image', (done) => {
      const nonExistingImageId = '*invlaid-image-url*';
    
      chai.request(baseUrl)
        .get(`/catalogue/images/${nonExistingImageId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
         done()
        });
    });
    

    it('should return 404 for an invalid endpoint', (done) => {
      chai.request(baseUrl)
        .get('/invalid-endpoint')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  
    it('should check if every item has an image', (done) => {
      chai.request(baseUrl)
        .get('/catalogue')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          res.body.forEach((item) => {
            expect(item).to.have.property('imageUrl').that.is.an('array').and.is.not.empty;
          });

          done();
        });
    });

    it('should return a list of items from the catalog', (done) => {
      chai.request(baseUrl)
        .get('/catalogue')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf.at.least(1);
          done();
        });
    });
    it('should return 200 for a valid endpoint', (done) => {
      chai.request(baseUrl)
        .get('/catalogue')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    
    
    it('should ensure that the price for each item is not equal to zero', (done) => {
      chai.request(baseUrl)
        .get('/catalogue?page=1&size=6')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
    
          res.body.forEach((item) => {
            expect(item.price).to.not.equal(0);
          });
    
          done();
        });
    });
  });
});