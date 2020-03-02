const etl = require('../controllers/etl.controller.js');

module.exports = (app) => {
    app.get('/etl/:type/:period/:interval', etl.read);

};