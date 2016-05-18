var anime = false;

// will need to reference Item from ItemBase JK (that holds content)
// will need to reference Element, (holds src)
// hash table, map?

// map (JS)
var items = {};
items ["rocketThruster"] = new rocketThruster();
items ["fuelTank"] = new oxygenTank();
items ["iceCream"] new iceCream();

//randomize("rocketThruster");

//var sprites = {};
//var sources = {}; already in items program

function randomize(items) {
  items.X = canvas.width;
  items.Y = Math.random() * canvas.height;
  items.s = 0.4 + Math.random() * 0.5; //speed
}

function animation() {
  if (anime) {
    for (var i = 0; i < items.length; i++) {
      var items = itemss[i];
      item.Y += item.s;
      if (item.X < 0) {
        randomize(item);
      }
    }
    draw();
    requestAnimationFrame(animation);
  }
}

//function collision(a, b) {
//  return !(b.X > a.X + a.width || b.X + b.width < a.X || b.Y > a.Y + a.height || b.Y + b.height < a.Y);
//}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // items
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    context.drawImage(item, item.X, item.Y, item.width, item.
	height);
    //particles.rotate(20*Math.PI/180);
  }
}

function onEnterFrame(){
	for (var p = 0; p < 5; p++) {
		var pic = new Image();
		pic.src = "sprites/Thruster.png";
		pic.X = Math.random() * canvas.width;
		pic.Y = Math.random() * canvas.height;
		pic.s = 0.2;
		pic.width = 75;
		pic.height = 75;
		items.push(pic);
	}
	 for (var i = 0; i < items.length; i++) {
		randomize(items[i]);
	}
	if (!anime) {
		anime = true;
		animation();
	}
	draw();
}

setInterval(onEnterFrame, 30);
