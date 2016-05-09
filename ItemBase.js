
//Item(x coordinate, y coordinate, height, width, sprite image, [consumable/part/vanity, health benefit, name)
//returns an object item
function Item(X, Y, height, width, image, type, value, name){
	this.X = X;
	this.Y = Y;
	this.height = height;
	this.width = width;
	this.image = image;
	this.type = type;
	this.value = value;
	this.name = name;
}