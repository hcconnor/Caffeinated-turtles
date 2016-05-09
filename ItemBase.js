
//Item(x coordinate, y coordinate, height, width, sprite image, type [consumable/(useful stuff like fuel/vanity] of item)
//returns an object item
function Item(X, Y, height, width, image, type){
	this.X = X;
	this.Y = Y;
	this.height = height;
	this.width = width;
	this.image = image;
	this.type = type;
}