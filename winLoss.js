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
  if(happiness <= 0 || durability <= 0 || fuel <= 0){
    if(currentState != "end_game") transition_states("end_game");
    if(highScore() >= 0) return true;
    else{
      console.log("LOSE");
      return false;
    }
  }
}

function group_victory(){
  this.image = new Image();
  this.image.src = "sprites/group_victory.png";

  this.draw = function(){
    context.drawImage(this.image, 0, 0);
    context.fillText("WIN", canvas.width/2, canvas.height/2);
  }
}

function single_victory(){
  this.image = new Image();
  this.image.src = "sprites/single_victory.png";

  this.draw = function(){
    context.drawImage(this.image, 0, 0);
    context.fillText("1 WIN", canvas.width/2, canvas.height/2);
  }
}

function group_defeat(){
  this.image = new Image();
  this.image.src = "sprites/group_defeat.png";

  this.draw = function(){
    context.drawImage(this.image, 0, 0);
    context.fillText("LOSE", canvas.width/2, canvas.height/2);
  }
}
