var Bike = require('../models/Bike');

exports.bike_list = function(req,res){
    res.render('bikes/index',{bikes: Bike.allBikes});
}

