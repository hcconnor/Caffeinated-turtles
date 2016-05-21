//Pass in a ship object ship
//returns 1 value representing that you're still alive

function ship(x, y){
    this.numSlots = 4;
	//this.spritesheet = spritesheet;
    this.picture = new Image();
	this.picture.height = 450;
	this.picture.width = 750;
	//this.X = x;//this.width/2;
	//this.Y = y;//this.height/2;
//	this.thrusters = {};

    this.picture.src = "sprites/BigShip.png";
    this.picture.X = x;
    this.picture.Y = y;



	this.slots = [];
    this.slots.push(new slot(150,350));
    this.slots.push(new slot(300,350));
    this.slots.push(new slot(150,50));
    this.slots.push(new slot(300,100));
	this.health = 30000;

  this.thruster = [];
    this.thruster.push(new slot(100, 150));
    this.thruster.push(new slot(100, 250));

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
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.element = element;
    this.occupied = false;

    this.sprite = new SpriteSheet('sprites/SlotSprite.png', this.width, this.height, 4);
    this.sprite.setFrameRange(1,1);
    this.update = function()
    {
        if (whatDragged != null)
        {
            if (doesCollide(this, whatDragged))
            {
                console.log("light up slot!");
                this.sprite.setFrameRange (3,3);
            }
            else
            {
                if(this.occupied == false) this.sprite.setFrameRange (2,2);
                else this.sprite.setFrameRange(1,1);
            }
        }
        else
        {
            this.sprite.setFrameRange (1,1);
        }
        this.sprite.update();
        if(this.element != null) this.element.durability --;
        happiness--;
    }

    this.draw = function()
    {
        this.sprite.draw(this.x, this.y);
    }

    this.addElement = function(item)
    {
        this.element = item;
        this.occupied = true;
    }

    this.removeElement = function()
    {
      this.element = null;
      this.occupied = false;
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
	var i;
	var essential = [false, false, false, false];
	for (let i of ship.thruster){
		if(ship.thruster[i] != null && ship.thruster[i].element.type != "thruster"){
			lose = true;
		} else if(ship.thruster[i] != null && ship.thruster[i].element.type == "thruster"){
			essential[0] = true;
			speed += ship.thruster[i].element.durability;
		}
	};
	for(let i of ship.slots){
		if(ship.slots[i] != null && ship.slots[i].element.type == "thruster"){
			lose = true;
		} else if(ship.slots[i] != null && ship.slots[i].element.type == "fuel"){
			essential[1] = true;
			fuel += ship.slots[i].element.durability;
		} else if(ship.slots[i] != null && ship.slots[i].element.type == "vanity"){
			happiness += ship.slots[i].element.durability;
		} else if(ship.slots[i] != null && ship.slots[i].element.type == "lifeSupport"){
			essential[2] = true;
	   }
	};
	$.each(essential, function(){
		if(essential[i] == false) lose = true;
	});
}
