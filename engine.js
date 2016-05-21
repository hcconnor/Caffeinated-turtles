var canvas = document.getElementById('SOS');
var context = canvas.getContext('2d');
var whatDragged = null;

canvas.addEventListener("mousemove", moveElement);
canvas.addEventListener("mousedown", selectElement);
canvas.addEventListener("mouseup", deselectElement);

//Clock ------------------------------------------------------------------------------------//

var time = new Date();
var SECOND = 1000;
var secs;

function clock() {
    var elaspsed = time - new Date();
    secs = Math.floor(elapsed / SECOND);
}

//Player ---------------------------------------------------------------------------------//

function player(name, pod) {
    this.score = 0;
    this.name = name;
    this.escPod = pod;
}


// Drag and Drop ----------------------------------------------------------------------//
//add funtion with itembase
function Element(type, url, width, height, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.inUse = false;
    this.sprite = new SpriteSheet(url, this.width, this.height, 4);
    this.sprite.setFrameRange(0, 10);
    this.consumed = false;

    this.setInUse = function() {
        this.inUse = true;
        this.sprite.setFrameRange(0, 0);
    }
    this.unSetInUse = function() {
        this.inUse = false;
        this.sprite.setFrameRange(0, 10);
    }
    this.update = function() {
        this.sprite.update();
        //console.log("X:" + this.picture.X +"Y:"+ this.picture.Y + this.picture.width + this.picture.height);
    };

    this.draw = function() {
        this.sprite.draw(this.x, this.y);
    };
}

function selectElement(e) {
    // for(let ef of unlocked){
    // 	if (checkBounds(ef.picture, e.clientX, e.clientY)) {
    // 		whatDragged = new Element(ef.name, ef.picture.src, ef.picture.X, ef.picture.Y);
    // 		items.push(whatDragged);
    // 	}
    // });

    //select element from array of elements on screen
    for (var i = 0; i < items.length; i++) {
        if (checkBounds(items[i], e.clientX, e.clientY)) {
            whatDragged = items[i];
        }
    }
    whatDragged.unSetInUse();
}

function moveElement(e) {
    if (whatDragged) {
        //nameText = whatDragged.name;
        whatDragged.x = e.clientX - whatDragged.width / 2;
        whatDragged.y = e.clientY - whatDragged.height / 2;

    }
}

function deselectElement(e) {
    // if (whatDragged.picture.X + 100 > 820)//out of play area
    // {
    // 	items.splice(items.indexOf(whatDragged), 1); //delete element from the play elements
    // }

    //check collision
    var slot = collisionList(whatDragged, theShip.slots);
    var thrust = collisionList(whatDragged, theShip.thruster);
    if ((slot || thrust) && slot.element == null) {
        if(slot){
          whatDragged.x = slot.x - (slot.width - whatDragged.width);
          whatDragged.y = slot.y - (slot.height - whatDragged.height);
          slot.addElement(whatDragged);
        } else if(thrust){
          whatDragged.x = thrust.x - (thrust.width - whatDragged.width);
          whatDragged.y = thrust.y - (thrust.height - whatDragged.height);
          thrust.addElement(whatDragged);
        }
        whatDragged.setInUse();
    } else {
      whatDragged.unSetInUse();
        for(let slots in theShip.slots){
          if(slots.element == whatDragged){
            slots.removeElement();
            break;
          }
        }
        for(let thrust in theShip.thruster){
          if(thrust.element == whatDragged){
            thrust.removeElement();
            break;
          }
        }
    }
    whatDragged = null;
}

function checkBounds(object, mouseX, mouseY) {
    if ((mouseX < (object.x + object.width)) && (mouseY < (object.y + object.height)) && (mouseX > (object.x)) && (mouseY > (object.y))) {
        return true;
    } else {
        return false;
    }
}




function collisionList(object, array) {
    for (var i = 0; i < array.length; i++) {
        if (doesCollide(object, array[i])) {
            return array[i];
        }
    }
    return false;
}

