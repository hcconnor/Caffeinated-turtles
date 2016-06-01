function calcLittleShipPos(currentDist,totalDist, lineWidth){
  var position = 400;
  var dist = currentDist;
  var rposition = dist/lineWidth;
  position += rposition;
  console.log(position);
  //Calculated little ship position here
  return position;
}

function littleShip(src,y,height,width){
  this.image = new Image();
  this.image.src = src;
  this.y = y;
  this.x = calcLittleShipPos(distance, 100, 900);
  this.height = height;
  this.width = width;

  this.update = function(){
    this.x = calcLittleShipPos(distance, 100, 900);
  }

  this.draw = function(){
    context.drawImage(this.image,this.x,this.y,this.width,this.height);
  }
}
