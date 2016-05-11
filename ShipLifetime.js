//Pass in a ship object ship
//returns 1 value representing that you're still alive

function ship(x, y){
    this.numSlots = 5;
	//this.spritesheet = spritesheet;
    this.picture = new Image();
	this.picture.height = 700;
	this.picture.width = 800;
	//this.X = x;//this.width/2;
	//this.Y = y;//this.height/2;
//	this.thrusters = {};

    this.picture.src = "sprites/shiptest.png";
    this.picture.X = x;
    this.picture.Y = y;



	this.slots = [];
    this.slots.push(new slot(20,20));
    this.slots.push(new slot(20,220));
    this.slots.push(new slot(20,420));
    this.slots.push(new slot(20,620));
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
        //draw ship
        context.drawImage(this.picture, this.picture.X,
             this.picture.Y,this.picture.width,this.picture.height);

             
		//draw current sprite from spritesheet
        //iterates all the slots and draws them
		for(let slot of this.slots){
			context.drawImage(slot.picture, slot.picture.X,
                 slot.picture.Y,slot.picture.width,slot.picture.height);
		};

	};
}

function slot (x, y, element = null)
{
    this.picture = new Image();
	this.picture.src = "sprites/test_box.png";
    this.picture.X = x;
    this.picture.Y = y;
    this.picture.width = 100;
    this.picture.height = 100;
    this.element = element;
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
		$.each(this.slots, function(index, slot){
			slot.element.durability--;
		});
	};

var escPod = ship.prototype;
	escPod.value = 0;
	escPod.calcScore = function(){
		$.each(this.slots, function(element){
			this.value += element.value;
		});
		$.each(this.thrusters, function(thruster){
			this.value += thruster.value;
		});
	};

//requires global variables Happy and Fuel. Subject to change though based on ship element.

function LifeTime(ship){
	var i;
	var essential = [false, false, false, false];
	$.each(ship.thruster, function(){
		if(ship.thruster[i].type != "thruster"){
			lose = true;
		} else if(ship.thruster[i].type == "thruster"){
			essential[0] = true;
			spd += ship.thruster[i].value;
		}
	});
	$.each(ship.misc, function(){
		if(ship.misc[i].type == "thruster"){
			lose = true;
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
		if(essential[i] == false) lose = true;
	});
}
