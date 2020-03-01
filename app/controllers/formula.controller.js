const Data = require('../models/aggregation.model');
const formulaUtils = require('../utils/formulaUtils');

exports.getData = (req, res) => {
    if(formulaUtils.validateFormula(req.query.q)){
        Data.get(function(err, data) {
            if (err) {
                res.send(err);
            }
            let formula=formulaUtils.prepareFormula(req.query.q,data);
            if(formula.indexOf("{")>-1) {
                res.status(400).send({error: true, message: 'Unknown data requested: ' + formula});
            } else {
                //console.log(formula)
                res.json({result: !!(eval(formula))});
            }
        });
    } else {
        res.status(400).send({error: true, message: 'Check formula syntax'});
    }
};
