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

var a = new Bike(1,'red','urban',[-34.6012424,-58.38614197]);
var b = new Bike(2,'white','urban',[-34.596932,-58.3808287]);

Bike.add(a);
Bike.add(b);

module.exports = Bike;