const config = require('../config/config');


function validateFormula(formula){
    return (formula.replace(new RegExp('\{(' + config.allowedTypes.join('|') + ')\}\\s?[\\<|\\>|\\=]\\s?[0-9\.]+\\s?(or|and)?', 'gm'), '').replace(/\s+/mg, '') === '');
}
function prepareFormula(formula,values) {
    values.forEach(type => {
        formula=formula.replace('{'+type.type.replace(/[^a-z]/mg,'')+'}',type.value);
    });
    return formula.replace(/ or /mg," || ").replace(/ and /mg," && ");
}
module.exports={validateFormula,prepareFormula};