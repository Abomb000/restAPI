"use strict";
const testInfra = require('./testInfra');
const config = require('../config/config.js');
const mysql = require('mysql');

describe(' tests', function () {
    this.timeout(20000);

    it('Test mysql Connection', function(done){
        var connection = mysql.createConnection(config.mysqlDB);
        connection.connect(done);
    });
});