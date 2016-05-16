
//Item([consumable/part/vanity, name, durability value, src)
//returns an object item
function Item(type, name, durability, src){
	this.type = type;
	this.level = level;
	this.name = name;
	this.durability = durability;
	this.image = new image;
	this.image.src = src;
}

var thruster = Item.prototype;
thruster.efficiency = 0;

//fix a part by dragging a part onto another that is already slotted into the ship
function fix(part1, part2){
	elements.splice(indexOf(part2), 1);
	part1.durability += part2.value;
	this.image = new image;
	this.image.src = src;
}
