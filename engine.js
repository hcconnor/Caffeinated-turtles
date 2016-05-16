var canvas = document.getElementById('RocketRush');
var context = canvas.getContext('2d');
var whatDragged = null;

canvas.addEventListener("mousemove", moveElement);
canvas.addEventListener("mousedown", selectElement);
canvas.addEventListener("mouseup", deselectElement);

var unlocked = new Set();
//var playElements = {};


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
	this.picture = new Image();
	this.picture.src = url;
	this.picture.X = x;
	this.picture.Y = y;
	this.picture.width = width;
	this.picture.height = height;
    this.update = function()
    {
        //console.log("X:" + this.picture.X +"Y:"+ this.picture.Y + this.picture.width + this.picture.height);
    };

    this.draw = function()
    {
        context.drawImage(this.picture, this.picture.X,
             this.picture.Y,this.picture.width,this.picture.height);
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
		if (checkBounds(items[i].picture, e.clientX, e.clientY)) {
			whatDragged = items[i];
		}
	}
}

function moveElement(e) {
	if (whatDragged) {
		//nameText = whatDragged.name;
		whatDragged.picture.X = e.clientX - whatDragged.picture.width / 2;
		whatDragged.picture.Y = e.clientY - whatDragged.picture.height / 2;

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
        whatDragged.picture.X = slot.picture.X - (slot.picture.width - whatDragged.picture.width);
        whatDragged.picture.Y = slot.picture.Y - (slot.picture.height - whatDragged.picture.height);
    }
	whatDragged = null;
}

function checkBounds(image, mouseX, mouseY)
{
	if((mouseX < (image.X + image.width)) && (mouseY < (image.Y + image.height)) && (mouseX > (image.X)) && (mouseY > (image.Y)))
  {
  return true;
  }

  else
  {
  return false;
  }
}




function collisionList(image, array)
{
    for(var i = 0; i < array.length; i++)
    {
        if (doesCollide(image, array[i]))
        {
            return array[i];
        }
    }
    return false;
}

function doesCollide(image1, image2)
{
    sX = image1.picture.X;
    sW = image1.picture.width;
    sY = image1.picture.Y;
    sH = image1.picture.height;
    oX = image2.picture.X;
    oY = image2.picture.Y;
    oW = image2.picture.width;
    oH = image2.picture.height;

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

  var currentFrame = 0;
  var counter = 0;
  this.startFrame = 0;
  this.endFrame = 0;
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
      if(currentFrame == this.endFrame - 1)
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
