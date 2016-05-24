var items = new Array();
var theShip = null;
var parts_buffer = [];
var distance = 0;
var fuel = 1000;
var happiness = 1000;
var durability = 1000;
var lose = false;
var FRAME = 30;
var turnLength = FRAME * 5;
var playerNum = 0;
//var players = [new player("Bob", null)];

var crew = []
var theCrew = null;
var roomPath = [];

var states = {}; //implement cleanup of each state at beginning of new state
// map   ["key"]  =  the thing;
states["main_menu"] = new main_menu();
states["player_select"] = new player_select();
states["start_build"] = new start_build();
states["main_build"] = new main_build();
states["change_turn"] = new change_turn();
states["pause"] = new pause();
states["end_game"] = new end_game();
var currentState = "start_build"; // currently set to main build for prototype
transition_states(currentState);
// var debris = debris = new particle_system(12);
// debris.init();
var GUI = new gui(1000, 750, "GUI/GUI.png");
GUI.init();
//var GUI = new gui(700, 550, durability, fuel, happiness, "GUI/GUI.png");

//Game States -------------------------------------------------------------------------------------------------------//

//call this to change to next state
function transition_states(nextState) {
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
    this.begin = function() {

    };
    this.update = function() {
        //create 4 buttons for each player number choice
    };
    this.draw = function() {

    };
}

//Player 1 starts building for a set amount of time
function start_build() {
    this.begin = function() {
        debris = new particle_system(50);
        debris.init();
        theShip = new mainShip(0, 0, "sprites/BigShip.png");
        nodeTree();
        theCrew = new initCrew(10);
        transition_states("main_build")
    };
    this.update = function() {

    };
    this.draw = function() {

    };
}

//Rounds for each player
function main_build() {
    this.begin = function() {
        this.timer = new Timer();
        canvas.removeEventListener("mousedown", function() {
            transition_states("main_build");
        });
        canvas.addEventListener("mousemove", moveElement);
        canvas.addEventListener("mousedown", selectElement);
        canvas.addEventListener("mouseup", deselectElement);
    };

    this.update = function() {
        for (let item of items) {
            item.update();
        }

        debris.update(10);
        theShip.update();

        for(let member of theCrew){
          member.update();
        }

        if (happiness <= 0) {
            lose = true;
            happiness = 0;
        }

        this.timer.update();

        if (this.timer.counter == turnLength) {
            transition_states("change_turn");
        }
    };
    this.draw = function() {
        canvas.width = canvas.width;
        context.fillRect(0, 0, canvas.width, canvas.height);
        theShip.draw();
        for(let member of theCrew){
          member.draw();
        }
        GUI.draw();
        for (let item of items) {
            item.draw();
        }
    };
}

//Players turn transition
function change_turn() {
    this.begin = function() {
        console.log("turn changed");
        //transition_states("main_build");
        canvas.removeEventListener("mousemove", moveElement);
        canvas.removeEventListener("mousedown", selectElement);
        canvas.removeEventListener("mouseup", deselectElement);
        canvas.addEventListener("mousedown", function() {
            transition_states("main_build");
        });
    };
    this.draw = function() {

    }
    this.update = function() {

    }
}

//Pause / resume, stops update (TURN THIS INTO A GLOBAL VARIABLE THAT HALTS ALL UPDATES)
function pause() {
    this.begin = function() {

    };

}

//Win, loss, end game states
function end_game() {
    if (lose == true) {
        console.log("Lose");
    }
    this.begin = function() {

    };

}

setInterval(state_manager, FRAME);
