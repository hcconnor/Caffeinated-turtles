$(function STARS() {
  "use strict";
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  var time = Date.now();
  var deltaTime = 0;
  var fps = 90;

  var particles = [];

  function particle() {
    var that = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 5,
      speed: Math.random() * 0.9
    };

    return that;
  }

  function particleSystem(numParticles) {
    var i = numParticles;
    while (i) {
      particles.push(particle());
      i -= 1;
    }
  }
  particleSystem(100);

  function update() {
    var i = particles.length;
    while (i) {
      i -= 1;

      if (particles[i].x > 0) {
        particles[i].x -= particles[i].radius * 0.5;
      } else {
        particles[i].x = canvas.width;
        particles[i].y = Math.random() * canvas.height;
      }
    }
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    var i = particles.length;
    var par = undefined;
    while (i) {
      i -= 1;
      par = particles[i];

      context.fillStyle = "orange";
      context.beginPath();
      context.arc(par.x, par.y, par.radius, Math.PI * 2, false);
      context.stroke();
      context.fill();
    }
  }

  function gameLoop() {
    var now = Date.now();

    deltaTime += now - time;
    time = now;

    // cap deltaTime to one second to prevent freezing
    if (deltaTime > 1000) {
        deltaTime = 1000;
    }

    while (deltaTime > 1000 / fps) {
      update();

      deltaTime -= 1000 / fps;
    }

    draw();

    window.requestAnimationFrame(gameLoop);
  }
  gameLoop();
}());