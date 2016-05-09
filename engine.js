var canvas = document.getElementById('RocketRush');
var context = canvas.getContext('2d');
var whatDragged = null;

canvas.addEventListener("mousemove", moveElement);
canvas.addEventListener("mousedown", selectElement);
canvas.addEventListener("mouseup", deselectElement);

var unlocked = {};
var playElements = {};

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
			//Successful select
		}
	});
	whatDragged = null;
}


