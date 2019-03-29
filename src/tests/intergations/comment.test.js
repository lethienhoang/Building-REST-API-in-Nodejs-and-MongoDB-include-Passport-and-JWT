const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');


// Config chai
chai.use(chaiHttp);
chai.should();

describe("Comments", () => {
    var expect = chai.expect;

    describe("POST /", () => {

        // it("Should pot comment by author", (done) => {
        //     chai.request(app)
        //     .post("")
        // })
    })

    describe("GET /", () => {
        // Test get comment by articleId
        it("Should get comment by articleId", (done) => {
            const articleId = '5c94892d18492e2c1841a777';
            request('http://localhost:3000/api/v1/article')
                .get(`/${articleId}/comments`)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });
       
    });

    describe("GET /", () => {
        // Test get comment by articleId
        it("Should get empty comment by articleId", (done) => {
            const articleId = '5c94892d18492e2c1841a777';
            request('http://localhost:3000/api/v1/article')
                .get(`/${articleId}/comments`)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    done();
                });
        });
       
    });
    
});