function checkWin(player){
  for(i = 0; i < players.length; i++){
    if(player.score > players[i].score){
      player.win = true;
      
    }
  }
}
