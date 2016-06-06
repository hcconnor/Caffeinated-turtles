//contains astronaut object and pathfinding AI
function initCrew(numCrew){
  for(i = 0; i < numCrew; i++){
    crew.push(new astronaut(1,roomPath[Math.floor(Math.random()*roomPath.length)],"sprites/player1.png"));
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
  this.sprite = new SpriteSheet(url, 50, 50, 4);
  this.sprite.setFrameRange(1,1);

  this.newState = function(){
    if(this.moving == false){
      this.state  = Math.floor(Math.random()*10);

      if(this.state > 8){
        if(happiness < 300){
          this.speed  = 5;
          this.panic();
        }
        else if(happiness >= 300){
          this.speed = 1;
          this.newRoom();
        }
      }else {
        //do nothing
        //console.log(this.room.name);
        this.sprite.setFrameRange(1,1);
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

  this.panic = function(){
    this.moving = true;
    var temp = Math.floor(Math.random()*roomPath.length);
    this.room = roomPath[temp];
  }

  this.panicCheck = function(){
    if(happiness < 300){
      if(Math.abs(this.x - this.room.x) < 5 && Math.abs(this.y - this.room.y) < 5) this.moving = false;
    } else if(happiness >= 300) this.speed = 1;
  }

  this.move = function(){
    if(this.x == this.room.x && this.y == this.room.y) this.moving = false;
    this.panicCheck();
    //console.log("moving");
    if(this.x < this.room.x) {
      this.x += this.speed;
      this.sprite.setFrameRange(2,2);
    }
    else if(this.x > this.room.x){
       this.x -= this.speed;
       this.sprite.setFrameRange(7,7);
     }
    if(this.y < this.room.y) this.y += this.speed;
    else if(this.y > this.room.y) this.y -= this.speed;
  }

  this.update = function(){
    this.sprite.update();
    this.newState();
  }
  this.draw = function(){
    this.sprite.draw(this.x-50, this.y-50);
  }
}
