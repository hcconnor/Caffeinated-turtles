
//Item(x coordinate, y coordinate, height, width, sprite image, [consumable/part/vanity, health benefit, name)
//returns an object item
function Item(image, type, level, name, durability){
	this.image = image;
	this.height = image.height;
	this.width = image.width;
	this.type = type;
	this.level = level;
	this.name = name;
	this.durability = durability;
}
