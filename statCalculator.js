function status(){
  this.fuelTanks = [];
  this.happyThings = [];
  this.rocketThrusters = [];
  this.shipSystems = [];

  this.calcFuel= function(){
    var temp = 0;
    for(let tanks of this.fuelTanks){
      temp += tanks.durab;
    }
    //console.log(this.fuelTanks);
    return temp;
  }

  this.calcHappiness = function(){
    var temp = 0;
    for(let happy of this.happyThings){
      temp += happy.durab;
    }
    return temp;
  }

  this.calcSpeed = function(){
    var temp = 0;
    for(let spd of this.rocketThrusters){
      temp += spd.durab;
    }
    if(fuel <= 0) temp = 0;
    return temp;
  }

  this.calcSystem = function(){
    var temp = 0;
    for(let sys of this.shipSystem){
      temp += sys.durab;
    }
    return temp;
  }

  this.calcConsumption = function(){
    var temp = 0;
    for(let thrust of this.rocketThrusters){
      temp += thrust.item.efficiency;
    }
    return temp;
  }

  this.calcSad = function(){
    var temp = 0;
    for(var sad = 0; sad < this.happyThings.length; sad++){
      temp++;
    }
    return temp;
  }

  this.clean = function(){
    this.fuelTanks = [];
    this.happyThings = [];
    this.rocketThrusters = [];
    this.shipSystems = [];
  }

  this.shipDurability = function(theShip){
    var temp = 0;
    for(let tanks of this.fuelTanks){
      if(tanks.durab == 0) temp += 0.5;
    }
    for(let happy of this.happyThings){
      if(happy.durab == 0) temp += 0.5;
    }
    for(let rocket of this.rocketThrusters){
      if(rocket.durab == 0) temp += 0.5;
    }
    for(let system of this.shipSystems){
      if(system.durab == 0) temp += 0.5;
    }
    return temp;
  }
}
