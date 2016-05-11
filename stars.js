var particles=[];
var pW = 30;
var pH = 30;
var pTotal = 10;

// an obj Particle
// lifetime = how long the obj exists
function Particle(x, y, radius, lifetime) {
	//this.x = canvas.width;
  //this.y = y;
  this.radius = radius;
  this.speed = radius*Math.random()*-0.5;
  this.lifetime = lifetime;
  //this.r = 
}

function particle_system(numParticles){
    for(var i = 0; i < numParticles; i++){
	    particles.push(new Particle(Math.random()*canvas.width, 0, Math.random()*5, Math.random()*5));
   }
}

particle_system(40);

function update(){

	for(var i = 0; i < particles.length; i++){
  	// keep moving if still alive or still on screen
		if(particles[i].lifetime > 0 || particles[i].x < 0){
    	particles[i].x -= particles[i].radius*0.5;
      particles[i].lifetime--;
    } else {
    	// reset particles
      particles[i].x = canvas.width;
      particles[i].lifetime = canvas.height;
      particles[i].y = Math.random()*canvas.height; //will randomize x position
      particles[i].radius
    }
  }
}

function draw(){
	canvas.width = canvas.width;
  context.fillStyle= "black";
  context.fillRect(0,0, canvas.width, canvas.height);
  for(var i = 0; i < particles.length; i++){
  	var par = particles[i];
    
    context.fillStyle = "yellow";
    context.beginPath();
    context.arc(par.x, par.y, par.radius, Math.PI*2, false);
    context.stroke();
    context.fill();
  }
}

function game_loop(){
	draw();
  update();

}

setInterval(game_loop, 30);