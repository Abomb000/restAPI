const moment = require('moment');

function setTimestamp(datetime) {
        if(/^[0-9\-]+$/.test(datetime)) datetime=parseInt(datetime)*1000;
        return moment(datetime).utc().format("X");
}

module.exports={setTimestamp};