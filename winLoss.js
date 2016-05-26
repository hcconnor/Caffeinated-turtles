function checkWin(){
  if(distance >= 100000) transition_states("end_game");
}

function checkLoss(){
  if(happiness <= 0 || durability <= 0 || fuel <= 0){
    var highest = players[0];
    for(let player of players){
      if(player.escPod.calcScore > highest.escPod.calcScore) highest = player;
    }
    console.log("LOSE");
    return highest;
  }
}

function single_victory(player){
  this.sprite = new Image();
  this.sprite.src = "";
  
}

function group_victory(){

}

function defeat(){

}
