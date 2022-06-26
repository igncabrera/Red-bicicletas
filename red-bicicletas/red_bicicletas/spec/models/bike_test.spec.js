var mongoose = require('mongoose')

var Bike = require('../../models/bike');

beforeEach(() => {Bike.allBikes = []; });

describe('Bike.allBikes', () =>{
    it('starts empty', () =>{
        expect(Bike.allBikes.length).toBe(0);
    });
});

describe('Bike.add', () =>{
    it('adds 1 bike to map',() => {
        expect(Bike.allBikes.length).toBe(0);
        var a = new Bike(1,'red','urban',[-34.6012424,-58.38614197]);
        Bike.add(a);
        expect(Bike.allBikes.length).toBe(1);
        expect(Bike.allBikes[0]).toBe(a);
    });
});

describe('Bike.findById', () => {
    it('must return bike by id 1', () =>{
        expect(Bike.allBikes.length).toBe(0);
        var aBike1 = new Bike(1,'green','urban');
        var aBike2 = new Bike(2,'red','mountain');
        Bike.add(aBike1);
        Bike.add(aBike2);

        var targetBike = Bike.findById(1);
        expect(targetBike.id).toBe(1);
        expect(targetBike.color).toBe(aBike1.color);
        expect(targetBike.model).toBe(aBike1.model);
    })
});

describe('Bike.removeById', () => {
    it('must remove bike by id 1', () =>{
        var aBike1 = new Bike(1,'green','urban');
        Bike.add(aBike1);
        expect(Bike.allBikes.length).toBe(1);
        var a = Bike.allBikes[0].id;
        Bike.removeById(a);
        expect(Bike.allBikes.length).toBe(0)
    })
})

/* describe('Testing Bikes', function(){
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB,{useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('We are connected to test database!');
            done();
        });
    });

    afterEach(function(done){
        Bike.deleteMany({},function(err,success){
            if(err) console.log(err);
            done();
        })
    })

    describe('Bike.createInstance',() =>{
        it('creates an instance of a Bike',() => {
            var bike = Bike.createInstance(1, "green", "urban", [-34.5,-54.1]);

            expect(bike.code).toBe(1);
            expect(bike.color).toBe("green");
            expect(bike.model).toBe("urban");
            expect(bike.location[0]).toBe(-34.5);
            expect(bike.location[1]).toBe(-54.1);
        }) 
    })
}); */