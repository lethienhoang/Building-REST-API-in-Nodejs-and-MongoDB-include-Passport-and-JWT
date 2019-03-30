let server ;
const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
var expect = require('chai').expect;
var model;
describe("User testing", () => {
    beforeEach(() => {
        server = require('../../index');
        model = {
            email: '',
            firstName: '',
            lastName: '',
            userName: '',
            password: ''
        }
    });
    afterEach(() => {
        server.close();
    });

  

    
    describe("POST /", () => {
        it('Should return all are required', async () => {
            const res = await chai.request(server)
            .post('/api/v1/users/signup')
            .send(model);
            expect(res.status).to.equal(500)
        });

        it('Should return email is required', async () => {

            const res = await chai.request(server)
            .set('content-type', 'application/x-www-form-urlencoded')
            .post('/api/v1/users/signup')
            .send(model);
            console.log("dsfsdfsd" + res)

            expect(res.errors.email.message).to.equal('')
        });

        it('Should return firstName is required', async () => {
            const res = await chai.request(server)
            .set('content-type', 'application/x-www-form-urlencoded')
            .post('/api/v1/users/signup')
            .send(model)
            expect(res.errors.firstName.message).to.equal('')
        });

        it('Should return userName is required', async () => {
            const res = await chai.request(server)
            .set('content-type', 'application/x-www-form-urlencoded')
            .post('/api/v1/users/signup')
            .send(model)
            expect(res.errors.userName.message).to.equal('')
        });

        it('Should return firstName is required', async () => {
            const res = await chai.request(server)
            .set('content-type', 'application/x-www-form-urlencoded')
            .post('/api/v1/users/signup')
            .send(model)
            expect(res.errors.lastName.message).to.equal('')
        });

        it('Should return password is required', async () => {
            const res = await chai.request(server)
            .post('/api/v1/users/signup')
            .send(model)
            expect(res.errors.password.message).to.equal('')
        });
    });
})