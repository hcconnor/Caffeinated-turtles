var items = new Array();
var buttons = [];

var theShip = null;
var parts_buffer = [];
var distance = 0;
var currentSpeed = 0;
var fuel = 0;
var happiness = 1000;
var durability = 1000;
var lose = false;
var FRAME = 30;
var turnLength = FRAME * 30;
var playerNum = 0;

var changeBanner = null;
var decceleration = 0.1;

var sadRate = 1;

var energyCons = 0;

var players = [];
var playerNum = 0;
var currentPlayer = null;

var crew = []
var theCrew = null;
var roomPath = [];

var theStarSystem = null;

var audioManager = new soundFX();
var mute = false;
var statManager = new status();

var states = {}; //implement cleanup of each state at beginning of new state
// map   ["key"]  =  the thing;
states["main_menu"] = new main_menu();
states["player_select"] = new player_select();
states["start_build"] = new start_build();
states["main_build"] = new main_build();
states["change_turn"] = new change_turn();
states["pause"] = new pause();
states["end_game"] = new end_game();
var currentState = "player_select"; // currently set to main build for prototype
var lastState = null;
transition_states(currentState);

var GUI = new gui(1050, 760, "GUI/GUI.png");
GUI.init();


//Player Object -------------------------------------------------------------------------------------------------------//
function Player(Name) {
    this.win = false;
    this.name = Name;
    this.escPod = null;
    this.nextPlayer = 0;
}

//Game States -------------------------------------------------------------------------------------------------------//

//call this to change to next state
function transition_states(nextState) {
    //perform cleanup here
    if (!mute) audioManager.play(audioManager.transition);
    lastState = currentState;
    currentState = nextState;
    states[currentState].begin();
}

function state_manager() {
    states[currentState].update();
    states[currentState].draw();
}

//Use this function to set up a new game
function init_game() {
    debris = new particle_system(50);
    debris.init();
    theShip = new mainShip(0, 0, "sprites/BigShip.png");
    currentPlayer = players[0];
    nodeTree();
    theCrew = new initCrew(10);
    theStarSystem = new starSystem(100);
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
        buttons = [new button("2", canvas.width / 2, canvas.height / 3, 100, 100), new button("3", canvas.width / 3, 2 * canvas.height / 3, 100, 100),
            new button("4", 2 * canvas.width / 3, 2 * canvas.height / 3, 100, 100)
        ];
        canvas.addEventListener("mousedown", button_select);

        function button_select(e) {
            for (let Button of buttons) {
                if (checkBounds(Button, e.clientX, e.clientY)) {
                    playerNum = parseInt(Button.text);
                    for (i = 0; i < playerNum; i++) {
                        players.push(new Player(i));
                        players[i].escPod = new escPod(50, 650, "sprites/escape_pod.png");
                        players[i].nextPlayer = i + 1;
                        console.log(players);
                    }
                    canvas.removeEventListener("mousedown", button_select);
                    Button.click(transition_states, "start_build");
                }
            }
        }
    };
    this.update = function() {
        //create 4 buttons for each player number choice

    };
    this.draw = function() {
        for (let Button of buttons) {
            Button.draw();
        }
    };
}

//Player 1 starts building for a set amount of time <---------------------------------START THIS SOMETIME SOON
function start_build() {
    this.begin = function() {
        buttons = null;
        init_game(); // <------------------------ Move this somewhere else in the future
        console.log("start_build");
        document.addEventListener("keydown", pauseKey);

        function pauseKey(e) {
            if (e.keyCode == 80 && currentState != "pause") transition_states("pause");
        }
        transition_states("main_build");
    };
    this.update = function() {
        distance += .01 * currentSpeed;
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
        theStarSystem.update();
        debris.update(10 + currentSpeed);
        theShip.update();

        if (happiness < 300 && !mute) audioManager.play(audioManager.panic);
        else if (happiness >= 300 || mute) audioManager.stop(audioManager.panic);

        if (durability < 200 && !mute) audioManager.play(audioManager.klaxon);
        else if (durability >= 200 || mute) audioManager.stop(audioManager.klaxon);

        if (currentSpeed > 0 && !mute) audioManager.play(audioManager.engine);
        if (currentSpeed == 0 || mute) audioManager.stop(audioManager.engine);

        for (let item of items) {
            item.update();
        }

        for (let member of theCrew) {
            member.update();
        }

        if (happiness < 0) {
            checkLoss();
            happiness = 0;
        } else if (happiness > 1000) {
            happiness = 1000;
        }

        if (durability < 0) {
            checkLoss();
            durability = 0;
        } else if (durability > 1000) {
            durability = 1000;
        }

        this.timer.update();

        if (this.timer.counter == turnLength) {
            transition_states("change_turn");
        }
        distance += .01 * currentSpeed;
        checkWin();

    };
    this.draw = function() {
        canvas.width = canvas.width;
        context.fillRect(0, 0, canvas.width, canvas.height);
        theStarSystem.draw();
        GUI.draw();
        theShip.draw();
        currentPlayer.escPod.draw();
        for (let member of theCrew) {
            member.draw();
        }
        for (let item of items) {
            item.draw();
        }
        //context.fillRect(0,0 canvas.width, canvas.height);
    };
}

