//Pass in a ship object ship
//returns 1 value representing that you're still alive

 class ship{
   constructor(x, y, src){
     this.numSlots = 4;
     this.picture = new Image();
     this.picture.src = src;
     this.picture.X = x;
     this.picture.Y = y;

     this.slots = [];
     this.thruster = [];
   }

    init() {
        this.spritesheet.setFrameRange(1, 1);
    };

    addThrusters(thuster) {
        this.thrusters.push(thruster);
    };

    addPart(part) {
        this.slots.push(part);
    };
    update() {
        for (let slot of this.slots) {
            slot.update();
        };
    }

    draw() {
        //draw ship
        context.drawImage(this.picture, this.picture.X,
            this.picture.Y, this.picture.width, this.picture.height);
        //draw current sprite from spritesheet
        //iterates all the slots and draws them
        for (let slot of this.slots) {
            slot.draw();
        };
        for (let thrust of this.thruster) {
            thrust.draw();
        }
    };
}

function slot(x, y, isThruster = false, element = null) {
    this.picture = new Image();
    this.x = x;
    this.y = y;
    this.isThruster = isThruster;
    this.width = 50;
    this.height = 50;
    this.element = element;
    this.occupied = false;

    this.sprite = new SpriteSheet('sprites/SlotSprite.png', this.width, this.height, 4);
    this.sprite.setFrameRange(1, 1);
    this.update = function() {
        if (whatDragged != null) {
            if (doesCollide(this, whatDragged) && whatDragged.item.type == "propulsion" && this.isThruster && !this.occupied) {
                console.log("light up Thruster slot!");
                this.sprite.setFrameRange(3, 3);
            } else if (doesCollide(this, whatDragged) && whatDragged.item.type != "propulsion" && !this.isThruster && !this.occupied) {
                console.log("light up normal slot!");
                this.sprite.setFrameRange(3, 3);
            } else {
                if (this.occupied == false) {
                    if (whatDragged.item.type == "propulsion") {
                        if (this.isThruster) {
                            this.sprite.setFrameRange(2, 2);
                        }
                    } else {
                        if (!this.isThruster) {
                            this.sprite.setFrameRange(2, 2);
                        }
                    }
                } else {
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
        if (!mute) audioManager.play(audioManager.slot_in);
        this.element = item;
        this.occupied = true;
    }

    this.removeElement = function() {
        this.element = null;
        this.occupied = false;
        console.log("REMOVED!")
    }
}


class mainShip extends ship {
    constructor(x, y, src) {
        super(x, y, src);
        this.picture.height = 450;
        this.picture.width = 750;
        this.slots.push(new slot(150, 350));
        this.slots.push(new slot(300, 350));
        this.slots.push(new slot(150, 50));
        this.slots.push(new slot(300, 100));

        this.thruster.push(new slot(100, 250, true));
        this.thruster.push(new slot(100, 150, true));
    }

    update() {
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
        for (let thrust of this.thruster) {
            thrust.update();
        }
        sadRate = 1 - statManager.calcSad() * 0.4;
        energyCons = statManager.calcConsumption();
        fuel = statManager.calcFuel();
        if (fuel < 0) fuel = 0;
        happiness -= sadRate;
        currentSpeed = statManager.calcSpeed();
        if (statManager.fuelTanks.length > 0 && statManager.rocketThrusters.length > 0) {
            if (statManager.fuelTanks[statManager.fuelTanks.length - 1].durab < 0) {
                statManager.fuelTanks.pop();
            } else {
                statManager.fuelTanks[statManager.fuelTanks.length - 1].durab -= energyCons;
            }
            fuel = statManager.calcFuel();
        }
    };
}


class escPod extends ship {
    constructor(x, y, src) {
        super(x, y, src);
        this.value = 0;
        this.picture.height = 250;
        this.picture.width = 350;
        this.slots.push(new slot(this.picture.x + 50, this.picture.y + 50));
        this.slots.push(new slot(this.picture.x + 50, this.picture.y + 100));
        this.slots.push(new slot(this.picture.x + 100, this.picture.y + 100));
        this.slots.push(new slot(this.picture.x + 150, this.picture.y + 150));

        this.thruster.push(new slot(0, this.picture.y + this.picture.height / 3, true));
        this.thruster.push(new slot(0, this.picture.y + 2 * this.picture.height / 3, true));
    }

    calcScore() {
        for (let item of this.slots) {
            this.value += item.value;
        }
        for (let thruster of this.thruster) {
            this.value += thruster.value;
        }
    };
}

//requires global variables happiness and Fuel. Subject to change though based on ship element.
function LifeTime(ship) {
    statManager.clean();
    for (let thruster of ship.thruster) {
        if (thruster.element != null && thruster.element.item.type != "propulsion") {
            lose = true;
        } else if (thruster.element != null && thruster.element.item.type == "propulsion") {
            statManager.rocketThrusters.push(thruster.element);
        }
    }
    for (let slot of ship.slots) {
        if (slot.element != null && slot.element.item.type == "propulsion") {
            lose = true;
        } else if (slot.element != null && slot.element.item.type == "fuel") {
            statManager.fuelTanks.push(slot.element);
        } else if (slot.element != null && slot.element.item.type == "vanity") {
            statManager.happyThings.push(slot.element);
        } else if (slot.element != null && slot.element.item.type == "lifeSupport") {
            statManager.shipSystem.push(slot.element);
        }
    }
}
