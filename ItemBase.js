
//Item([consumable/part/vanity, name, durability value, src)
//returns an object item
function Item(type, name, durability, src){
	this.type = type;
	this.level = level;
	this.name = name;
	this.durability = durability;
<<<<<<< HEAD
<<<<<<< HEAD
	this.image = new image;
	this.image.src = src;
=======
}

//fix a part by dragging a part onto another that is already slotted into the ship
function fix(part1, part2){
	elements.splice(indexOf(part2), 1);
	part1.durability += part2.value;
>>>>>>> origin/master
=======
	this.image = new image;
	this.image.src = src;
>>>>>>> origin/master
}