//Players turn transition
function change_turn() {
    this.begin = function() {

        changeBanner = new banner(canvas.width, 250, 700, 200,"GUI/NewPlayer.png");

        console.log("turn changed");
        if (currentPlayer.nextPlayer >= playerNum) {
            currentPlayer = players[0];
        } else currentPlayer = players[currentPlayer.nextPlayer];
        console.log(currentPlayer);
        canvas.removeEventListener("mousemove", moveElement);
        canvas.removeEventListener("mousedown", selectElement);
        canvas.removeEventListener("mouseup", deselectElement);
        canvas.addEventListener("mousedown", function() {
            transition_states("main_build");
        });
    };
    this.draw = function() {
      changeBanner.draw();
    }
    this.update = function() {
      changeBanner.update();
    }
}

//Pause / resume, stops update (TURN THIS INTO A GLOBAL VARIABLE THAT HALTS ALL UPDATES)
function pause() {
    this.begin = function() {
        canvas.removeEventListener("mousemove", moveElement);
        canvas.removeEventListener("mousedown", selectElement);
        canvas.removeEventListener("mouseup", deselectElement);
        canvas.addEventListener("mousedown", button_select);
        buttons = [new button("Resume", canvas.width / 3, canvas.height / 2, 200, 100), new button("Main Menu", 2 * canvas.width / 3, canvas.height / 2, 200, 100), new button("Mute", canvas.width / 2, 2 * canvas.height / 3, 100, 100)];

        function button_select(e) {
            for (let Button of buttons) {
                if (checkBounds(Button, e.clientX, e.clientY)) {
                    console.log("beep")
                    if (Button.text == "Resume") {
                        canvas.removeEventListener("mousedown", button_select);
                        console.log(lastState);
                        Button.click(transition_states, lastState);
                    }
                    if (Button.text == "Main Menu") {} //Button.click(transition_states, "main_menu");
                    if (Button.text == "Mute") mute = !mute;
                }
            }
        }
    };
    this.draw = function() {
        context.globalAlpha = 0.2;
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        for (let Button of buttons) {
            Button.draw();
        }
    };
    this.update = function() {

    };
}

function banner(x,y,width,height,src){
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.image = new Image();
  this.image.src = src;

  this.update = function(){
  var threshold = 10;
    if(Math.abs(canvas.width-this.width-this.x) < 10);
    else if(this.x > canvas.width-this.width) this.x -= threshold;
  };

  this.draw = function(){
    context.drawImage(this.image,this.x,this.y,this.width,this.height);
  };
}

//Win, loss, end game states
function end_game() {
    this.begin = function() {
        canvas.removeEventListener("mousemove", moveElement);
        canvas.removeEventListener("mousedown", selectElement);
        canvas.removeEventListener("mouseup", deselectElement);
        canvas.addEventListener("mousedown", button_select);
        /*for(let sound in audioManager){
          console.log(sound);
          if(audioManager.hasOwnProperty(sound)){
            audioManager.stop(sound);
          }
        }*/

        buttons = [new button("Main Menu", canvas.width / 2, canvas.height - 100, 200, 100)];
        this.winType = null;
        if(checkWin()) this.winType = new group_victory();
        else if(checkLoss()) this.winType = new single_victory();
        else this.winType = new defeat();

        function button_select(e) {
            for (let Button of buttons) {
                if (checkBounds(Button, e.clientX, e.clientY)) {
                    console.log("beep");
                    canvas.removeEventListener("mousedown", button_select);
                    //Button.click(transition_states, "main_menu");
                }
            }
        }
    };

    this.update = function() {

    };

    this.draw = function() {
        canvas.width = canvas.width;
        this.winType.draw();
        for(let Button of buttons){
          Button.draw();
        }
    };
}

setInterval(state_manager, FRAME);
