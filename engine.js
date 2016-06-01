var canvas = document.getElementById('SOS');
var context = canvas.getContext('2d');
var whatDragged = null;



//Timer ------------------------------------------------------------------------------------//
function Timer(length) {
    this.length = length;
    this.counter = length;
    this.done = false;
    this.update = function() {
        this.counter --;
        if(this.counter == 0)
        {
            this.done = true;
            this.counter = this.length;
        }
    }
    this.draw = function()
    {
        context.fillStyle = "white";
        if(this.counter < 10 * 30)
        {
            context.fillStyle = "red";
        }
        context.font = "100px clock";
        context.fillText(Math.floor((this.counter) / 30), 10,100);
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
        context.font = "30px curved-pixel";
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
    var allItems = items.concat(theShip.getAllItems(), currentPlayer.escPod.getAllItems());

    for (let item of allItems) {
        if (checkBounds(item, e.clientX, e.clientY)) {
            whatDragged = item;
            whatDragged.selected = true;
            whatDragged.unSetInUse();
            for (let slot of theShip.slots) //use let of to itteretate objects.
            {
                removeFromSlot(slot);
            }
            for (let thrust of theShip.thruster) //use let of to itteretate objects.
            {
                removeFromSlot(thrust);
            }
            for (let escslot of currentPlayer.escPod.slots) //use let of to itteretate objects.
            {
                removeFromSlot(escslot);
            }
            for (let escthrust of currentPlayer.escPod.thruster) //use let of to itteretate objects.
            {
                removeFromSlot(escthrust);
            }
            break;
        }
    }
    if(!mute) audioManager.play(audioManager.select_item);
    whatDragged.unSetInUse();
}

function removeFromSlot(slot)
{
    if (slot.element == whatDragged) {
        slot.removeElement();
        items.push(whatDragged);
    }
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
        var escslot = collisionList(whatDragged, currentPlayer.escPod.slots);
        var escthrust = collisionList(whatDragged, currentPlayer.escPod.thruster);
        whatDragged.selected = false;
        if (slot && slot.element == null && slot.occupied == false && whatDragged.item.type != "propulsion") {
            placeElement(slot, whatDragged);
        }

        else if (thrust && thrust.element == null && thrust.occupied == false && whatDragged.item.type == "propulsion") {
            placeElement(thrust, whatDragged);
        }
        else if (escslot && escslot.element == null && escslot.occupied == false && whatDragged.item.type != "propulsion") {
            placeElement(escslot, whatDragged);
        }
        else if (escthrust && escthrust.element == null && escthrust.occupied == false && whatDragged.item.type == "propulsion") {
            placeElement(escthrust, whatDragged);
        }

        else if (slot && slot.element.item.type == whatDragged.item.type){
            repair(slot, whatDragged);
        }
        else if (thrust && thrust.element.item.type == whatDragged.item.type){
            repair(thrust, whatDragged);
        }
        else if (escslot && escslot.element.item.type == whatDragged.item.type){
            repair(escslot, whatDragged);
        }
        else if (escthrust && escthrust.element.item.type == whatDragged.item.type){
            repair(escthrust, whatDragged);
        }
        else
        {
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

function placeElement(slot, element)
{
    element.x = slot.x - (slot.width - element.width);
    element.y = slot.y - (slot.height - element.height);
    element.slot = slot;
    slot.addElement(element);
    items.splice(items.indexOf(element),1);
    element.setInUse();
}

function repair(slot, element)
{
    var index = items.indexOf(element);
    slot.element.durab += element.durab;
    console.log(slot.element.durability);
    var splicedPart = items.splice(index, 1)[0];
    var randomPart = randomElement(parts);
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
            var dragElement = new Element(randomPart, randomPart.src, 50, 50, canvas.width + (Math.random()*1000), 600 * Math.random());
            items.push(dragElement);
        }
    };

    this.update = function(speed) {
        for (var j = 0; j < items.length; j++) {
            if (!items[j].inUse && !items[j].selected) {
                items[j].x -= Math.random() * speed;
                if (items[j].x <= -50) {
                    var splicedPart = items.splice(j, 1)[0]; //extract from the array
                    //console.log(splicedPart);
                    var generateNewItem = true;
                    if(distance > 200)
                    {
                        var rand = Math.random() * distance;
                        if (rand > 150)
                        {
                            generateNewItem = false;
                        }
                    }
                    if(generateNewItem)
                    {
                        var randomPart = randomElement(parts);
                        items.push(new Element(randomPart, randomPart.src, 50, 50, canvas.width +(Math.random()*1000), 600 * Math.random()));
                        //console.log("NEW!");
                    }
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
