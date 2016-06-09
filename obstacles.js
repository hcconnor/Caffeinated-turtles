function setObstacle() {
    /* if(distance >= 2000) */ //Use when done testing
    currentObstacle = obstacles[0]; //obstacles[Math.floor(4 * Math.random())];
}

//Durability goes down drastically?
function asteroid_field() {
    this.field = [];
    addEventListener("mousedown", breakit);

    this.update = function() {
        for (let rock of this.field) {
            if (collisionList(theShip, this.field) != false) {
                if (!false) durability -= durability * 0.01 + (2 * currentSpeed);
                this.field.splice(this.field.indexOf(rock), 1);
            }
        }
        var rand = Math.random();
        if (rand >= 0.95 && this.field.length <= 40) {
            this.field.push(new clickable("sprites/asteroid.png", 50, 50, 2));;
        }
        for (let rock of this.field) {
            rock.x -= (0.3 * currentSpeed + 3);
            if (rock.x <= -50) this.field.splice(this.field.indexOf(rock), 1);
            rock.update();
            if (rock.health <= 0) this.field.splice(this.field.indexOf(rock), 1);
        }
        if (timer.counter <= 0) {
            removeEventListener("mousedown", breakit);
        }
    };

    this.draw = function() {
        for (let rock of this.field) {
            rock.draw();
            if (timer.counter >= (7 * timer.length / 10)){
              context.font = "30px curved-pixel";
              context.fillText("Captain! Incoming asteroid field!", canvas.width / 2 + 100, 200);
              context.fillText("Click on them or bring up the shields!", canvas.width / 2 + 100, 230);
            }
        }
    };
}

function clickable(src, width, height, health) {
    this.x = canvas.width;
    this.y = 600 * Math.random();
    this.width = width;
    this.height = height;
    this.health = health;
    this.sprite = new SpriteSheet(src, width, height, 4);
    this.sprite.setFrameRange(1, 10);
    this.draw = function() {
        this.sprite.draw(this.x, this.y);
    }
    this.update = function() {
        this.sprite.update();
    }
}

//random slots disabled (BACKUP) max stats halved
function nebula() {
    this.sprite = new SpriteSheet("sprites/nebula.png", 1300, 900, 5);
    this.sprite.setFrameRange(1, 10);
    this.count = 3;

    this.update = function() {
        while (this.count >= 0) {
            if (theShip != null) {
                for (let slot of theShip.slots) {
                    var random = Math.floor((Math.random() * theShip.slots.length));
                    if (slot.element != null && !slot.element.item.disabled) {
                        if (random > 0.6) {
                            slot.element.item.disabled = true;
                        }
                    }
                    this.count--;
                }
            }
        }
        if (timer.count <= 0) {
            for (let slot of theShip.slots) {
                slot.element.item.disabled = false;
            }
            this.count = 4;
        }
    };
    this.draw = function() {
        context.alpha = 0.5;
        this.sprite.draw(0, 0);
        context.alpha = 1;
    };
}

//Crew happiness tanks if ship lacks a certain item, goes up massively if they have it
function crew_craving() {
    this.craving = randomElement(parts);

    this.update = function() {
        if (this.craving.type != "propulsion") {
            for (let part of theShip.slots) {
                if (part.element != null) {
                    if (part.element.item.name = this.craving.name) happiness += happiness * 0.05;
                    else {
                        happiness -= happiness * 0.05;
                    }
                }
            }
        } else if (this.craving.type == "propulsion") {
            for (let part of theShip.thruster) {
                if (part.element != null) {
                    if (part.element.item.name = this.craving.name) happiness += happiness * 0.05;
                    else {
                        happiness -= happiness * 0.05;
                    }
                }
            }
        }
        if (timer.counter <= 0) this.craving = randomElement(parts);
    };
    this.draw = function() {
        context.font = "30px curved-pixel";
        if (timer.counter >= (7 * timer.length / 10)) context.fillText("The crew is craving a " + this.craving.name + "!", canvas.width / 2 + 100, 200);
    };
}

//Derelict ships fly by, mash click on them to break.  (MAYBE) no other debris spawns
function ship_graveyard() {
    this.drifters = [new clickable("sprites/derelict_ship.png", 100, 100, 4)];
    addEventListener("mousedown", breakit);

    this.update = function() {
        if (this.drifters.length < 4) {
            this.drifters.push(new clickable("sprites/derelict_ship.png", 100, 100, 4));
        }
        for (let drifter of this.drifters) {
            drifter.x -= (0.1 * currentSpeed + 1);
            drifter.update();
            if (drifter.x <= -50) this.drifters.splice(this.drifters.indexOf(drifter), 1);
            if (drifter.health <= 0) {
                for (s = 0; s < 8; s++) {
                    randomPart = randomElement(parts);
                    items.push(new Element(randomPart, randomPart.src, 50, 50, drifter.x + Math.random() * s * 50, drifter.y + Math.random() * s * 50));
                }
            }
            if (drifter.health <= 0) this.drifters.splice(this.drifters.indexOf(drifter), 1);
        }
        if (timer.counter <= 0) {
            removeEventListener("mousedown", breakit);
        }
    };

    this.draw = function() {
        for (let drifter of this.drifters) {
            drifter.draw();
        }
        if (timer.counter >= (7 * timer.length / 10)){
          context.font = "30px curved-pixel";
          context.fillText("Derelict ships ahead!", canvas.width / 2 + 100, 200);
          context.fillText("Click to break them apart for parts!", canvas.width / 2 + 100, 230);
        }
    };
}

function breakit(e) {
    if (currentObstacle == obstacles[0]) {
        for (let drifter of obstacles[0].drifters) {
            if (checkBounds(drifter, e.clientX, e.clientY)) drifter.health--;
        }
    } else if (currentObstacle == obstacles[1]) {
        for (let drifter of obstacles[1].field) {
            if (checkBounds(drifter, e.clientX, e.clientY)) drifter.health--;
        }
    }
}
