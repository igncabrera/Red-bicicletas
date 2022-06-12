var Bike = require('../../models/bike');

exports.bike_list = function(req,res){
    res.status(200).json({
        bikes: Bike.allBikes
    });
}

exports.bike_create = function(req,res){
    var bike= new Bike(req.body.id, req.body.color, req.body.model, req.body.location);
    bike.location = [req.body.lat, req.body.lng];

    Bike.add(bike);

    res.status(200).json({
        bikes: bike
    })
}

exports.bike_delete = function(req,res){
    Bike.removeById(req.body.id);
    res.status(204).send();
}

exports.bike_update = function(req,res){
    var bike = Bike.findById(req.params.id);
    bike.id = req.body.id;
    bike.color = req.body.color;
    bike.model = req.body.model;
    bike.location = [req.body.lat, req.body.lng];

    res.status(200).json({
        bikes: bike
    });
}
