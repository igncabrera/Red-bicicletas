var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
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
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        lowercase: true,
        unique: true,
        validate: [validateMail, 'Enter a valid email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String, 
        required: [true, 'Password is required']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verified: {
        type: Boolean, 
        default: false
    }
})

userSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds)
    }
})

userSchema.plugin(uniqueValidator, {message: 'This {PATH} has an account already'})

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

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

