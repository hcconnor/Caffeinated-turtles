//DONT BEAUTIFY
var tier1 = [];
tier1.push(new Item("vanity","Ice Cream Machine",100, "sprites/ice_cream_machine.png"));
tier1.push(new thruster("propulsion","Fire Extinguisher",5, "sprites/fire_extinguisher.png", 1));
tier1.push(new Item("life_support", "Oxygen Tank", 100, "sprites/oxygen.png"));
tier1.push(new Item("life_support", "Refridgerator", 100, "sprites/fridge.png"));
tier1.push(new Item("fuel", "Car Battery", 200, "sprites/car_battery.png"));

var tier2 = [];
tier2.push(new Item("life_support","Supply Crate",100, "sprites/Storage.png"));
tier2.push(new Item("fuel","Rocket Fuel Tank", 300, "sprites/rocket_fuel.png"));
tier2.push(new thruster("propulsion","Standard Thruster",10, "sprites/Thruster.png", 2));
tier2.push(new Item("vanity", "Box of Kittens", 100, "sprites/cat_box_strip.png"));

var tier3 = [];
tier3.push(new Item("life_support","Supply Crate",100, "sprites/Storage.png"));
tier3.push(new Item("fuel","Rocket Fuel Tank",400, "sprites/rocket_fuel.png"));
tier3.push(new thruster("propulsion","Standard Thruster",20, "sprites/Thruster.png", 5));

var tier4 = [];
tier4.push(new thruster("propulsion","alien_drive",25, "sprites/alien_drive.png", 10));
tier4.push(new Item("vanity", "alien_artifact", 100, "sprites/tessaract.png"))

var parts = []
parts.push(tier1);
parts.push(tier2);
parts.push(tier3);
parts.push(tier4);


var itemDesc = {
         "example line": ["aaaaaaaaaaaa","aaaaaaaaaaaa","aaaaaaaaaaaa","aaaaaaaaaaaa","aaaaaaaaaaaa","aaaaaaaaaaaa"],
    "Ice Cream Machine": ["Ice Cream"   ,"Machine:"     ,""            ,"Yummy ice"   ,"cream! Feed","the crew."],
    "Fire Extinguisher": ["Short and ", "sweet."],
          "Oxygen Tank": ["It's quite", "heavy."],
        "Refridgerator": ["Still has ", "lefovers", "in it."],
          "Car Battery": ["Once belonged", "to a unique", "DeLorean."],
         "Supply Crate": ["Everything an", "astronaut", "needs."],
     "Rocket Fuel Tank": [""],
    "Standard Thruster": [""],
       "Box of Kittens": [""],
          "alien_drive": [""],
       "alien_artifact": [""]
};
