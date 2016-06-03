
//Item([consumable/part/vanity, name, durability value, src)
//returns an object item
function Item(type, value, name, durability, src){
	this.type = type;
	this.name = name;
	this.durability = durability;
	this.maxDurability = durability;
	this.damageLevel = 0;
	this.src = src;
	this.value = value;

	this.updateDurab = function(){
		if(this.durability > 0){
			this.durability --;
		}
		if(this.durability == (this.maxDurability - this.maxDurability/4)){
			this.damageLevel = 1;
		} else if(this.durability == this.maxDurability/2){
			this.damageLevel = 2;
		}else if(this.durability == this.maxDurability/4){
			this.damageLevel = 3;
		}else if(this.durability <= 0){
			this.damageLevel = 4;
		}
	};
}
//Thruster Prototype
function thruster(type, name, durability, src, efficiency){
	Item.call(this, type, name, durability, src);
	this.efficiency = efficiency;
}


//fix a part by dragging a part onto another that is already slotted into the ship.  Sets durability back to full
function fix(part1, part2){
	parts_buffer = items.splice(indexOf(part2), 1);
	part1.durability = 100;
}
