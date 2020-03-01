const formula = require('../controllers/formula.controller.js');

module.exports = (app) => {
    app.get('/formula', formula.getData);

};