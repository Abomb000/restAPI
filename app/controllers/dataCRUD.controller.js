const Data = require('../models/dataCRUD.model.js');


exports.create = (req, res) => {
    var new_data = new Data(req.body);
    if(!new_data.type || !new_data.value){
        res.status(400).send({ error:true, message: 'Please provide type & value' });
    }
    else{
        Data.create(new_data, function(err, data) {
            if (err)
                res.send(err);
            res.json(data);
        });
    }
};

exports.getAll = (req, res) => {
    Data.getAll(function(err, data) {
        if (err)
            res.send(err);
        //console.log('res', task);
        res.send(data);
    });
};


exports.get = (req, res) => {
    Data.get(req.params.id,function(err, data) {
        if (err)
            res.send(err);
        res.send(data);
    });
};


exports.update = (req, res) => {
    var new_data = new Data(req.body);
    if(!new_data.type || !new_data.value){
        res.status(400).send({ error:true, message: 'Please provide type & value' });
    }
    else{
        Data.update(req.params.id, new_data, function(err, data) {
            if (err)
                res.send(err);
            res.json(data);
        });
    }
};


exports.delete = (req, res) => {
    Data.remove(req.params.id, function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
};