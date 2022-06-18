var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bikeSchema = new Schema({
    code : Number,
    color: String,
    model:  String,
    location: {
        type: [Number], index: {type: '2dsphere', sparse: true}     
    }
})

bikeSchema.statics.createInstance = function(code,color,model,location){
    return new this({
        code: code,
        color: color,
        model: model,
        location: location
    })
}

bikeSchema.methods.toString = function(){
    return 'code :' + this.code + '|color: ' + this.color
}

bikeSchema.statics.allBikes = function(cb){
    return this.find({}, cb)
}

module.exports = mongoose.model('Bike', bikeSchema);

/*
var Bike = function (id,color,model,location){
    this.id= id;
    this.color = color;
    this.model = model;
    this.location = location
}


Bike.prototype.toString = function(){
   return 'id: '+ this.id + "|color: " + this.color 
}


Bike.allBikes = [];
Bike.add = function (aBike){
    Bike.allBikes.push(aBike);
}

Bike.findById = function(aBikeId){
    var aBike = Bike.allBikes.find(x => x.id == aBikeId);
    if(aBike)
      return aBike
    else
     throw new Error(`No existe una bicicleta con el id ${aBikeId}`);
}

Bike.removeById = function(aBikeId){
    for(var i=0; i < Bike.allBikes.length;i++){
        if(Bike.allBikes[i].id == aBikeId){
            Bike.allBikes.splice(i, 1);
            break;
        }
    }
}


var a = new Bike(1,'red','urban',[-34.6012424,-58.38614197]);
var b = new Bike(2,'white','urban',[-34.596932,-58.3808287]); 


Bike.add(a);
Bike.add(b);



module.exports = Bike;

*/