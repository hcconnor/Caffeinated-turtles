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
    return temp;
  }

  this.calcHappiness = function(){
    var temp = 0;
    for(let happy of this.happyThings){
      if(!happy.item.disabled) temp += happy.durab;
    }
    return temp;
  }

  this.calcSpeed = function(){
    var temp = 0;
    for(let spd of this.rocketThrusters){
      if(!spd.item.disabled) temp += spd.item.push;
    }
    if(fuel <= 0) {
      if(currentSpeed > 0) {
        currentSpeed -= decceleration;
      }
      if(currentSpeed <= 0) currentSpeed = 0;;
    } else currentSpeed = temp;
  }

  this.calcSystem = function(){
    var temp = 0;
    for(let sys of this.shipSystem){
      if(!sys.item.disabled) temp += sys.durab;
    }
    return temp;
  }

  this.calcConsumption = function(){
    var temp = 0;
    for(let thrust of this.rocketThrusters){
      if(!thrust.item.disabled) temp += thrust.item.efficiency;
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

  this.calcDegrade = function(theShip){
    var temp = 0;
    var degrade = true;
    for(let slot of theShip.slots){
      if (slot.element != null && slot.element.item.type == "life_support"){
         degrade = false;
       }
    }
    if(degrade == true) temp += 0.2;
    if(happiness <= 0) temp += 0.2;
    return temp;
  }
}
