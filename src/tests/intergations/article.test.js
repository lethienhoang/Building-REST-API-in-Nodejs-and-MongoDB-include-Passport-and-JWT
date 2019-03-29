const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');


chai.use(chaiHttp);
chai.should();

describe("Article", function() {
    let token = '';
    var expect = chai.expect;
    // var host = "http://" + process.env.IP + ':' + process.env.PORT + '/api/v1';
    var host  = 'http://localhost:3000/api/v1';
    // let's login the user before we run any tests
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

    

    // describe("POST /", () => { 
    //     this.timeout(2000);
    //     it('should get a valid JWT token on successful login', (done) => {
           

    //     })
    // })
    
    
    // after((done) => {
    //     describe("POSt /", () => {
    //         it("Should authentication successfully", (done) => {
    //             chai.request('http://localhost:3000/api/v1/auth')
    //                 .post
    //         });
    //     })
    // })
    
});