$.getScript("engine.js", function() {
	console.log("Game engine loaded");
});
$.getScript("ItemBase.js", function() {
	console.log("Draggables loaded");
});
$.getScript("ShipLifetime.js", function() {
	console.log("Ship loaded");
});

var bigShip = null;

var playerNum = 0;
var players = ["player_1", "player_2", "player_3", "player_4"];

var states = {}; //implement cleanup of each state at beginning of new state
states.push(new main_menu());
states.push(new player_select());
states.push(new start_build());
states.push(new main_build());
states.push(new change_turn());
states.push(new pause());
states.push(new end_game());
var currentState = 3; // currently set to main build for prototype

var sprites = {};
var sources = {};

function loadContent() {
	
	sources.push("sprites/test_object.png");
	sources.push("sprites/test_box.png");
	
	for ( i = 0; i < sources.length; i++) {
		sprites[i] = new Image();
		$(sprites[i]).attr("src", sources[i]);
	}
	bigShip = new mainShip(sprites[0], canvas.width/2, canvas.height/2);
}
loadContent();

//Game States -------------------------------------------------------------------------------------------------------//

//call this to change to next state
function transition_states(nextState){
	//perform cleanup here
	currentState = nextState;
}

function state_manager() {
	states[currentState].update();
	states[currentState].draw();
}

//On load, starts with main menu
function main_menu() {
	this.update = function() {

	};
	this.draw = function() {

	};
}

//"PLAY" option on main menu switches to player select state, brings up options for number of players
function player_select() {
	this.update = function() {
		//create 4 buttons for each player number choice
	};
	this.draw = function() {

	};
}

//Player 1 starts building for a set amount of time
function start_build() {
	this.update = function() {

	};
	this.draw = function() {

	};
}

//Rounds for each player
function main_build() {
	this.update = function() {

	};
	this.draw = function() {

	};
}

//Players turn transition
function change_turn() {

}

//Pause / resume, stops update
function pause() {

}

//Win, loss, end game states
function end_game() {

}

setInterval(state_manager, 30);
