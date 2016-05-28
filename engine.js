var canvas = document.getElementById('SOS');
var context = canvas.getContext('2d');
var whatDragged = null;



//Timer ------------------------------------------------------------------------------------//
function Timer() {
    this.counter = 0;
    this.update = function() {
        this.counter++;
    }
}

// Buttons ----------------------------------------------------------------------------------//
//Takes in text x, y, width and height.  Use this.click to evoke a function in event handler function.
function button(text, X, Y, width, height) {
    this.text = text;
    this.width = width;
    this.height = height;
    this.x = X - this.width / 2;
    this.y = Y - this.height / 2;

    //Pass in a function then its parameter
    this.click = function(method, param) {
        if(!mute) audioManager.play(audioManager.menu_select);
        method(param);
    }
    this.draw = function() {
        context.fillStyle = "	#D3D3D3";
        context.fillRect(this.x, this.y, this.width, this.height);
        context.font = "30px Arial";
        context.fillStyle = "#000000";
        context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    };
}


// Drag and Drop ----------------------------------------------------------------------//
//add funtion with itembase
function Element(item, url, width, height, x, y) {
    this.item = item;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.inUse = false;
    this.sprite = new SpriteSheet(url, this.width, this.height, 4);
    this.sprite.setFrameRange(1, 10);
    this.slot = null;
    this.durab = this.item.durability;
    this.selected;
    this.setInUse = function() {
        this.inUse = true;
        this.sprite.setFrameRange(1, 1);
    }
    this.unSetInUse = function() {
        this.inUse = false;
        this.sprite.setFrameRange(1, 10);
        this.consumed = false;
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
            whatDragged.selected = true;
            whatDragged.unSetInUse();
            for (let slot of theShip.slots) //use let of to itteretate objects.
            {
                if (slot.element == whatDragged) {
                    slot.removeElement();
                    break;
                }
            }
            for (let thrust of theShip.thruster) //use let of to itteretate objects.
            {
                if (thrust.element == whatDragged) {
                    thrust.removeElement();
                    break;
                }
            }
            break;
        }
    }
    if(!mute) audioManager.play(audioManager.select_item);
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
    //check collision
    if (whatDragged != null) {
        var slot = collisionList(whatDragged, theShip.slots);
        var thrust = collisionList(whatDragged, theShip.thruster);
        whatDragged.selected = false;
        if ((slot || thrust)) {
            if (slot && slot.element == null && slot.occupied == false && whatDragged.item.type != "propulsion") {
                whatDragged.x = slot.x - (slot.width - whatDragged.width);
                whatDragged.y = slot.y - (slot.height - whatDragged.height);
                whatDragged.slot = slot;
                slot.addElement(whatDragged);
                whatDragged.setInUse();
            } else if (thrust && thrust.element == null && thrust.occupied == false && whatDragged.item.type == "propulsion") {
                whatDragged.x = thrust.x - (thrust.width - whatDragged.width);
                whatDragged.y = thrust.y - (thrust.height - whatDragged.height);
                whatDragged.slot = thrust;
                thrust.addElement(whatDragged);
                whatDragged.setInUse();
            }
        } else {
            whatDragged.unSetInUse();
            if (whatDragged.slot != null) {
                whatDragged.slot.element = null;
                //whatDragged.slot.removeElement();
            }
        }
        whatDragged = null;
        LifeTime(theShip);
    }
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
    this.endFrame = 10;
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
                currentFrame = this.startFrame;
            } else {
                currentFrame = (currentFrame + 1);
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
    var weight = [0.6, 0.2, 0.15, 0.05];
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
            var dragElement = new Element(randomPart, randomPart.src, 50, 50, canvas.width, 600 * Math.random());
            items.push(dragElement);
        }
    };

    this.update = function(speed) {
        for (var j = 0; j < items.length; j++) {
            if (!items[j].inUse && !items[j].selected) {
                items[j].x -= Math.random() * speed;
                if (items[j].x <= 0) {
                    var splicedPart = items.splice(j, 1)[0]; //extract from the array
                    //console.log(splicedPart);
                    var randomPart = randomElement(parts);
                    items.push(new Element(randomPart, randomPart.src, 50, 50, canvas.width, 600 * Math.random()));
                    //console.log("NEW!");
                }
            }
        }
    };
}
//GUI-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function gui(x, y, src) {
    this.X = x; //1000
    this.Y = y; // 750
    this.sprites = [];
    this.sources = [];
    this.barWidth = 150;
    this.barHeight = 25;
    this.sources.push("GUI/GUI.png");
    this.sources.push("GUI/oxygen.png");
    this.sources.push("GUI/fuel_tank.png");
    this.sources.push("GUI/happiness.png");

    this.panelEscape = new Image();
    this.panelEscape.src = "GUI/LowerPanel.png";
    this.panelScreen1 = new Image();
    this.panelScreen1.src = "GUI/Screen.png";
    this.panelScreen2 = new Image();
    this.panelScreen2.src = "GUI/Screen.png";

    this.init = function() {
        for (i = 0; i < 4; i++) {
            this.sprites[i] = new Image();
            this.sprites[i].src = this.sources[i];
        }
    };

    this.draw = function() {
        context.drawImage(this.panelEscape, 0, 640, 695, 260);
        context.drawImage(this.panelScreen1, 695, 640, 305, 260);
        context.drawImage(this.panelScreen2, 1000, 640, 305, 260);

        //context.drawImage(this.sprites[0], this.X, this.Y - this.sprites[0].height / 2);
        context.fillStyle = "#04ff82";
        context.fillRect(this.X + 25, this.Y - 75, this.barWidth * durability / 1000, this.barHeight);
        context.fillRect(this.X + 25, this.Y - 25, this.barWidth * fuel / 1000, this.barHeight);
        context.fillRect(this.X + 25, this.Y + 25, this.barWidth * happiness / 1000, this.barHeight);
        context.fillStyle = "#ffffff";
        context.fillText(durability, this.X + 95, this.Y - 50);
        context.fillText(fuel, this.X + 95, this.Y);
        context.fillText(happiness, this.X + 95, this.Y + 50);
        context.drawImage(this.sprites[1], this.X + 150, this.Y - 75);
        context.drawImage(this.sprites[2], this.X + 150, this.Y - 25);
        context.drawImage(this.sprites[3], this.X + 150, this.Y + 25);
        if (whatDragged != null)
        {
            context.font = "bold 40px curved-pixel";
            for(var i = 0; i < itemDesc[whatDragged.item.name].length; i++)
            {
                line = itemDesc[whatDragged.item.name][i];
                context.fillText(line, this.X - 300 , (this.Y - 50) + i*30)
            }

        }
    };
}
