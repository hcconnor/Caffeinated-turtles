function checkWin() {
    var allWin = false;
    if (distance >= 100000) {
        for (let Player of players) {
            Player.win = true;
        }
        if (currentState != "end_game") transition_states("end_game");
        console.log(allWin);
        allWin = true;
    }
    return allWin;
}

function highScore() {
    var highest = players[0];
    for (let player of players) {
        if (player.escPod.calcScore() > highest.escPod.calcScore()) highest = player;
        player.escPod.getVanity();
    }
    if (highest.escPod.calcScore() >= 0) {
        highest.win = true;
    }
    return highest.escPod.calcScore();
}

function checkLoss() {
    if (happiness <= 0 || durability <= 0 || fuel <= 0 && distance >= 2000) {
        if (currentState != "end_game") transition_states("end_game");
        if (highScore() >= 0) {
            if (happiness <= 0) return "Mutiny";
            else return true;
        } else {
            return false;
        }
    }
}

function group_victory() {
    this.image = new Image();
    this.image.src = "sprites/group_victory.png";
    this.text = ["Humanity has accomplished what it has by working together, and this voyage was no different.", "Together, the Captains and their crew survived the dark void of deep space. The crew rejoiced,", "for when all seemed lost, Alpha Centauri loomed in the distance. They settled on a green and blue", "world, not at all unlike the home they fled. From there they lived long and prosperous lives, starting anew..."];
    console.log("group_victory");

    this.draw = function() {
        context.drawImage(this.image, 0, 0);
        text_box(this.text);
    }
}

function single_victory(players) {
    this.image = new Image();
    this.player = players[0];
    this.item = null;
    this.item = this.player.vItem;
    buttons.push(new button("Next", canvas.width - 250, canvas.height / 5, 200, 100));
    canvas.addEventListener("mousedown", next_end);
    console.log(this.item);
    this.image.src = "sprites/single_victory.png";
    this.text = ["Player " + this.player.name + " survived the destruction of the Genesis by jettisoning off", "in an escape pod. They landed on a remote planet,", "living the rest of their life out with their " + this.item +"."];

    function next_end(e){
      var state = states["end_game"].winType;
      for(let Button of buttons){
        if(checkBounds(Button, e.clientX, e.clientY) && Button.text == "Next"){
          if (state.player.nextPlayer >= playerNum) {
              console.log(state)
              state.player = players[0];
              state.item = players[0].escPod.vItem;
              state.text = ["Player " + state.player.name + " survived the destruction of the Genesis by jettisoning off", "in an escape pod. They landed on a remote planet,", "living the rest of their life out with their " + this.item +"."];
          }else{
            console.log(state.player);
             state.player = players[state.player.nextPlayer];
             state.item = state.player.escPod.vItem;
             if(state.item == null) state.text = ["Player " + state.player.name + "'s escape pod was not strong enough", "to survive the dark reaches of space. They died horribly."];
             else state.text = ["Player " + state.player.name + " survived the destruction of the Genesis by jettisoning off", "in an escape pod. They landed on a remote planet,", "living the rest of their life out with their " + this.item +"."];
          }
        }
      }
    }

    this.draw = function() {
        context.drawImage(this.image, 0, 0);
        text_box(this.text);
    }
}

function mutiny(playerNum) {
    this.image = new Image();
    this.image.src = "sprites/single_defeat.png";
    this.text = ["The crew of Genesis decided that it was a perfect time for a change in management.", "All " + playerNum + " captains were spaced, never to be seen again."];
    console.log("mutiny");

    this.draw = function() {
        context.drawImage(this.image, 0, 0);
        text_box(this.text);
    }
}

function group_defeat(currentPlayer) {
    this.image = new Image();
    this.image.src = "sprites/group_defeat.png";
    this.text = ["The Genesis exploded due to Player" + currentPlayer.name + "'s' incompetence.  No one survived."];
    console.log("group_defeat");

    this.draw = function() {
        context.drawImage(this.image, 0, 0);
        text_box(this.text);
    }
}

function text_box(lines) {
    var panel = new Image();
    panel.src = "GUI/LowerPanel.png";
    context.globalAlpha = 0.6;
    context.drawImage(panel, 0, 0);
    context.globalAlpha = 1;
    context.font = "bold 30px curved-pixel";
    for (var m = 0; m < lines.length; m++) {
      line = lines[m];
      context.fillText(line, 50, 75 + m * 30);
    }
}
