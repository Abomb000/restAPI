const moment = require('moment');

function setTimestamp(datetime) {
        if(/^[0-9\-]+$/.test(datetime)) datetime=parseInt(datetime)*1000;
        return moment(datetime).utc().format("X");
}
function timeval(val) {
        let lastchar = val[val.length-1];
        let intval = parseInt(val);
        let multiply={Y:31536000,M:2628000,D:86400,h:3600,m:60};
        return intval * (multiply[lastchar] || 1);

}
module.exports={setTimestamp, timeval};