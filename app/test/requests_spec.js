"use strict";
const testInfra = require('./testInfra');
var request = require('request');
const app = require('../index');
const config = require('../config/config.js');

describe('API CRUD tests', function () {
    this.timeout(15000);

    it('Check server running', function(done) {
        this.timeout(15000);
        request('http://localhost:' + config.PORT + '/ping' , function(error, response, body) {
            if (error != null) console.log(error);
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.match(/pong/);
            done();
        });
    });

    it('Create without data', function(done) {
        this.timeout(15000);
        request.post('http://localhost:' + config.PORT + '/data', {form:{key:'value'}} , function(error, response, body) {
            if (error != null) console.log(error);
            expect(response.statusCode).to.equal(400);
            done();
        });
    });


    it('Create with data', function(done) {
        this.timeout(15000);
        request.post('http://localhost:' + config.PORT + '/data', {form:{type:'temperature',value:'20',timestamp:'1583055997'}} , function(error, response, body) {
            if (error != null) console.log(error);
            expect(response.statusCode).to.equal(200);
            expect(parseInt(response.body)).to.be.above(0);
            done();
        });
    });

    it('Create with data time', function(done) {
        this.timeout(15000);
        request.post('http://localhost:' + config.PORT + '/data', {form:{type:'temperature',value:'20',timestamp:'Sun, 01 Mar 2020 09:46:37 GMT'}} , function(error, response, body) {
            if (error != null) console.log(error);
            expect(response.statusCode).to.equal(200);
            expect(parseInt(response.body)).to.be.above(0);
            done();
        });
    });

    it('Get data by id', function(done) {
        this.timeout(15000);
        request.get('http://localhost:' + config.PORT + '/data/1', function(error, response, body) {
            if (error != null) console.log(error);
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.have.string('id');
            done();
        });
    });

    it('Update with data', function(done) {
        this.timeout(15000);
        request.put('http://localhost:' + config.PORT + '/data/1', {form:{type:'pressure',value:'20'}} , function(error, response, body) {
            if (error != null) console.log(error);
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.have.string('"affectedRows":1,');
            done();
        });
    });
});