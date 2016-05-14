
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

//fix a part by dragging a part onto another that is already slotted into the ship
function fix(part1, part2){
	elements.splice(indexOf(part2), 1);
	part1.durability += part2.value;
}
