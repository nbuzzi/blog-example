const expect = require('chai').expect;
const dotenv = require('dotenv');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
dotenv.config();

const portNumber = process.env.PORT_NUMBER || '3000';
const app = `http://localhost:${portNumber}`;

it('Main page content', function (done) {
    chai.request(app)
        .get('/')
        .end((error, response) => {
            expect(response).to.not.be.null;
            done();
        });
});

it('Should login as administrator', function (done) {
    chai.request(app)
        .post('/signin')
        .send({
            email: 'admin',
            password: '1234'
        })
        .accept('application/json')
        .end((error, response) => {
            expect(response).to.not.be.null;

            const bodyParsed = JSON.parse(response.text);
            expect(bodyParsed.logged).to.be.equal(true);

            chai.request(app)
                .get(`/getLoggedUser`)
                .end((error, response) => {
                    const user = response && JSON.parse(response.text);

                    expect(user).to.not.be.null;
                    expect(user.isAdmin).to.be.equal(true);
                    done();
                });
        });
});

it('Should login as guest', function (done) {
    chai.request(app)
        .get(`/signinAsGuest`)
        .end((error, response) => {
            expect(response.text).to.not.be.null;
            chai.request(app)
                .get(`/getAllLoggedUsers`)
                .end((error, response) => {
                    const users = response && JSON.parse(response.text);
                    expect(users).to.not.be.null;

                    const userGuest = users.find((m) => !m.isAdmin);

                    expect(userGuest).to.not.be.null;
                    expect(userGuest.isAdmin).to.be.equal(false);
                    expect(userGuest.isLogged).to.be.equal(true);
                    done();
                });
        });
});