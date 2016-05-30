function beginTutorial(){
  states["tutorial"].timer = new Timer(30 * 60);
  items.push(new Element(parts[0][0], parts[0][0].src, 50, 50, canvas.width / 2, canvas.height / 2));
  items.push(new Element(parts[0][1], parts[0][1].src, 50, 50, canvas.width / 2, canvas.height / 2 + 100));
  items.push(new Element(parts[0][2], parts[0][2].src, 50, 50, canvas.width / 2 + 100, canvas.height / 2));
  items.push(new Element(parts[0][3], parts[0][3].src, 50, 50, canvas.width / 2 + 100, canvas.height / 2 + 100));
  items.push(new Element(parts[0][0], parts[0][4].src, 50, 50, canvas.width / 2 + 200, canvas.height / 2 + 100));
  this.phase = null;

  this.update = function(){
    if(mouse_over_parts()) phase = "begin";
    else if(drop_part()) phase = "drop";
    else if(resources()) phase = "resource";
    else if(turns()) phase = "turns";
    else if(escape_pod()) phase = "escape_pod"
  };

  this.draw = function(){
    for(var i = 0; i < tutLine[this.phase].length; i++)
    {
        context.fontStyle = "30px curved-pixel"
        line = itemDesc[whatDragged.item.name][i];
        context.fillText(tutLine[this.phase], 550 , 300 + i*30)
    }
  };
}

var tutLine = {
  "example line": ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
        "begin" : ["Greetings Captain, and welcome aboard! No time", "for pleasantries, we must hurry before things get worse.", "Mouse over a bit of floating debris to begin."], //Mouse over
  "mouse_parts" : ["Excellent! What you see here are parts that you," "can use to repair our ship on our long journey.", "Click and drag them into an available slot."], //All parts slot in
         "drop" : ["Marvelous! Your ship will require some form of propulsion", "to move, fuel to fuel that propulsion,", "and some sort of life support to sustain your crew."], //Wait 5 seconds
      "consume" : ["right clicking on a resource pod in a slot will benefit," "the ship in some way, but will destroy the", "resource pod immidiately afterwards."], //Wait 4 seconds
     "resource" : ["These parts all contribute towards the ships durability," "fuel, and happiness.  Be careful to not let", "them fall to zero."], //Wait 4 seconds
         "turns": ["Inevitably, you will tire during your long journey.", "Every thirty years or so, the " + playerNum + " other Captains", "in cryosleep will take over for you."], //Wait 4 seconds
   "escape_pod" : ["If you are feeling, ah... unsafe... make sure to", "construct a personal escape pod down below.", "It requires the same parts that your ship does in order to function."] //Wait 3 seconds
      "end_tut" : ["That should cover just about everything.", "Best of luck on your jour--"] //Triggered 10 seconds before main_build, explosion sound happens
};

function noTutorial(){
  states["tutorial"].timer = new Timer(30 * 60);
  for(i = 0; i < 10; i++){
    var part = Math.floor(Math.random() * tier1.length);
    items.push(new Element(parts[0][part]), parts[0][part].src, 50, 50, canvas.width * Math.random(), 600 * Math.random());
  }
}


function escape_pod(){

}
