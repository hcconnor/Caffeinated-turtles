function calcLittleShipPos(currentDist,totalDist, lineWidth){
  var position = 0;
  var dist = currentDist;
  var rposition = (dist*lineWidth)/totalDist;
  position += rposition;
  //console.log(position);
  //Calculated little ship position here
  return position;
}

function littleShip(src,y,height,width){
  this.image = new Image();
  this.image.src = src;
  this.y = y;
  this.x = calcLittleShipPos(distance, 10000, 1300);
  this.height = height;
  this.width = width;

  this.update = function(){
    this.x = calcLittleShipPos(distance, 10000, 1300);
  }

  this.draw = function(){
    context.drawImage(this.image,this.x,this.y,this.width,this.height);
    context.fillStyle = "#ffffff";
    context.fillText(distance, this.x, this.Y - 10);
  }
}
