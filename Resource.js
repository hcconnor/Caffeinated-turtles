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
  particle.X = Math.random() * canvas.width;
  particle.Y = 0;
  particle.s = 0.4 + Math.random() * 0.5; //speed
}
//function randomize(fire) {
  //fire.X = Math.random() * canvas.width;
  //fire.Y = 0;
  //fire.s = 0.4 + Math.random() * 0.5; //speed
}

//left and right keypush event handlers
document.onkeydown = function(event) {
  if (event.keyCode == 68) {
    block.X += bS;
    if (block.X >= canvas.width - block.width) {
      anime = false;
      alert("Score is: " + totalScore);
    }
  } else if (event.keyCode == 65) {
    block.X -= bS;
    if (block.X <= 0) {
      anime = false;
      block.X = 0;
    }
  }
}

function animation() {
  if (anime) {
    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];
      particle.Y += particle.s;
      if (collision(particle, block)) {
        totalScore += 5;
        randomize(particle);
      }
      // move particles down

      if (particle.Y > canvas.height) {
        randomize(particle);
      }
    } 
    draw();
    requestAnimationFrame(animation);
  }
}

function collision(a, b) {
  return !(b.X > a.X + a.width || b.X + b.width < a.X || b.Y > a.Y + a.height || b.Y + b.height < a.Y);
}

var bg = new Image();
bg.width = canvas.width
bg.height = canvas.height;
bg.src = "http://i.imgur.com/00k9Yow.gif";
bg.X = 0;
bg.Y = 0;

var picP = new Image();
picP.width = 20;
picP.height = 20;
picP.src = "http://i.imgur.com/r0sPSFb.png";

var fire = new Image();
fire.width = 40;
fire.height = 30;
fire.src = "http://i.imgur.com/dbYLx8y.png";

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // particles
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    ctx.drawImage(particle, particle.X, particle.Y, particle.width, particle.height);
    //particles.rotate(20*Math.PI/180);  
  }
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
//setInterval(onEnterFrame, 30);
