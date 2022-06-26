var mongoose = require('mongoose');
var Booking =  require('./booking');
var Schema = mongoose.Schema
var Token = require('../models/token');
var mailer = require('../mailer/mailer')
var crypto = require('crypto')
const bcrypt = require('bcrypt')
const saltRounds = 10;



const validateMail =  function(email){
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}


var userSchema = new Schema({
    name: String,
})

userSchema.methods.booking = function(bikeId, from, to, cb){
    var book = new Booking({user: this._id, bike: bikeId, from: from, to: to})
    console.log(book);
    book.save(cb);
}

userSchema.methods.send_welcome_email = function(cb){
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function(err){
        if(err){return console.log(err.message);}

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Account verification',
            text: 'Hola, \n\n' + 'Por favor, para verificar su cuenta haga click en este enlace: \n' + 'http:localhost:5000' + '\/token/confirmation\/' + token.token + '.\n'
        }

        mailer.sendMail(mailOptions, function(err){
            if(err){ return console.log(err, message);}
            console.log('Se ha enviado un mal de bienvenida a:'+ email_destination + '.');
        })
    })
}

module.exports = mongoose.model('User', userSchema);


