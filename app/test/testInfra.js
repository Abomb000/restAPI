global.proxyquire = require('proxyquire');
global.expect  = require('chai').expect;
global.mochaAsync = (fn) => {
    return done => {
        fn.call().then(done, err => {
            done(err);
        });
    };
};

module.exports={
    proxyquire
};