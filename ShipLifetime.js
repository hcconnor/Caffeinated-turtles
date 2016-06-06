//Pass in a ship object ship
//returns 1 value representing that you're still alive

function ship(x, y, src) {
    this.numSlots = 10;
    this.x = x;
    this.y = y;
    this.picture = new Image();
    this.picture.src = src;
    this.picture.X = this.x;
    this.picture.Y = this.y;

    this.slots = [];
    this.thruster = [];
    this.health = 30000;

    this.init = function() {
        this.spritesheet.setFrameRange(1, 1);
    };

    this.addThrusters = function(thuster) {
        this.thruster.push(thruster);
    };

    this.getAllItems = function() {
        var allItems = [];
        for (let slot of this.slots) {
            if (slot.element) {
                allItems.push(slot.element)
            }
        };
        for (let thrust of this.thruster) {
            if (thrust.element) {
                allItems.push(thrust.element)
            }
        };
        return allItems;
    };

    this.addPart = function(part) {
        this.slots.push(part);
    };
    this.update = function() {
        for (let slot of this.slots) {
            slot.update();
        };
        for (let thrust of this.thruster) {
            thrust.update();
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
                this.sprite.setFrameRange(3, 3);
            } else if (doesCollide(this, whatDragged) && whatDragged.item.type != "propulsion" && !this.isThruster && !this.occupied) {
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
        if (this.occupied) {
            this.element.update();
        }
    }

    this.draw = function() {
        this.sprite.draw(this.x, this.y);
        if (this.occupied) {
            this.element.draw();
        }
    }

    this.addElement = function(item) {
        if (!mute) audioManager.play(audioManager.slot_in);
        this.element = item;
        this.occupied = true;
    }

    this.removeElement = function() {
        this.element = null;
        this.occupied = false;
    }
}


function mainShip(x, y, src) {
    ship.call(this, x, y, src);
    this.width = 750;
    this.height = 450;
    this.picture.width = this.width;
    this.picture.height = this.height;
    this.slots.push(new slot(250, 400));
    this.slots.push(new slot(400, 400));
    this.slots.push(new slot(250, 100));
    this.slots.push(new slot(400, 100));
    this.slots.push(new slot(400, 250)); // mid main room
    this.slots.push(new slot(525, 250)); // mid main room
    this.slots.push(new slot(525, 100)); // dining room
    this.slots.push(new slot(650, 100)); // kitchen
    this.slots.push(new slot(525, 400));
    this.slots.push(new slot(650, 400));
    var active = 0;

    this.thruster.push(new slot(150, 300, true));
    this.thruster.push(new slot(150, 200, true));

    this.update = function() {
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
        fuel = statManager.calcFuel();
        if (tut == false) {
            systemDegrade = statManager.calcDegrade(this);
            durability -= systemDegrade;
            sadRate = 0.5 - 0.3 * statManager.calcSad();
            energyCons = statManager.calcConsumption();
            if (fuel < 0) fuel = 0;
            happiness -= sadRate;
            statManager.calcSpeed();
            if (statManager.fuelTanks.length > 0 && statManager.rocketThrusters.length > 0) {
                if (statManager.fuelTanks[statManager.fuelTanks.length - 1].durab < 0) {
                    statManager.fuelTanks.pop();
                } else {
                    statManager.fuelTanks[statManager.fuelTanks.length - 1].durab -= energyCons;
                }
            }
        }
    };
}


function escPod(x, y, src) {
    ship.call(this, x, y, src);
    this.value = 0;
    this.height = 250;
    this.width = 350;
    this.picture.width = this.width;
    this.picture.height = this.height;

    this.slots.push(new slot(100, 700));
    this.slots.push(new slot(100, 800));
    this.slots.push(new slot(200, 700));
    this.slots.push(new slot(200, 800));
    this.slots.push(new slot(300, 700));
    this.slots.push(new slot(300, 800));

    this.thruster.push(new slot(25, 700, true));
    this.thruster.push(new slot(25, 800, true));

    this.calcScore = function() {
        this.value = 0;
        for (let item of this.getAllItems()) {
            this.value += item.value;
        }
        return this.value;
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
