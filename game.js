$.getScript("engine.js", function(){
	console.log("Game engine loaded");
});

var players = [player_1, player_2, player_3, player_4];

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

//Player 1 starts 
function start_build(){
	this.update = function(){
		
	};
	this.draw = function(){
		
	};
}

function main_build(){
	this.update = function(){
		
	};
	this.draw = function(){
		
	};
}

function change_turn(){

}

function pause(){

}

function end_game(){
	
}
