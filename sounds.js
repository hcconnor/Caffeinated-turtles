var soundFX = function(){
  this.panic = new Audio("sounds/panic.mp3");
  this.menu_select = new Audio("sounds/menu_select.mp3")
  this.explode = new Audio('sounds/explode.wav');
  this.fix = new Audio('sounds/fix.wav');
  this.klaxon = new Audio('sounds/klaxon.wav');
  this.select_item = new Audio('sounds/select_item.wav');
  this.slot_in = new Audio('sounds/slot_in.wav');
  this.transition = new Audio('sounds/transition.wav');
  this.engine = new Audio("sounds/engine.wav");

  this.play = function(sound){
    sound.play();
  }

  this.stop = function(sound){
    sound.pause();
    sound.currentTime = 0;
  }
}
