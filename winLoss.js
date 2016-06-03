function checkWin(){
  var allWin = false;
  if(distance >= 100000){
    for(let Player of players){
      Player.win = true;
    }
    if(currentState != "end_game") transition_states("end_game");
    console.log(allWin);
    allWin = true;
  }
  return allWin;
}

function highScore(){
  var highest = players[0];
  for(let player of players){
    if(player.escPod.calcScore() > highest.escPod.calcScore()) highest = player;
  }
  if(highest.escPod.calcScore() >= 0){
    console.log("1 WIN");
    highest.win = true;
  }
  return highest.escPod.calcScore();
}

function checkLoss(){
  if(happiness <= 0 || durability <= 0 || fuel <= 0 && distance >= 2000){
    if(currentState != "end_game") transition_states("end_game");
    if(highScore() >= 0) {
      if(happiness <= 0) return "Mutiny";
      else return true;
    }
    else{
      console.log("LOSE");
      return false;
    }
  }
}

function group_victory(){
  this.image = new Image();
  this.image.src = "sprites/group_victory.png";
  this.text = ["Humanity has accomplished what it has by working together, and this voyage was no different.", "Together, the Captains and their crew survived the dark void of deep space. The crew rejoiced,","for when all seemed lost, Alpha Centauri loomed in the distance. They settled on a green and blue", "world, not at all unlike the home they fled. From there they lived long and prosperous lives, starting anew..."];

  this.draw = function(){
    context.drawImage(this.image, 0, 0);
    text_box(this.text);
  }
}

function single_victory(players){
  this.image = new Image();
  this.image.src = "sprites/single_victory.png";
  this.text = ["[Insert player here] survived the destruction of the (Insert Ship name here) by jettisoning off",  "in an escape pod. They landed on a remote planet, living the rest of their life out with their (insert vanity item here)."];

  this.draw = function(){
    context.drawImage(this.image, 0, 0);
    text_box(this.text);
  }
}

function mutiny(playerNum){
  this.image = new Image();
  this.image.src = "sprites/single_defeat.png";
  this.text = ["The crew of (Insert Ship name here) decided that it was a perfect time for a change in management.", "All " + playerNum + " captains were spaced, never to be seen again."];

  this.draw = function(){
    context.drawImage(this.image, 0, 0);
    text_box(this.text);
  }
}

function group_defeat(){
  this.image = new Image();
  this.image.src = "sprites/group_defeat.png";
  this.text = ["The (Insert Ship name here) exploded due to (Insert death type here).  No one survived."];

  this.draw = function(){
    context.drawImage(this.image, 0, 0);
    text_box(this.text);
  }
}

function text_box(lines){
  var panel = new Image();
  panel.src = "GUI/LowerPanel.png";
  context.drawImage(panel, 0, 640);
  context.font = "bold 30px curved-pixel";
  for(var m = 0; m < lines.length; m++)
  {
      line = lines[m];
      context.fillText(line, 100, 450 + i*30);
  }
}
