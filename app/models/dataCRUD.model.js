'user strict';
let mysqldb = require('../DAL/mysql_dal');
const config = require('../config/config');
const timestamp = require('../utils/timestamp');

var Data = function(data){
    this.type = (config.allowedTypes.indexOf(data.type) != -1)?data.type:undefined;
    this.value = parseFloat(data.value);
    this.timestamp = timestamp.setTimestamp(data.timestamp || new Date());
};
Data.create = function (data, result) {
    mysqldb.con.query("INSERT INTO `"+config.mysqlDB.tbl+"` set ?", data, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};
Data.get = function (id, result) {
    mysqldb.con.query("Select * from `"+config.mysqlDB.tbl+"` WHERE id = ?", id,function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
Data.getAll = function (result) {
    mysqldb.con.query("Select * from `"+config.mysqlDB.tbl+"`",function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
Data.update = function(id, data, result){
    mysqldb.con.query("UPDATE `"+config.mysqlDB.tbl+"` SET ? WHERE id = ?", [data, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
Data.remove = function(id, result){
    mysqldb.con.query("DELETE FROM `"+config.mysqlDB.tbl+"` WHERE id = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};


module.exports= Data;