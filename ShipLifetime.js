//Pass in a ship object ship
//returns 1 value representing that you're still alive
function LifeTime(ship){
	var i;
	var essential = [false, false, false, false];
	$.each(ship.thruster, function(){
		if(ship.thruster[i].type != "thruster"){
			return 0;
		} else if(ship.thruster[i].type == "thruster"){
			essential[0] = true;
			spd += ship.thruster[i].value;
		}
	});
	$.each(ship.misc, function(){
		if(ship.misc[i].type == "thruster"){
			return 0;
		} else if(ship.misc[i].type == "fuel"){
			essential[1] = true;
			Fuel += ship.misc[i].value;
		} else if(ship.misc[i].type == "vanity"){
			Happy += ship.misc[i].value;
		} else if(ship.misc[i].type == "lifeSupport"){
			essential[2] = true;
		} else if(ship.misc[i].type =- "oxygen"){
			essential[3] = true;
		}
	});
	$.each(essential, function(){
		if(essential[i] == false) return 0;
	});
	return 1;
}