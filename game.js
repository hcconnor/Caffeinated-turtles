var items = new Array();
var theShip = null;
var parts_buffer= [];
var distance = 0;
var fuel = 1000;
var happiness = 1000;
var durability = 1000;
var speed = 4;

var lose = false;

var playerNum = 0;
//var players = [new player("Bob", null)];

var states = {}; //implement cleanup of each state at beginning of new state
// map   ["key"]  =  the thing;
states ["main_menu"] = new main_menu();
states ["player_select"] = new player_select();
states ["start_build"] = new start_build();
states ["main_build"] = new main_build();
states ["change_turn"] = new change_turn();
states ["pause"] = new pause();
states ["end_game"] = new end_game();
var currentState = "main_build"; // currently set to main build for prototype
transition_states("main_build");
var debris = debris = new particle_system(12);
debris.init();
var GUI = new gui(700, 550, "GUI/GUI.png");
GUI.init();
//var GUI = new gui(700, 550, durability, fuel, happiness, "GUI/GUI.png");

//Game States -------------------------------------------------------------------------------------------------------//

//call this to change to next state
function transition_states(nextState){
	//perform cleanup here
	currentState = nextState;
    states[currentState].begin();
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
    this.begin = function()
    {

    };
	this.update = function() {
		//create 4 buttons for each player number choice
	};
	this.draw = function() {

	};
}

//Player 1 starts building for a set amount of time
function start_build() {
    this.begin = function()
    {

    };
	this.update = function() {

	};
	this.draw = function() {

	};
}

//Rounds for each player
function main_build() {
    this.begin = function()
    {
        // this.items = [];
        //items.push(new Element("test_item", "sprites/fire_extinguisher.png", 50, 50, 400, 400));
        //items.push(new Element("test_item", "sprites/storage.png", 50, 50, 200, 200))
        //this.theShip = new ship(0,0);
				debris = new particle_system(12);
				debris.init();
				theShip = new ship(0,0);
    };

	this.update = function() {
        for(let item of items)
        {
            item.update();
        }
				debris.update(speed);
        theShip.update();
				LifeTime(theShip);
				if (happiness <= 0) {
					happiness = 0;
					lose = true;
					end_game();
				}
	};
	this.draw = function() {
        canvas.width = canvas.width;
				context.fillRect(0,0,canvas.width,canvas.height);
        theShip.draw();
				GUI.draw();
        for(let item of items)
        {
            item.draw();
        }
	};
}

//Players turn transition
function change_turn() {
    this.begin = function()
    {

    };

}

//Pause / resume, stops update (TURN THIS INTO A GLOBAL VARIABLE THAT HALTS ALL UPDATES)
function pause() {
    this.begin = function()
    {

    };

}

//Win, loss, end game states
function end_game() {
		if(lose == true) console.log("Y'ALL FUCKED UP LOL")
    this.begin = function()
    {
    };

}

setInterval(state_manager, 30);
