function beginTutorial(){
  timer = new Timer(30 * 60);
  items.push(new Element(parts[0][0], parts[0][0].src, 50, 50, canvas.width / 2, canvas.height / 2));
  items.push(new Element(parts[0][1], parts[0][1].src, 50, 50, canvas.width / 2, canvas.height / 2 + 100));
  items.push(new Element(parts[0][2], parts[0][2].src, 50, 50, canvas.width / 2 + 100, canvas.height / 2));
  items.push(new Element(parts[0][3], parts[0][3].src, 50, 50, canvas.width / 2 + 100, canvas.height / 2 + 100));
  items.push(new Element(parts[0][0], parts[0][4].src, 50, 50, canvas.width / 2 + 200, canvas.height / 2 + 100));
  this.phase = "";
  this.phases = [new mouse_over_parts(), new drop(), new consume(), new wait("consume", 40), new wait("resource", 30), new wait("turns", 20),
   new wait("escape_pod", 10)];

  this.update = function(){
    for(let stage of this.phases){
      if(!stage.done){
        stage.check();
        //console.log(stage);
        this.phase = stage.phase;
        return;
      }
    }
  };

  this.draw = function(){
    context.font = "bold 40px curved-pixel";
    for(var i = 0; i < tutLine[this.phase].length; i++)
    {
        line = tutLine[this.phase][i];
        context.fillText(line, 650 , 300 + i*30);
    }
  };
}

var tutLine = {
  "example line": ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
        "begin" : ["Greetings Captain, and welcome aboard! No time", "for pleasantries, we must hurry before things get worse.", "Click on a bit of floating debris to begin."], //Start, click on a part
  "mouse_parts" : ["Excellent! What you see here are parts that you", "can use to repair our ship on our long journey.", "Drag them each into an available slot."], //All parts slot in
         "drop" : ["Marvelous! Your ship will require some form of propulsion", "to move, fuel to fuel that propulsion,", "and some sort of life support to sustain your crew."], //click_to_continue
      "consume" : ["right clicking on a resource pod in a slot will", "benefit the ship in some way, but will destroy the", "resource pod immidiately afterwards."], //Consume resource pod
     "resource" : ["These parts all contribute towards the ships durability,", "fuel, and happiness.  Be careful to not let", "them fall to zero."], //click_to_continue
         "turns": ["Inevitably, you will tire during your long journey.", "Every thirty years or so, the other Captains", "in cryosleep will take over for you."], //Find a way to get playerNum in here later
   "escape_pod" : ["If you are feeling, ah... unsafe... make sure to", "construct a personal escape pod down below.", "It requires the same parts that your ship does in order to function."], //click_to_continue
      "end_tut" : ["That should cover just about everything.", "Best of luck on your jour--"] //explosion sound happens after click
};

function noTutorial(){
  timer = new Timer(30 * 40);
  for(i = 0; i < 10; i++){
    var part = Math.floor(Math.random() * tier1.length);
    items.push(new Element(parts[0][part]), parts[0][part].src, 50, 50, canvas.width * Math.random(), 600 * Math.random());
  }
}

function mouse_over_parts(){
  this.phase = "begin";
  this.done = false;
  this.check = function(){
      if(whatDragged != null){
        this.done = true;
      }
  }
}

function drop(){
  this.phase = "mouse_parts";
  this.done = false;
  this.check = function(){
    for(let item of items){
      console.log(item.inUse);
      if(!item.inUse) return;
    }
    this.done = true;
  };
}


function consume(){
  this.phase = "drop";
  this.done = true;// <--- change this
  this.check = function(){

  };
}

function wait(phase, time){
  this.phase = phase;
  this.done = false;
  this.check = function(){
    //if(states["tutorial"].timer.counter <= time * 30)
    this.done = true;
  };
}
