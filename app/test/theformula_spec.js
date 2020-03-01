"use strict";
const testInfra = require('./testInfra');
var request = require('request');
const app = require('../index');
const config = require('../config/config.js');

describe('requests tests', function () {
    this.timeout(15000);

    it('Check formula', function(done) {
        this.timeout(15000);
//        const serverPort = app.getServerPort();
        request.get('http://localhost:' + config.PORT + '/formula?q='+encodeURI('{temperature} > 50 or {pressure} < 80 or {volume} < 100') , function(error, response, body) {
            if (error != null) console.log(error);

            //console.log(response.body);
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.match(/{"result":true}/);
            done();
        });
    });

    it('Check formula false', function(done) {
        this.timeout(15000);
//        const serverPort = app.getServerPort();
        request.get('http://localhost:' + config.PORT + '/formula?q='+encodeURI('{temperature} < 1') , function(error, response, body) {
            if (error != null) console.log(error);

            //console.log(response.body);
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.match(/{"result":false}/);
            done();
        });
    });
});