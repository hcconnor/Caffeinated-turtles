var soundFX = function(){
  this.panic = new Audio("sounds/panic.mp3");
  this.menuSelect = new Audio("sounds/menu_select.mp3")

  this.play = function(sound){
    sound.play();
  }

  this.stop = function(sound){
    sound.pause();
    sound.currentTime = 0;
  }
}
