//work please?
var colour = ["aqua","yellow","red"];

function star() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * 600;
    this.radius =  Math.random() * 5;
    this.speed =  Math.random() * currentSpeed;
    this.colour = colour[Math.floor(Math.random()*colour.length)];
}

function tutPlanet(x, y, height, width){
  this.x = x;
  this.y = y;
  this.image = new Image();
  this.image.src = "sprites/earth.png";
  this.height = height;
  this.width = width;
  this.update = function(){
    if (tut == false) this.x -= currentSpeed/2;
  }
  this.draw = function(){
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

function starSystem(numparticleStar) {
  this.particleStar = [];
  var i = numparticleStar;
  this.planet = new tutPlanet(0,0,1300,900);
  while (i) {
    this.particleStar.push(new star());
    //console.log(this.particleStar[0]);
    i -= 1;
  }

  this.update = function() {
    this.planet.update()
    var i = this.particleStar.length;
    while (i) {
      i -= 1;
      //console.log(this.particleStar[0]);
      if (this.particleStar[i].x > 0) {
        this.particleStar[i].x -= (this.particleStar[i].radius * currentSpeed);
      } else {
        this.particleStar[i].x = canvas.width;
        this.particleStar[i].y = Math.random() * 600;
      }
    }
  }

  this.draw = function() {
    //context.clearRect(0, 0, canvas.width, canvas.height);

    var i = this.particleStar.length;
    var par = undefined;
    while (i) {
      i -= 1;
      par = this.particleStar[i];

      context.fillStyle = this.particleStar[i].colour;
      context.beginPath();
      context.arc(par.x, par.y, par.radius, Math.PI * 2, false);
      context.stroke();
      context.fill();
    }
    this.planet.draw();
  }
}
