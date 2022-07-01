var User = require('../models/user');

exports.listUsers = (req, res) => {
  User.allUsers((_err, users) => {
    res.render('users/index', { users });
  });
};

exports.newUser = (req, res) => {
  res.render('users/new', { errors: {}, user: {} });
};

exports.createUser = ({ body }, res) => {
  const { name, email, password } = body;
  const newUser = new User({
    name,
    email,
    password,
    userContext: { verified: false },
  });
  User.add(newUser, (err) => {
    if (err) res.render('users', { errors: err.errors, user: newUser });
    else {
      newUser.sendWelcomeEmail();
      res.redirect('/users');
    }
  });
};


exports.editUser = function(req,res,next){
    User.findById(req.params.id, function(err, user){
        res.render('users/edit', {errors: {}, user: user});
    });
},



exports.updateUser = function(req,res,next){
    var update_values = {name: req.body.name};
    console.log(update_values)
    User.findByIdAndUpdate(req.params.id, update_values, function(err,user){
        if(err){
            console.log(err)
            res.render('users/update',{errors: err.errors, user: new User({name: req.body.name, email: req.body.email})});
        }else{
            res.redirect('/users');
            return
        }
    })
}

exports.deleteUser = function(req,res,next){
    User.findByIdAndDelete(req.body.id, function(err){
        if(err){
            next(err);
        }else{
            res.redirect('/users');
        }
    })
}