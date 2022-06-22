var mongoose = require('mongoose');
var Booking =  require('./booking');
var Schema = mongoose.Schema

var userSchema = new Schema({
    name: String,
})

userSchema.methods.booking = function(bikeId, from, to, cb){
    var book = new Booking({user: this._id, bike: bikeId, from: from, to: to})
    console.log(book);
    book.save(cb);
}

module.exports = mongoose.model('User', userSchema);