function doesCollide(obj1, obj2) {
    sX = obj1.x;
    sW = obj1.width;
    sY = obj1.y;
    sH = obj1.height;
    oX = obj2.x;
    oY = obj2.y;
    oW = obj2.width;
    oH = obj2.height;

    if (sX < oX + oW && sX + sW > oX && sY < oY + oH && sH + sY > oY) {
        return true;
    }
    return false;
}

// Sprite sheet code (don't use frame 0) ----------------------------------------------------------------------------------//

function SpriteSheet(url, frameWidth, frameHeight, frameSpeed) {
    var image = new Image();
    var numFrames;

    var currentFrame = 1;
    var counter = 0;
    this.startFrame = 1;
    this.endFrame = 1;
    var animationL = this.endFrame - this.startFrame;
    image.src = url;

    image.onload = function() {
        numFrames = Math.floor(image.width / frameWidth);
    };

    this.setFrameRange = function(start, finish) {
        this.startFrame = start;
        this.endFrame = finish;
        currentFrame = this.startFrame;
        animationL = this.endFrame - this.startFrame;
    };

    this.update = function() {
        if (counter == (frameSpeed - 1)) {
            if (currentFrame == this.endFrame) {
                currentFrame -= animationL;
            } else {
                currentFrame = (currentFrame + 1) % this.endFrame;
            }
        }

        counter = (counter + 1) % frameSpeed;
    };

    this.draw = function(x, y) {
        var row = Math.floor(currentFrame / numFrames);
        var col = Math.floor(currentFrame % numFrames);
        context.drawImage(image, col * frameWidth, row * frameHeight, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
    };

}
//Element generator -------------------------------------------------------------------------------------------------------------//
//Takes in an array of arrays (2D array?) selects a weighted random array, then a random element from that.
function randomElement(list) {
    var random = Math.random();
    var weight = [0.4, 0.3, 0.2, 0.1];
    var weight_sum = 0;

    for (j = 0; j < list.length; j++) {
        weight_sum += weight[j];
        weight_sum = +weight_sum.toFixed(2);
        if (random <= weight_sum) return list[j][Math.floor(Math.random() * list[j].length)];
    }
}

//Particle System ---------------------------------------------------------------------------------------------------------------//
//Takes in numnber of particles and array of all world objects.
function particle_system(num_particles) {
    this.init = function() {
        for (i = 0; i < num_particles; i++) {
            var randomPart = randomElement(parts); //referencing parts array in items.js
            var dragElement = new Element(randomPart, randomPart.src, 50, 50, canvas.width, canvas.height * Math.random());
            items.push(dragElement);
            console.log(items[i]);
        }
    };
    this.update = function(speed) {
        for (let part of items) {
            if (!part.inUse) part.x -= Math.random() * speed;
        }
    };
}
//GUI-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function gui(x, y, src){
    this.X = x; //700
    this.Y = y; //550
		this.sprites = [];
		this.sources = [];
		this.barWidth = 150;
    this.barHeight = 25;
		this.sources.push("GUI/GUI.png");
		this.sources.push("GUI/oxygen.png");
		this.sources.push("GUI/fuel_tank.png");
		this.sources.push("GUI/happiness.png");

		this.init = function(){
			for(i = 0; i < 4; i++){
				this.sprites[i] = new Image();
				this.sprites[i].src = this.sources[i];
			}
		}

    this.draw = function(){
      context.drawImage(this.sprites[0], this.X, this.Y - this.sprites[0].height/2);
      context.fillStyle = "#04ff82";
      context.fillRect(725, 475, this.barWidth * durability/1000, this.barHeight);
      context.fillRect(725, 525, this.barWidth * fuel/1000, this.barHeight);
      context.fillRect(725, 575, this.barWidth * happiness/1000, this.barHeight);
      context.fillStyle = "#ffffff";
      context.fillText(durability, 795, 500);
      context.fillText(fuel, 795, 550);
      context.fillText(happiness, 795, 600);
			context.drawImage(this.sprites[1], 850, 475);
			context.drawImage(this.sprites[2], 850, 525);
			context.drawImage(this.sprites[3], 850, 575);
    }
}
