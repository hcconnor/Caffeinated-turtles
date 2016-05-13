
//Item(x coordinate, y coordinate, height, width, sprite image, [consumable/part/vanity, health benefit, name)
//returns an object item
function Item(X, Y, image, type, level, name, durability){
	this.X = X;
	this.Y = Y;
	this.image = image;
	this.height = image.height;
	this.width = image.width;
	this.type = type;
	this.level = level;
	this.name = name;
	this.durability = durability;
}


//Adds value to spare_parts and moves element to an array for reuse
function recycle(item){
	spare_parts += item.value;
	partsBuffer.push(playElements.splice(indexOf(item), 1));
}

//Increases item durability while subtracting from spare parts
function fix(item, amount){
	spare_parts -= item.value;
	item.durability += amount;
}
