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
    if (slot) {
        whatDragged.x = slot.x - (slot.width - whatDragged.width);
        whatDragged.y = slot.y - (slot.height - whatDragged.height);
        slot.addElement();
        whatDragged.setInUse();
    } else {
        whatDragged.unSetInUse();
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
        }
    };

    this.update = function(speed) {
        for (j = 0; j < items.length; j++) {
            if (!items[j].inUse){
              items[j].x -= Math.random() * speed;
              if(items[j].x <= 0){
                var part = items.splice(j, 1);
                parts_buffer.push(part);
                if(parts_buffer.length < 50){
                  var randomPart = randomElement(parts)
                  items.push(new Element(randomPart, randomPart.src, 50, 50, canvas.width, canvas.height * Math.random()));
                  console.log("NEW!");
                }
                else{
                  console.log(parts_buffer);
                  items[j] = parts_buffer.slice(-1);
                  items[j] = canvas.width;
                  items[j] = canvas.height * Math.random();
                  console.log("RECYCLED!");
                }
              }
            }
        }
    };
}
