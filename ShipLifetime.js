//Pass in a ship object ship
//returns 1 value representing that you're still alive
function ship(spritesheet, x, y){
	this.spritesheet = spritesheet;
	this.height = this.sprite.height;
	this.width = this.sprite.width;
	this.X = x - this.width/2;
	this.Y = y - this.height/2;
	this.thrusters = {};
	this.slots = {};
	this.health = 30000;
	
	this.init = function(){
		this.spritesheet.setFrameRange(1,1);
	};
	
	this.addThrusters = function(thuster){
		this.thrusters.push(thruster);	
	};
	
	this.addPart = function(part){
		this.slots.push(part);
	};
	
	this.draw = function(){
		//draw current sprite from spritesheet
		$.each(this.slots, function(img){
			contex.drawImage(img.sprite, img.X, img.Y);	
		});
		$.each(this.thrusters, function(img){
			contex.drawImage(img.sprite, img.X, img.Y);	
		});
	};
}

var mainShip = ship.prototype;
	mainShip.update = function(){
		this.health--;
		if(health >= 20000){ //Ship is deteriorating 
			this.spritesheet.setFrameRange(1,1); //change this
		}else if(health >= 10000){
			this.spritesheet.setFrameRange(1,1); //change this
		}else if(health >= 5000){
			this.spritesheet.setFrameRange(1,1); //change this
		}
		$.each(this.slots, function(object){
			object.durability--;	
		});
		$.each(this.thrusters, function(thruster){
			thruster.durability--;	
		});
	};

var escPod = ship.prototype;
	escPod.value = 0;
	escPod.calcScore = function(){
		$.each(this.slots, function(object){
			this.value += object.value;	
		});
		$.each(this.thrusters, function(thruster){
			this.value += thruster.value;	
		});
	};

function LifeTime(ship){
	var i;
	var essential = [false, false, false, false];
	$.each(ship.thruster, function(){
		if(ship.thruster[i].type != "thruster"){
			return 0;
		} else if(ship.thruster[i].type == "thruster"){
			essential[0] = true;
			spd += ship.thruster[i].value;
		}
	});
	$.each(ship.misc, function(){
		if(ship.misc[i].type == "thruster"){
			return 0;
		} else if(ship.misc[i].type == "fuel"){
			essential[1] = true;
			Fuel += ship.misc[i].value;
		} else if(ship.misc[i].type == "vanity"){
			Happy += ship.misc[i].value;
		} else if(ship.misc[i].type == "lifeSupport"){
			essential[2] = true;
		} else if(ship.misc[i].type =- "oxygen"){
			essential[3] = true;
		}
	});
	$.each(essential, function(){
		if(essential[i] == false) return 0;
	});
	return 1;
}