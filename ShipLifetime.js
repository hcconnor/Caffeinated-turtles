//Pass in a ship object ship
//returns 1 value representing that you're still alive

function ship(x, y){
    this.numSlots = 4;
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
    this.update = function()
    {
        for(let slot of this.slots){
            slot.update();
        };
    }

	this.draw = function(){
        //draw ship
        context.drawImage(this.picture, this.picture.X,
             this.picture.Y,this.picture.width,this.picture.height);


		//draw current sprite from spritesheet
        //iterates all the slots and draws them
		for(let slot of this.slots){
			slot.draw();
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

    this.update = function()
    {
        if (whatDragged == null)
        {
            return
        }
        if (doesCollide(this, whatDragged))
        {
            console.log("light up slot!");
            this.picture.src = "sprites/test_object.png";
        }
        else
        {
            this.picture.src = "sprites/test_box.png";
        }
    }

    this.draw = function()
    {
        context.drawImage(this.picture, this.picture.X,
             this.picture.Y,this.picture.width,this.picture.height);
    }
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
	var essential = [false, false, false, false];
	for(i = 0; i < ship.thrusters.length, i++){
		if(ship.thruster[i].type != "thruster"){
			lose = true;
		} else if(ship.thruster[i].type == "thruster"){
			essential[0] = true;
			spd += ship.thruster[i].durability;
		}
<<<<<<< HEAD
	});
	$.each(ship.slots, function(){
		if(ship.slots[i].type == "thruster"){
			lose = true;
		} else if(ship.slots[i].type == "fuel"){
			essential[1] = true;
			Fuel += ship.slots[i].durability;
		} else if(ship.slots[i].type == "vanity"){
			Happy += ship.slots[i].durability;
		} else if(ship.slots[i].type == "lifeSupport"){
			essential[2] = true;
=======
	}
	for(i = 0; i< ship.slots.length; i++){
		if(ship.misc[i].type == "thruster"){
			lose = true;
		} else if(ship.slots[i].type == "fuel"){
			essential[1] = true;
			fuel += ship.slots[i].value;
		} else if(ship.slots[i].type == "vanity"){
			happiness += ship.slots[i].value;
		} else if(ship.slots[i].type == "lifeSupport"){
			essential[2] = true;
      life_support += ship.slots[i].value;
>>>>>>> origin/master
		} else if(ship.slots[i].type =- "oxygen"){
			essential[3] = true;
		}
	}
	for(i = 0; i < essential.length, i++){
		if(essential[i] == false) lose = true;
	}
}

function escPodValue(pod){
  var fail = false;
  var score = 0;
  var essential = [false, false, false, false];

  for(i = 0; i< pod.slots.length; i++){
    if(pod.misc[i].type == "thruster"){
      fail = true;
    } else if(pod.slots[i].type == "fuel"){
      essential[1] = true;
      score += pod.slots[i].value;
    } else if(pod.slots[i].type == "vanity"){
      score += pod.slots[i].value;
    } else if(pod.slots[i].type == "lifeSupport"){
      essential[2] = true;
      score += pod.slots[i].value;
    } else if(pod.slots[i].type =- "oxygen"){
      essential[3] = true;
      score += pod.slots[i].value;
    }
  }
  for(i = 0; i < pod.thrusters.length, i++){
    if(pod.thruster[i].type != "thruster"){
      fail = true;
    } else if(pod.thruster[i].type == "thruster"){
      essential[0] = true;
      score += pod.thruster[i].value;
    }
  }
  for(i = 0; i < essential.length, i++){
    if(essential[i] == false) fail = true;
  }
  if(fail != true) return score;
  else return 0;
}
