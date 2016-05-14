
//Item([consumable/part/vanity, name, durability value, src)
//returns an object item
<<<<<<< HEAD
function Item(image, type, level, name, durability){
	this.image = image;
	this.height = image.height;
	this.width = image.width;
=======
function Item(type, name, durability, src){
>>>>>>> refs/remotes/origin/itemBase
	this.type = type;
	this.level = level;
	this.name = name;
	this.durability = durability;
<<<<<<< HEAD
=======
	this.image = new image;
	this.image.src = src;
>>>>>>> refs/remotes/origin/itemBase
}
