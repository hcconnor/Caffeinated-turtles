//work please?
function star() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius =  Math.random() * 5;
    this.speed =  Math.random() * 0.9;
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
    var i = this.particleStar.length;
    while (i) {
      i -= 1;
      //console.log(this.particleStar[0]);
      if (this.particleStar[i].x > 0) {
        this.particleStar[i].x -= this.particleStar[i].radius * 0.5;
      } else {
        this.particleStar[i].x = canvas.width;
        this.particleStar[i].y = Math.random() * canvas.height;
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

      context.fillStyle = "orange";
      context.beginPath();
      context.arc(par.x, par.y, par.radius, Math.PI * 2, false);
      context.stroke();
      context.fill();
    }
  }
}
