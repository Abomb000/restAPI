module.exports = (app) => {
    const dataCRUD = require('../controllers/dataCRUD.controller.js');

    app.route('/data')
        .get(dataCRUD.getAll)
        .post(dataCRUD.create);

    app.route('/data/:id')
        .get(dataCRUD.get)
        .put(dataCRUD.update)
        .delete(dataCRUD.delete);

};