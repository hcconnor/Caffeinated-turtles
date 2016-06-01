//Durability goes down drastically?
function asteroid_field(){
  this.field = [];

  this.update = function(){
    if(!false && timer.counter % 3 == 0){ //substitute for shielded boolean later
      durability -= durability * 0.05;
      this.field.push(new asteroid("sprites/test_object.png"));
    }
    var rand = Math.random() * distance;
    if (rand > 150)
    {
        this.field.push(new asteroid("sprites/test_object.png"));;
    }
    for(let rock of this.field){
      rock.x--;
      if(rock.x <= -50) this.field.splice(indexOf(rock), 1);
    }
  };

  this.draw = function(){
    for(let rock of this.field){
      context.drawImage(rock.picture, rock.x, rock.y);
    }
  };
}

function asteroid(src){
  this.x = canvas.width;
  this.y = 600 * Math.random();
  this.picture = new Image();
  this.picture.src = src;
}

//random slots disabled (BACKUP) max stats halved
function nebula(){
  this.update = function(){
    if(!false){ //substitute for backup systems

    }
  };
  this.draw = function(){

  };
}

//Crew happiness tanks if ship lacks a certain item, goes up massively if they have it
function crew_craving(){
  this.update = function(){

  };
  this.draw = function(){

  };
}

//Derelict ships fly by, mash click on them to break.  (MAYBE) no other debris spawns
function ship_graveyard(){
  this.drifters = [];
  addEventListener("mousedown", function(){
    for(let drifter of drifters){
      if(checkBounds(drifter, e.clientX, e.clientY)) drifter.health--;
    }
  });

  this.update = function(){
    if(timer.counter % 4 == 0){
      this.drifters.push(new derelict("sprites/test_object.png", 7));
    }
    for(let drifter of drifters){
      drifter.x--;
      if(drifter.x <= -50) this.drifters.splice(indexOf(drifter), 1);
      if(drifter.health <= 0){
        this.drifters.splice(indexOf(drifter), 1);
        for(m = 0; m < 8; m++){
          randomPart = randomElement(parts);
          items.push(new Element(randompart, randomPart.src, drifter.x + 4 * Math.random() * m, drifter.y + 4 * Math.random * m));
        }
      }
    }
    if(timer.counter <= 0) removeEventListener("mousedown", function(){
      for(let drifter of drifters){
        if(checkBounds(drifter, e.clientX, e.clientY)) drifter.health--;
      }
    });
  };
  this.draw = function(){
    for(let drifter of this.drifters){
      context.draw(drifter.picture, drifter.x, drifter.y);
    }
  };
}

function derelict(src, health){
  this.x = canvas.width;
  this.y = 600 * Math.random();
  this.picture = new Image();
  this.picture.src = src;
  this.health = health;
}
