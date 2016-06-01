function calcLittleShipPos(Ship, spd, distance, lineWidth){
  var position = 400;
  //Calculated little ship position here
  return position;
}

function littleShip(src,y,height,width){
  this.image = new Image();
  this.image.src = src;
  this.y = y;
  this.x = calcLittleShipPos(this, currentSpeed, 100000, 900);
  this.height = height;
  this.width = width;

  this.update = function(){
    this.x = calcLittleShipPos(this, currentSpeed, 100000, 900);
  }

  this.draw = function(){
    context.drawImage(this.image,this.x,this.y,this.width,this.height);
  }
}
