function setObstacle() {
    /* if(distance >= 2000) */ //Use when done testing
    currentObstacle = obstacles[Math.floor(4 * Math.random())];
}

//Durability goes down drastically?
function asteroid_field() {
    this.field = [];
    addEventListener("mousedown", breakit);

    this.update = function() {
        if (!false) { //substitute for shielded boolean later
          for(let rock of this.field){
            if(collisionList(theShip, this.field) == true){
               durability -= durability * 0.05 * currentSpeed;
               this.field.splice(this.field.indexOf(rock), 1);
               console.log("bang!");
            }
          }
        }
        var rand = Math.random();
        if (rand >= 0.95 && this.field.length <= 40) {
            this.field.push(new clickable("sprites/asteroid.png", 50, 50, 2));;
        }
        for (let rock of this.field) {
            rock.x -= (currentSpeed + 3);
            if (rock.x <= -50) this.field.splice(this.field.indexOf(rock), 1);
            rock.update();
            if(rock.health <= 0) this.field.splice(this.field.indexOf(rock), 1);
        }
        if (timer.counter <= 0) {
            removeEventListener("mousedown", breakit);
        };
    };

    this.draw = function() {
        for (let rock of this.field) {
            rock.draw();
            context.font = "30px curved-pixel";
            if (timer.counter >= (7 * timer.length / 10)) context.fillText("Captain! Incoming asteroid field!", canvas.width / 2, 200);
        }
    };
}

function clickable(src, width, height, health) {
    this.x = canvas.width;
    this.y = 600 * Math.random();
    this.width = width;
    this.height = height;
    this.health = health;
    this.sprite = new SpriteSheet(src, width, height, 50, 4);
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
  if (!false) { //substitute for backup systems
    var num = Math.floor((Math.random() * 4) + 1);
    for(k = 0; k < num; k++){
      var random = Math.floor((Math.random() * theShip.slots.length));
      if(theShip.slots[k].element != null && !theShip.slots[k].element.item.disabled) theShip.slots[k].element.item.disabled = true;
      console.log(theShip.slots[k].element);
    }
  }
    this.update = function() {
        if(timer <= 0){
          for(let slot of theShip.slots){
            slot.element.item.disabled = false;
          }
        }
    };
    this.draw = function() {
      this.sprite.draw(0, 0);
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
    this.drifters = [new clickable("sprites/test_object.png", 100, 100, 7)];
    addEventListener("mousedown", breakit);

    this.update = function() {
        if (this.drifters.length < 4) {
            this.drifters.push(new derelict("sprites/test_object.png", 100, 100, 7));
        }
        for (let drifter of this.drifters) {
            drifter.x -= (currentSpeed + 0.01);
            if (drifter.x <= -50) this.drifters.splice(this.drifters.indexOf(drifter), 1);
            if (drifter.health <= 0) {
                for (s = 0; s < 8; s++) {
                    randomPart = randomElement(parts);
                    items.push(new Element(randomPart, randomPart.src, 50, 50, drifter.x + Math.random() * s * 50, drifter.y + Math.random() * s * 50));
                }
            }
            if(drifter.health <= 0) this.drifters.splice(this.drifters.indexOf(drifter), 1);
        }
        if (timer.counter <= 0) {
            removeEventListener("mousedown", breakit);
        };
    }

    this.draw = function() {
        for (let drifter of this.drifters) {
            drifter.draw();
            context.font = "30px curved-pixel";
            if (timer.counter >= (7 * timer.length / 10)) context.fillText("Derelict ships ahead!  Click to break them apart for parts!", canvas.width / 2, 200);
        }
    };
}

function breakit(e) {
  if(currentObstacle == obstacles[0]){
    for (let drifter of obstacles[0].drifters) {
        if (checkBounds(drifter, e.clientX, e.clientY)) drifter.health--;
    }
  }else if(currentObstacle == obstacles[1]){
    for (let drifter of obstacles[1].field) {
      if(checkBounds(drifter, e.clientX, e.clientY)) drifter.health--;
    }
  }
}
