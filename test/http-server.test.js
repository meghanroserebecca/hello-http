const server = require('../lib/http-server');

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('testing http servers with chai-http', () => {
    const request = chai.request(server);

    it('POST method with /facts adds to facts', done => {
        request
            .post('/facts')
            .send('http is awesome')
            .end(function (err, res) {
                if (err) done(err);
                assert.equal(res.text, 'You have added http is awesome to facts!');
                done();
            });
    });

    it('PUT and other non-GET/POST methods return 404 error', done => {
        request
            .put('/greetings')
            .end(function (err, res) {
                expect(err).to.be.err;
                expect(res).to.have.status(404);
                done();
            });
    });

    it('GET /greeting says stranger', done => {
        request
            .get('/greeting')
            .end((err, res) => {
                assert.strictEqual(res.text, 'hello stranger!');
                done();
            });
    });

    it('GET /greeting says provided name', done => {
        request
            .get('/greeting/theDude')
            .end((err, res) => {
                assert.strictEqual(res.text, 'hello theDude!');
                done();
            });
    });

    it('GET /query string changes salutation', done => {
        request
            .get('/greeting/theDude?salutation=bienvenidos')
            .end((err, res) => {
                assert.strictEqual(res.text, 'bienvenidos theDude');
                done();
            });
    });

    it('GET /query string without name changes salutation to stranger', done => {
        request
            .get('/greeting?salutation=welcome')
            .end((err, res) => {
                assert.strictEqual(res.text, 'welcome stranger!');
                done();
            });
    });

    it('GET /facts provides fact', done => {
        request
            .get('/facts')
            .end((err, res) => {
                assert.strictEqual(res.text, '["Did you know that HTTP is not the only application layer protocol method for getting documents from the Internet? There are many others.","HTTP works by using a user agent to connect to a server. The user agent could be a web browser or spider. The server must be located using a URL or URI. This always contains http:// at the start. It normally connects to port 80 on a computer.","HTTP was developed by Tim Berners-Lee and his team and is currently coordinated by W3C","http is awesome"]');
                done();
            });
    });
});



