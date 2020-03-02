const Data = require('../models/aggregation.model');
const timestamp = require('../utils/timestamp');

exports.read = (req, res) => {
        Data.getall(req.params.type, timestamp.setTimestamp(new Date())-timestamp.timeval(req.params.period),function(err, data) {
            if (err) {
                res.send(err);
            }
            let aggregation={};
            let sum_count={};
            data.forEach(element =>{
                let index=parseInt(element.timestamp / timestamp.timeval(req.params.interval));

                if(!aggregation[index]) aggregation[index]=Object.assign({}, {min:-1,max:-1,avg:-1,count:0});

                aggregation[index].count=aggregation[index].count+1;

                if(element.value<aggregation[index].min || aggregation[index].min==-1)
                    aggregation[index].min=element.value;
                if(element.value>aggregation[index].max || aggregation[index].max==-1)
                    aggregation[index].max=element.value;

                sum_count[index]=(sum_count[index] || 0)+element.value;
                aggregation[index].avg=sum_count[index]/aggregation[index].count;
            });
            res.json(Object.values(aggregation));
        });
};