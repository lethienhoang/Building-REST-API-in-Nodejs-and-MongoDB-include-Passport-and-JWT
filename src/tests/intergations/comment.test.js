const chai = require('chai');
const chaiHttp = require('chai-http');
var expect = require('chai').expect;

// Config chai
chai.use(chaiHttp);
chai.should();

describe("Comments", function() {
    let token = '';
    
    var host  = 'http://localhost:3000/api/v1';
    const articleId = '5c94892d18492e2c1841a777';

    beforeEach("Setup data",(done) => { 
        var user = {
            email: 'testing@gmail.com',
            firstName: 'A',
            lastName: 'B',
            userName: 'abc',
            password: 'Abc@123456'
        };

        chai.request(host)
        .post('/users/signup')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            token = res.body.token;
            done(); 
        })
        
    })

    describe("POST /", () => {
        this.timeout(2000);        
        it("It should create comment by acticleId", (done) => {            
            const comment = {
                comment: 'Testing'
            }
            chai.request(host)
            .post(`/article/${articleId}/comments`)
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Token ' + token)
            .send(comment)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.comment).to.equal(comment);
                done();
            });
        });

        
    })


    describe("GET /", () => {
        // Test get comment by articleId
        it("It should return comment", (done) => {
            chai.request(host)
                .get(`/article/${articleId}/comments`)
                .set('content-type', 'application/x-www-form-urlencoded')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        
       
    });

    
});