
//Item([consumable/part/vanity, name, durability value, src)
//returns an object item
function Item(type, name, durability, src){
	this.type = type;
	this.name = name;
	this.durability = durability;
	this.maxDurability = durability;
	this.damageLevel = 0;
	this.src = src;
}
//Thruster Prototype
function thruster(type, name, durability, push, src, efficiency){
	Item.call(this, type, name, durability, src);
	this.efficiency = efficiency;
	this.push = push;
}


//fix a part by dragging a part onto another that is already slotted into the ship.  Sets durability back to full
function fix(part1, part2){
	parts_buffer = items.splice(indexOf(part2), 1);
	part1.durability = 100;
}
