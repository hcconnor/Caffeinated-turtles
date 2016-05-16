
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

function clock(){
	var elaspsed = time - new Date();
	secs =  Math.floor(elapsed / SECOND);
}

//Player ---------------------------------------------------------------------------------//

function player(name, pod){
	this.score = 0;
	this.name = name;
	this.escPod = pod;
}


// Drag and Drop ----------------------------------------------------------------------//
//add funtion with itembase
function Element(name, url, width, height, x, y) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
    this.inUse = false;
    this.sprite = new SpriteSheet(url, this.width, this.height, 4);
    this.sprite.setFrameRange(0,10);

    this.setInUse = function()
    {
        this.inUse = true;
        this.sprite.setFrameRange(0,0);
    }
    this.unSetInUse = function()
    {
        this.inUse = false;
        this.sprite.setFrameRange(0,10);
    }
    this.update = function()
    {
        this.sprite.update();
        //console.log("X:" + this.picture.X +"Y:"+ this.picture.Y + this.picture.width + this.picture.height);
    };

    this.draw = function()
    {
        this.sprite.draw(this.x, this.y);
    };
}

// function unlockElement(element) {
// 	if (!unlocked.has(element)) {
// 		element.picture.X = 820;
// 		element.picture.Y = unlocked.size * 50 + 10;
// 		unlocked.add(element);
// 	}
// }

function selectElement(e) {
	// for(let ef of unlocked){
	// 	if (checkBounds(ef.picture, e.clientX, e.clientY)) {
	// 		whatDragged = new Element(ef.name, ef.picture.src, ef.picture.X, ef.picture.Y);
	// 		items.push(whatDragged);
	// 	}
	// });

	//select element from array of elements on screen
	for(var i = 0; i < items.length; i++){
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
	if (slot)
    {
        whatDragged.x = slot.x - (slot.width - whatDragged.width);
        whatDragged.y = slot.y - (slot.height - whatDragged.height);
        slot.addElement();
        whatDragged.setInUse();
    }
    else
    {
        whatDragged.unSetInUse();
    }
	whatDragged = null;
}

function checkBounds(object, mouseX, mouseY)
{
	if((mouseX < (object.x + object.width)) && (mouseY < (object.y + object.height)) && (mouseX > (object.x)) && (mouseY > (object.y)))
  {
  return true;
  }

  else
  {
  return false;
  }
}




function collisionList(object, array)
{
    for(var i = 0; i < array.length; i++)
    {
        if (doesCollide(object, array[i]))
        {
            return array[i];
        }
    }
    return false;
}

function doesCollide(obj1, obj2)
{
    sX = obj1.x;
    sW = obj1.width;
    sY = obj1.y;
    sH = obj1.height;
    oX = obj2.x;
    oY = obj2.y;
    oW = obj2.width;
    oH = obj2.height;

    if (sX < oX + oW && sX + sW > oX && sY < oY + oH && sH + sY > oY)
    {
        return true;
    }
    return false;
}

// Sprite sheet code (don't use frame 0) ----------------------------------------------------------------------------------//

function SpriteSheet (url, frameWidth, frameHeight, frameSpeed)
{
	var image = new Image();
  var numFrames;

  var currentFrame = 1;
  var counter = 0;
  this.startFrame = 1;
  this.endFrame = 1;
  var animationL = this.endFrame - this.startFrame;
  image.src = url;

  image.onload = function(){
  	numFrames = Math.floor(image.width / frameWidth);
  };

  this.setFrameRange = function(start, finish)
  {
  	this.startFrame = start;
    this.endFrame = finish;
    currentFrame = this.startFrame;
    animationL = this.endFrame - this.startFrame;
  };

  this.update = function(){
  	if(counter == (frameSpeed - 1))
    {
      if(currentFrame == this.endFrame)
    	{
    		currentFrame -= animationL;
    	}
      else
      {
    		currentFrame = (currentFrame + 1) % this.endFrame;
      }
    }

      counter = (counter + 1) % frameSpeed;
  };

	this.draw = function(x, y)
  {
  	var row = Math.floor(currentFrame / numFrames);
    var col = Math.floor(currentFrame % numFrames);
		context.drawImage(image, col*frameWidth, row*frameHeight, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
  };

}
