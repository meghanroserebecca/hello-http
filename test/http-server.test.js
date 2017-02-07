const server = require('../lib/http-server');

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('testing http servers with chai-http', () => {
    const request = chai.request(server);

    it('POST and other methods return 404 error', done => {
        request
            .post('/user/derpasaurus')
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

    it('GET /fact provides fact', done => {
        request
            .get('/fact')
            .end((err, res) => {
                assert.strictEqual(res.text, 'Did you know that HTTP is not the only application layer protocol method for getting documents from the Internet? There are many others.');
                done();
            });
    });
});



