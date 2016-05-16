var anime = false;

var particles = {};
var pW = 30;
var pH = 30;
var pTotal = 10;

var picP = new Image();
picP.width = 20;
picP.height = 20;
picP.src = "http://i.imgur.com/r0sPSFb.png";

// test function
function spriteImage(){
	sources.push("http://i.imgur.com/r0sPSFb.png") // color wheel test sprite
	sources.push("http://i.imgur.com/x3cSD4r.png") // star token test sprite
	for (var i = 0; sources.length; i++) {
		var test = 0;
	}
}

// will need to reference Item from ItemBase JK (that holds content)
// will need to reference Element, (holds src)
// hash table, map?

// map (JS)
var items = {};
items [""]

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

function collision(a, b) {
  return !(b.X > a.X + a.width || b.X + b.width < a.X || b.Y > a.Y + a.height || b.Y + b.height < a.Y);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // particles
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    ctx.drawImage(particle, particle.X, particle.Y, particle.width, particle.height);
    //particles.rotate(20*Math.PI/180);
  }
}

function onEnterFrame(){
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
	 for (var i = 0; i < particles.length; i++) {
		randomize(particles[i]);
	}
	if (!anime) {
		anime = true;
		animation();
	}
	draw();
}

setInterval(onEnterFrame, 30);
