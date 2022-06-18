var Bike = require('../../models/bike');
var request = require('request');
var server = require('../../bin/www')

describe('Bike API', () => {
    describe('GET BIKES /', () => {
        it('Status 200', () => {
            expect(Bike.allBikes.length).toBe(0);
            var a = new Bike(1,'black', 'urban', [-34.6012424,-58.3864197]);
            Bike.add(a)

            request.get('http://localhost:27017/api/bikes',function(error,response,body){
                expect(response.statusCode).toBe(200)
            });
        });
    });
    describe('POST BIKES /create', () =>{
        it('STATUS 200', (done) =>{
            var headers = {'content-type' : 'application/json'};
            var aBike = '{"id": 10, "color": "red", "model" : "urban", "lat": -34, "lng": -54 }';
            request.post({
                headers: headers,
                url: 'http://localhost:27017/api/bikes/create',
                body: aBike
            },function(error,response,body){
                expect(response.statusCode).toBe(200);
                expect(Bike.findById(10).color).toBe("red");
                done();
            });
        });
    });
});