//contains astronaut object and pathfinding AI
function astronaut(state, roomStart, url){
  this.state = state;
  this.room = roomStart;
  this.x = this.room.x;
  this.y = this.room.y;
  this.src = url;

  this.newState = function(){
    this.state  = Math.floor(Math.random()*10);
    if(this.state == 0){
      if(happiness < 30){
        //panic
        console.log("AAHHH");
      }else
        this.state = 1;
    }else if(this.state > 8){
      this.newRoom();
    }else {
      //do nothing
      console.log("idle");
    }
  }

  this.newRoom = function(){
    var temp = Math.floor(Math.random()*len(this.room.children));
    this.room = this.room.children[temp];
    this.x = this.room.x;
    this.y = this.room.y;
  }

  this.update = function(){
    this.newState();
  }
  this.draw = function(){

  }
}
