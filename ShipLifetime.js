//Pass in a ship object ship
//returns 1 value representing that you're still alive

function ship(x, y, src) {
    this.numSlots = 4;
    this.picture = new Image();
    this.picture.height = 450;
    this.picture.width = 750;
    this.picture.src = src;
    this.picture.X = x;
    this.picture.Y = y;

    this.slots = [];
    this.thruster = [];
    this.health = 30000;

    this.init = function() {
        this.spritesheet.setFrameRange(1, 1);
    };

    this.addThrusters = function(thuster) {
        this.thrusters.push(thruster);
    };

    this.addPart = function(part) {
        this.slots.push(part);
    };
    this.update = function() {
        for (let slot of this.slots) {
            slot.update();
        };
    }

    this.draw = function() {
        //draw ship
        context.drawImage(this.picture, this.picture.X,
            this.picture.Y, this.picture.width, this.picture.height);
        //draw current sprite from spritesheet
        //iterates all the slots and draws them
        for (let slot of this.slots) {
            slot.draw();
        };
        for (let thrust of this.thruster){
            thrust.draw();
        }
    };
}

function slot(x, y, element = null) {
    this.picture = new Image();
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.element = element;
    this.occupied = false;

    this.sprite = new SpriteSheet('sprites/SlotSprite.png', this.width, this.height, 4);
    this.sprite.setFrameRange(1, 1);
    this.update = function() {
        if (whatDragged != null) {
            if (doesCollide(this, whatDragged)) {
                console.log("light up slot!");
                this.sprite.setFrameRange(3, 3);
            } else {
                if (this.occupied == false)
                {
                    this.sprite.setFrameRange(2, 2);
                }
                else
                {
                    this.sprite.setFrameRange(1, 1);
                }
            }
        } else {
            this.sprite.setFrameRange(1, 1);
        }
        this.sprite.update();
    }

    this.draw = function() {
        this.sprite.draw(this.x, this.y);
    }

    this.addElement = function(item) {
        audioManager.play(audioManager.slot_in);
        this.element = item;
        this.occupied = true;
    }

    this.removeElement = function() {
        this.element = null;
        this.occupied = false;
        console.log("REMOVED!")
    }
}


function mainShip(x, y, src) {
    ship.call(this, x, y, src)
    this.slots.push(new slot(150, 350));
    this.slots.push(new slot(300, 350));
    this.slots.push(new slot(150, 50));
    this.slots.push(new slot(300, 100));

    this.thruster.push(new slot(100, 250));
    this.thruster.push(new slot(100, 150));
    this.update = function() {
        durability--;
        if (durability >= 1000) { //Ship is deteriorating
            //this.spritesheet.setFrameRange(1, 1); //change this
        } else if (durability >= 500) {
            //this.spritesheet.setFrameRange(1, 1); //change this
        } else if (durability >= 200) {
            //this.spritesheet.setFrameRange(1, 1); //change this
        }
        for (let slot of this.slots) {
            slot.update();
        }
        for (let thrust of this.thruster){
            thrust.update();
        }
        LifeTime(this);
        happiness--;
    };
}


function escPod(x, y, src) {
    ship.call(this, x, y, src);
    this.value = 0;

    this.calcScore = function() {
        for (let item of this.slots){
            this.value += element.value;
        }
        for (let thruster of this.thrusters) {
            this.value += thruster.value;
        }
    };
}

//requires global variables happiness and Fuel. Subject to change though based on ship element.
function LifeTime(ship) {
    var i;
    var essential = [false, false, false, false];
    for (let thruster of ship.thruster) {
        if (thruster.element != null && thruster.element.item.type != "thruster") {
            lose = true;
        } else if (thruster.element != null && thruster.element.item.type == "thruster") {
            essential[0] = true;
        }
    }
for (let slot of ship.slots) {
    if (slot.element != null && slot.element.item.type == "thruster") {
        lose = true;
    } else if (slot.element != null && slot.element.item.type == "fuel") {
        essential[1] = true;
        fuel += slot.element.item.durability;
    } else if (slot.element != null && slot.element.item.type == "vanity" && slot.element.consumed == false) {
        happiness += slot.element.item.durability;
        slot.element.consumed = true;
    } else if (slot.element != null && slot.element.item.type == "lifeSupport") {
        essential[2] = true;
    }
    for(let item of essential){
        if (essential[i] == false) lose = true;
    }
}
}
