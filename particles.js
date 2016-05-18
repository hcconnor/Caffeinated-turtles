// will need to reference Item from ItemBase JK (that holds content)
// will need to reference Element, (holds src)
// hash table, map?

// can go back to array lol...

function item(x, y){
	this.pic = new Image();
		this.pic.height = 100;
		this.pic.width =  100;
		this.pic.src = "sprites/Thruster.png";
	
	var items = new Array();
	items.push("sprites/Thruster.png");
	items.push("sprites/Storage.png");
	items.push("sprites/Thruster.png");
	items.push("sprites/IceCreamMachine.png");

	function randomize(items) {
		item.X = canvas.width;
		item.Y = Math.random() * canvas.height;
		item.s = 0.4 + Math.random() * 0.5; //speed
		
}
	
}

function animation() {
  if (anime) {
    for (var i = 0; i < items.length; i++) {
      var items = items[i];
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
