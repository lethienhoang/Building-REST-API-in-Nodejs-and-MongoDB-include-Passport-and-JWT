const chai = require('chai');
const chaiHttp = require('chai-http');
var expect = require('chai').expect;

chai.use(chaiHttp);
chai.should();
describe("Comment", () => {
    var host  = 'http://localhost:3000/api/v1';
    const articleId = '5c94892d18492e2c1841a777';
    describe("GET /", () => {

        it("It should return comment must have value", () => {
            const comment = {
                comment: ''
            }
            chai.request(host)
            .post(`/article/${articleId}/comments`)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(comment)
            .end(function (err, res) {
                expect(err).to.be.a("object");
                expect(res).to.have.status(500);
            });
        })

        it("It should return page not found", () => {
            const comment = {
                comment: ''
            }
            chai.request(host)
            .post(`/article/comments`)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(comment)
            .end(function (err, res) {
                expect(err).to.be.a("object");
                expect(res).to.have.status(404);
            });
        })

        it("It should return authenticaton was invalid", () => {
            const comment = {
                comment: 'Testing'
            }
            chai.request(host)
            .post(`/article/${articleId}/comments`)
            .set('content-type', 'application/x-www-form-urlencoded')
            .end(function (err, res) {
                expect(err).to.be.a("object");
                expect(res).to.have.status(401);
            });
        })
    })
})