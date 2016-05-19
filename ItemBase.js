
//Item([consumable/part/vanity, name, durability value, src)
//returns an object item
function Item(type, name, durability, src){
	this.type = type;
	this.name = name;
	this.durability = durability;
	this.maxDurability = durability;
	this.damageLevel = 0;
	this.src = src;

	this.updateDurab = function(){
		this.durability --;
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

//fix a part by dragging a part onto another that is already slotted into the ship
function fix(part1, part2){
	elements.splice(indexOf(part2), 1);
	part1.durability += part2.value;
	this.image = new image;
	this.image.src = src;
}
