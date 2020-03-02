'use strict';
const mysql = require('mysql');
const config = require('../config/config');

let con;

con = mysql.createConnection(config.mysqlDB);
con.connect(function(err) {
    if (err) throw err;
});

console.log('create db and tbl if not exists');
con.query("CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8;",(err, res) => {
    //console.log(err);
    //console.log(res);
});
con.query("CREATE TABLE IF NOT EXISTS `test`.`dataSet` (\n" +
    "  `id` int(11) NOT NULL AUTO_INCREMENT,\n" +
    "  `timestamp` int(11) NOT NULL,\n" +
    "  `type` enum('temperature','pressure','​volume​') NOT NULL,\n" +
    "  `value` float NOT NULL,\n" +
    "  PRIMARY KEY (`id`),\n" +
    "  KEY `timestamp` (`timestamp`)\n" +
    ") ENGINE=MyISAM DEFAULT CHARSET=utf8;",(err, res) => {
   // console.log(err);
   // console.log(res);
});
module.exports = { con };