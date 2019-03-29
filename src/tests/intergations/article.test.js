const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');


chai.use(chaiHttp);
chai.should();

describe("Article", () => {
    let token = '';
    var expect = chai.expect;
    // var host = "http://" + process.env.IP + ':' + process.env.PORT + '/api/v1';
    var host  = 'http://localhost:3000/api/v1';
    const userCredentials = {
        email: '',
        password: ''
    }
    // let's login the user before we run any tests
    beforeEach((done) => { 

        var user = {
            email: 'testing@gmail.com',
            firstName: 'A',
            lastName: 'B',
            userName: 'abc',
            password: 'Abc@123456'
        };
    
        userCredentials.email = user.email;
        userCredentials.password = user.password;
        request(host)
        .post('/users/signup')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            done();
        })
        
        setTimeout(done, 700);
    })

    describe("POST /", () => { 
        it('should get a valid JWT token on successful login', (done) => {
            request(host)
            .post('/auth/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(userCredentials)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body.token).to.be.a('string');
                token = res.body.token;    
                done();  
            });

        })
    })
    
    
    // after((done) => {
    //     describe("POSt /", () => {
    //         it("Should authentication successfully", (done) => {
    //             chai.request('http://localhost:3000/api/v1/auth')
    //                 .post
    //         });
    //     })
    // })
    
});