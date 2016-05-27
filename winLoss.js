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

function checkLoss(){
  if(happiness <= 0 || durability <= 0 || fuel <= 0 || lose){
    var highest = players[0];
    for(let player of players){
      if(player.escPod.calcScore() > highest.escPod.calcScore()) highest = player;
    }
    console.log("LOSE");
    if(currentState != "end_game") transition_states("end_game");
    if(heighest.escPod.calcScore() >= 0){
      highest.win = true;
      return heighest;
    }
    else{
      return false;
    }
  }
}

function group_victory(){
  this.image = new Image();
  this.image.src = "";

  this.draw = function(){
    //context.drawImage(this.image, 0, 0);
    context.fillText("WIN", canvas.width/2, canvas.height/2);
  }
}

function single_victory(){
  this.image = new Image();
  this.image.src = "";

  this.draw = function(){
    //context.drawImage(this.image, 0, 0);
    context.fillText("1 WIN", canvas.width/2, canvas.height/2);
  }
}

function defeat(){
  this.image = new Image();
  this.image.src = "";

  this.draw = function(){
    //context.drawImage(this.image, 0, 0);
    context.fillText("LOSE", canvas.width/2, canvas.height/2);
  }
}
