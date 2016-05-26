//work please?
var colour = ["aqua","yellow","red"];

function star() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * 600;
    this.radius =  Math.random() * 5;
    this.speed =  Math.random() * 0.9;
    this.colour = colour[Math.floor(Math.random()*colour.length)];
}

function starSystem(numparticleStar) {
  this.particleStar = [];
  var i = numparticleStar;
  while (i) {
    this.particleStar.push(new star());
    //console.log(this.particleStar[0]);
    i -= 1;
  }

  this.update = function() {
    var temp = this.speed;
    this.speed = temp + currentSpeed;
    var i = this.particleStar.length;
    while (i) {
      i -= 1;
      //console.log(this.particleStar[0]);
      if (this.particleStar[i].x > 0) {
        this.particleStar[i].x -= this.particleStar[i].radius * 0.5;
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
  }
}
