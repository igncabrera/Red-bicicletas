var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema

var bookSchema = new Schema({
    from: Date,
    to: Date,
    bike: {type: mongoose.Schema.Types.ObjectId, ref: 'Bike'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

bookSchema.methods.bookingDays = function(){
    return moment(this.to).diff(moment(this.from), 'days') + 1;
};

module.exports = mongoose.model('Booking', bookSchema);