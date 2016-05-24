//contains astronaut object and pathfinding AI
function initCrew(numCrew){
  for(i = 0; i < numCrew; i++){
    crew.push(new astronaut(1,roomPath[3]))
  }
  return crew;
}


function astronaut(state, roomStart){
  this.state = state;
  this.room = roomStart;
  this.x = this.room.x;
  this.y = this.room.y;
  //this.src = url;

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
      console.log(this.room.name);
    }else {
      //do nothing
      console.log(this.room.name);
    }
  }

  this.newRoom = function(){
    var temp = Math.floor(Math.random()*this.room.children.length);
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
