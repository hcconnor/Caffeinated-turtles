
//Item(x coordinate, y coordinate, height, width, sprite image, [consumable/part/vanity, health benefit, name)
//returns an object item
function Item(X, Y, image, type, value, name, durability){
	this.X = X;
	this.Y = Y;
	this.image = image;
	this.height = image.height;
	this.width = image.width;
	this.type = type;
	this.value = value;
	this.name = name;
	this.durability = durability;
}