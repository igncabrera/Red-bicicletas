var User = require('../../models/user')

exports.user_list = function(req,res){
    User.find({}, function(err, users){
        res.status(200).json({
            users: users
        });
    });
};

exports.users_create = function(req,res){
    var user = new User({name:req.body.name});

    user.save(function(err){
        res.status(200).json(user)
    });
};

exports.users_book = function(req,res){
    User.findById(req.body.id, function(err, user){
        console.log(user);
        user.booking(req.body.bike_id, req.body.from, req.body.to, function(err){
            console.log('booked !!');
            res.status(200).send();
        })
    })
}