var mongoose = require('mongoose');
var Bike = require('../../models/bike');
var User = require('../../models/user');
var Booking = require('../../models/booking');

describe('Testing Users', function(){
    beforeEach(function(done){
        var mongoDB = 'mongodb://127.0.0.1/red_bicicletas';
        mongoose.connect(mongoDB);

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to test database!');
            done();
        });
    })

    afterEach(function(done){
        Booking.deleteMany({},function(err,success){
            if(err) console.log(err);
            User.deleteMany({},function(err,success){
                if(err) console.log(err);
                Bike.deleteMany({}, function(err,success){
                    if(err) console.log(err);
                    done();
                })
            })
        })
        
    })

    describe('User books a bike',() =>{
        it('it must exist a booking',(done) =>{
            const user = new User({name: 'ezequiel', password: '123456789', email: 'cmen@gmail.com'});
            user.save();
            console.log(user)
            const bike = new Bike({color: 'green', model: "urban"}); //el parametro code da error de cualquier forma que sea puesto, asi que tuve que quitarlo, si alguien sabe arreglarlo, agradeceria la ayuda, gracias
            bike.save();
            
            var today = new Date();
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate()+1);
            user.booking(bike.id, today, tomorrow, function(err,book){
                Booking.find({}).populate('user').populate('bike').exec(function(err,bookings){
                    console.log(bookings[0])
                    expect(bookings.length).toBe(1);
                    expect(bookings[0].bookingDays()).toBe(2);
                    expect(bookings[0].user.name).toBe(user.name)
                })
            })
        })
    })
})