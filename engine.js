var canvas = document.getElementById('RocketRush');
var context = canvas.getContext('2d');
var whatDragged = null;

canvas.addEventListener("mousemove", moveElement);
canvas.addEventListener("mousedown", selectElement);
canvas.addEventListener("mouseup", deselectElement);

var unlocked = new Set();
var playElements = {};


// Drag and Drop ----------------------------------------------------------------------//

function Element(name, url, combo, width, height) {
	this.name = name;
	this.picture = new Image();
	this.picture.src = url;
	this.picture.X = 0;
	this.picture.Y = 0;
	this.picture.width = width;
	this.picture.height = height;
	this.combo = combo;
}

function unlockElement(element) {
	if (!unlocked.has(element)) {
		element.picture.X = 820;
		element.picture.Y = unlocked.size * 50 + 10;
		unlocked.add(element);
	}
}

function selectElement(e) {
	$.each(playElements, function() {
		if (checkBounds(ef.picture, e.clientX, e.clientY)) {
			whatDragged = new Element(ef.name, ef.picture.src, ef.combo, ef.picture.X, ef.picture.Y);
			playElements.push(whatDragged);
		}
	});
	$.each(playElements, function() {
		if (checkBounds(playElements[i].picture, e.clientX, e.clientY)) {
			whatDragged = playElements[i];
		}
	});
}

function moveElement(e) {
	if (whatDragged) {
		nameText = whatDragged.name;
		whatDragged.picture.X = e.clientX - whatDragged.picture.height / 2;
		whatDragged.picture.Y = e.clientY - whatDragged.picture.width / 2;
	}
}

function deselectElement(e) {
	if (whatDragged.picture.X + 100 > 820)//out of play area
	{
		playElements.splice(playElements.indexOf(whatDragged), 1); //delete element from the play elements
	}
	$.each(playElements, function() {
		sX = whatDragged.picture.X;
		sW = whatDragged.picture.width;
		sY = whatDragged.picture.Y;
		sH = whatDragged.picture.height;
		oX = playElements[i].picture.X;
		oY = playElements[i].picture.Y;
		oW = playElements[i].picture.width;
		oH = playElements[i].picture.height;
		if (sX < oX + oW && sX + sW > oX && sY < oY + oH && sH + sY > oY) {
			// wait for ship object for successful select
		}
	});
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










