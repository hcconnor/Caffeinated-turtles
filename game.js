$.getScript("engine.js", function(){
	console.log("Game engine loaded");
});
$.getScript("ItemBase.js", function(){
	console.log("Draggables loaded");
});
$.getScript("ShipLifetime.js", function(){
	console.log("Ship loaded");
});

var players = [player_1, player_2, player_3, player_4];
var sprites = {};
var sources = {};

function loadContent(){
	sources.push("sprites/test_object.png");
	sources.push("sprites/test_box.png");
	
	for(i = 0; i < sources.length; i++){
		sprites[i] = new Image();
		$(sprites[i]).attr("src", sources[i]);
	}
}

//Game States -------------------------------------------------------------------------------------------------------//

function state_manager(){
	
}

//On load, starts with main menu
function main_menu(){
	this.update = function(){
		
	};
	this.draw = function(){
		
	};
}

//"PLAY" option on main menu switches to player select state, brings up options for number of players
function player_select(){
	this.update = function(){
		
	};
	this.draw = function(){
		
	};
}

//Player 1 starts building for a set amount of time
function start_build(){
	this.update = function(){
		
	};
	this.draw = function(){
		
	};
}

//Rounds for each player
function main_build(){
	this.update = function(){
		
	};
	this.draw = function(){
		
	};
}

//Players turn transition
function change_turn(){

}

//Pause / resume
function pause(){

}

//Win, loss, end game states
function end_game(){
	
}

setInterval(main_build, 30);
