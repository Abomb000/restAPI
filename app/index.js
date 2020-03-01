"use strict";
const express = require('express'),
    bodyParser = require('body-parser');
const app = express();
const config = require('./config/config');


app.set("PORT", config.PORT);

app.listen(app.get('PORT'), function () {
    console.log('Express started on port ' + app.get('PORT') + '; press Ctrl-C to terminate.');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/ping', function(req,res) {
    res.send('pong');
});

require('./routes/dataCRUD.routes.js')(app);
require('./routes/formula.routes.js')(app);

