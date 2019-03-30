const chai = require('chai');
const chaiHttp = require('chai-http');
var expect = require('chai').expect;
let server ;
// Config chai
chai.use(chaiHttp);
chai.should();

describe("Comments", function() {
    let token = '';
    
    const articleId = '5c94892d18492e2c1841a777';

    beforeEach("Setup data", async() => { 
        var user = {
            email: 'testing@gmail.com',
            firstName: 'A',
            lastName: 'B',
            userName: 'abc',
            password: 'Abc@123456'
        };

        const res = await chai.request(server)
        .post('/users/signup')
        .send(user)
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        token = res.body.token;
        
    })
    afterEach(() => {
        server.close();
    });

    describe("POST /", () => {
        this.timeout(2000);        
        it("It should create comment by acticleId", async (done) => {            
            const comment = {
                comment: 'Testing'
            }
            const res=  await chai.request(server)
            .post(`/article/${articleId}/comments`)
            .set('Authorization', 'Token ' + token)
            .send(comment)
            expect(res).to.have.status(200);
            expect(res.body.comment).to.equal(comment);
        });

        
    })


    describe("GET /", () => {
        // Test get comment by articleId
        it("It should return comment", async (done) => {
            const res = chai.request(server)
                .get(`/article/${articleId}/comments`)
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
        });

        
       
    });

    
});