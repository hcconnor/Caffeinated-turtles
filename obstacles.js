function setObstacle() {
    /* if(distance >= 2000) */ //Use when done testing
    currentObstacle = obstacles[Math.floor(4 * Math.random())];
}

//Durability goes down drastically?
function asteroid_field() {
    this.field = [];

    this.update = function() {
        if (!false && timer.counter % 10 == 0) { //substitute for shielded boolean later
            durability -= durability * 0.001 * currentSpeed;
        }
        var rand = Math.random();
        if (rand >= 0.95 && this.field.length <= 40) {
            this.field.push(new asteroid("sprites/asteroid.png"));;
        }
        for (let rock of this.field) {
            rock.x -= (currentSpeed + 1);
            if (rock.x <= -50) this.field.splice(this.field.indexOf(rock), 1);
        }
    };

    this.draw = function() {

        for (let rock of this.field) {
            context.drawImage(rock.picture, rock.x, rock.y);
            context.font = "30px curved-pixel";
            if (timer.counter >= (7 * timer.length / 10)) context.fillText("Captain! Incoming asteroid field!", canvas.width / 2, 200);
        }
    };
}

function asteroid(src) {
    this.x = canvas.width;
    this.y = 600 * Math.random();
    this.picture = new SpriteSheet(src, 50, 50, 4);
    this.picture.setFrameRange(1, 10);
}

//random slots disabled (BACKUP) max stats halved
function nebula() {
    this.update = function() {
        if (!false) { //substitute for backup systems

        }
    };
    this.draw = function() {

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
        if (timer.counter >= (7 * timer.length / 10)) context.fillText("The crew is craving a " + this.craving.name + "!", canvas.width / 2, 200);
    };
}

//Derelict ships fly by, mash click on them to break.  (MAYBE) no other debris spawns
function ship_graveyard() {
    this.drifters = [new derelict("sprites/test_object.png", 7)];
    addEventListener("mousedown", breakit);

    this.update = function() {
        if (this.drifters.length < 4) {
            this.drifters.push(new derelict("sprites/test_object.png", 7));
        }
        for (let drifter of this.drifters) {
            drifter.x -= (currentSpeed + 0.01);
            if (drifter.x <= -50) this.drifters.splice(this.drifters.indexOf(drifter), 1);
            if (drifter.health <= 0) {
                for (s = 0; s < 8; s++) {
                    randomPart = randomElement(parts);
                    items.push(new Element(randomPart, randomPart.src, 50, 50, drifter.x + Math.random() * s * 50, drifter.y + Math.random() * s * 50));
                }
                this.drifters.splice(this.drifters.indexOf(drifter), 1);
            }
        }
        if (timer.counter <= 0) {
            removeEventListener("mousedown", function() {
                for (let drifter of this.drifters) {
                    if (checkBounds(drifter, e.clientX, e.clientY)) drifter.health--;
                }
            });
        };
    }

    this.draw = function() {
        for (let drifter of this.drifters) {
            context.drawImage(drifter.picture, drifter.x, drifter.y);
            context.font = "30px curved-pixel";
            if (timer.counter >= (7 * timer.length / 10)) context.fillText("Derelict ships ahead!  Click to break them apart for parts!", canvas.width / 2, 200);
        }
    };
}

function breakit(e) {
    for (let drifter of obstacles[0].drifters) {
        if (checkBounds(drifter, e.clientX, e.clientY)) drifter.health--;
    }
}

function derelict(src, health) {
    this.x = canvas.width;
    this.y = 600 * Math.random();
    this.picture = new Image();
    this.picture.src = src;
    this.width = this.picture.width;
    this.height = this.picture.height;
    this.health = health;
}
