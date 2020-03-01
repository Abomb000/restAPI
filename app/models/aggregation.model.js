'user strict';
let mysqldb = require('../DAL/mysql_dal');
const config = require('../config/config');

var Data={};
Data.get = function (result) {
    mysqldb.con.query("SELECT * FROM\n" +
        "(SELECT * FROM `"+config.mysqlDB.tbl+"`\n" +
        " ORDER BY `timestamp` DESC) AS X\n" +
        "  GROUP BY `type`" ,function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            //console.log('tasks : ', res);
            result(null, res);
        }
    });
};

Data.getall = function (type, period, result) {
    mysqldb.con.query("SELECT * FROM `"+config.mysqlDB.tbl+"`\n" +
        " WHERE type = ?" ,[type, period],function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            //console.log('tasks : ', res);
            result(null, res);
        }
    });
};
module.exports= Data;