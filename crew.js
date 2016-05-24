//contains astronaut object and pathfinding AI
function initCrew(numCrew){
  for(i = 0; i < numCrew; i++){
    crew.push(new astronaut(1,roomPath[3],"GUI/Happiness.png"))
  }
  return crew;
}


function astronaut(state, roomStart, url){
  this.state = state;
  this.room = roomStart;
  this.x = this.room.x;
  this.y = this.room.y;
  this.moving = false;
  this.speed = 1;
  this.sprite = new Image();
  this.sprite.src = url;

  this.newState = function(){
    if(this.moving == false){
      this.state  = Math.floor(Math.random()*10);

      if(this.state == 0){
        if(happiness < 30){
          //panic
          //console.log("AAHHH");
        }else
          this.state = 1;
      }else if(this.state > 8){
        this.newRoom();
        console.log(this.room.name);
      }else {
        //do nothing
        //console.log(this.room.name);
      }
    }else{
      this.move();
    }
  }
  this.newRoom = function(){
    this.moving = true;
    var temp = Math.floor(Math.random()*this.room.children.length);
    this.room = this.room.children[temp];
  }

  this.move = function(){
    if(this.x == this.room.x && this.y == this.room.y) this.moving = false;
    //console.log("moving");
    if(this.x < this.room.x) this.x += this.speed;
    else if(this.x > this.room.x) this.x -= this.speed;

    if(this.y < this.room.y) this.y += this.speed;
    else if(this.y > this.room.y) this.y -= this.speed;
  }

  this.update = function(){
    this.newState();
  }
  this.draw = function(){
    context.drawImage(this.sprite,this.x-25,this.y-25,50,50);
  }
}
