var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// ASCII key code WASD
//var RIGHT_KEY_CODE = 68;
//ar LEFT_KEY_CODE = 65;

var anime = false;

// particles (stars, w/ temp sprites)
var pW = 15;
var pH = 15;
var pTotal = 10;
var particles = [];
//var fires = [];

function randomize(particle) {
  particle.X = canvas.width;
  particle.Y = Math.random() * canvas.height;
  particle.s = 0.4 + Math.random() * 0.5; //speed
}

function animation() {
  if (anime) {
    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];
      particle.Y += particle.s;
      if (particle.X < 0) {
        randomize(particle);
      }
    }
    draw();
    requestAnimationFrame(animation);
  }
}

//function collision(a, b) {
  //return !(b.X > a.X + a.width || b.X + b.width < a.X || b.Y > a.Y + a.height || b.Y + b.height < a.Y);
//}

var picP = new Image();
picP.width = 20;
picP.height = 20;
picP.src = "http://i.imgur.com/r0sPSFb.png";

//var fire = new Image();
//fire.width = 40;
//fire.height = 30;
fire.src = "http://i.imgur.com/dbYLx8y.png";

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // background
  //ctx.drawImage(bg, bg.X, bg.Y, bg.width, bg.height);
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  // particles
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    ctx.drawImage(particle, particle.X, particle.Y, particle.width, particle.height);
    //particles.rotate(20*Math.PI/180);
  } 
}

function onEnterFrame(){
	randomize();
	animation();
	draw();
}
	
// START
$("#start").click(function() {
  for (var p = 0; p < 5; p++) {
    var pic = new Image();
    pic.src = "http://i.imgur.com/r0sPSFb.png";
    pic.X = Math.random() * canvas.width;
    pic.Y = Math.random() * canvas.height;
    pic.s = 0.2;
    pic.width = 20;
    pic.height = 20;
    particles.push(pic);
  }
  //console.log(particles);
  totalScore = baseScore;
  block.x = 0;
  for (var i = 0; i < particles.length; i++) {
    // randomize(particles[i]);
  }
  if (!anime) {
    anime = true;
    animation();
  };
});

setInterval(onEnterFrame, 30);




















