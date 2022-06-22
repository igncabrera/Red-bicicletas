var mongoose = require('mongoose')
var Bike = require('../../models/bike');
var request = require('request');

var base_url = "http://127.0.0.1:27017/api/bikes";

describe("Bike API", () => {
    beforeEach(function (done) {
        var mongoDB = 'mongodb://127.0.0.1/red_bicicletas';
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to test database');
            done();
        });
    });


    afterEach(function (done) {
        Bike.deleteMany({}, function (err, success) {
            if (err) console.log(err);
            mongoose.disconnect(err);
            done();
        });
    });

    describe('GET BIKES /', () => {
        it('Status 200', (done) => {


            var aBike = new Bike({ code: 1, color: "green", model: "urban" });
            Bike.add(aBike, (err, newBike) => {
                if (err) console.log(err);
            });

            request.get('http://localhost:27017/api/bikes', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('POST BIKES /create', () => {
        it('Status 200', (done) => {

            var headers = { 'content-type': 'application/json' };

            var aBike = '{"code":1, "color":"red", "model":"urban", "lat": -34, "lng": -54}';

            request.post({
                headers: headers,
                url: 'http://localhost:27017/api/bikes/create',
                body: aBike
            }, function (error, response, body){
                expect(response.statusCode).toBe(200);
                var bike = JSON.parse(body);
                console.log(bike);
                expect(bike.bikes.code).toBe(1)
                expect(bike.bikes.color).toBe("red");
                expect(bike.bikes.location[0]).toBe(-34);
                expect(bike.bikes.location[1]).toBe(-54);
                done();
            });
        });
    });
});
