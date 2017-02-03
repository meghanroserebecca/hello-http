const server = require('../lib/http-server');

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('testing http servers with chai-http', () => {
    const request = chai.request(server);

    it('GET /greeting says', done => {
        request
            .get('/greeting')
            .end((err, res) => {
                assert.strictEqual(res.text, 'hello stranger!');
                done();
            });
    });
});



