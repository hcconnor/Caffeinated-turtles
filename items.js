//DONT BEAUTIFY
var tier1 = [];
tier1.push(new Item("vanity","Ice Cream Machine",100, "sprites/ice_cream_machine.png"));
tier1.push(new thruster("propulsion","Fire Extinguisher",5, "sprites/fire_extinguisher.png", 0.1));
tier1.push(new Item("life_support", "Oxygen Tank", 100, "sprites/oxygen.png"));
tier1.push(new Item("life_support", "Refridgerator", 100, "sprites/fridge.png"));
tier1.push(new Item("fuel", "Car Battery", 200, "sprites/car_battery.png"));

var tier2 = [];
tier2.push(new Item("life_support","Supply Crate",100, "sprites/Storage.png"));
tier2.push(new Item("fuel","Rocket Fuel Tank", 300, "sprites/rocket_fuel.png"));
tier2.push(new thruster("propulsion","Standard Thruster",10, "sprites/Thruster.png", 0.2));
tier2.push(new Item("vanity", "Box of Kittens", 100, "sprites/cat_box_strip.png"));

var tier3 = [];
tier3.push(new Item("life_support","Supply Crate",100, "sprites/Storage.png"));
tier3.push(new Item("fuel","Rocket Fuel Tank",400, "sprites/rocket_fuel.png"));
tier3.push(new thruster("propulsion","Standard Thruster",20, "sprites/Thruster.png", 0.5));

var tier4 = [];
tier4.push(new thruster("propulsion","alien_drive",25, "sprites/alien_drive.png", 1));
tier4.push(new Item("vanity", "alien_artifact", 100, "sprites/tessaract.png"))

var parts = []
parts.push(tier1);
parts.push(tier2);
parts.push(tier3);
parts.push(tier4);


var itemDesc = {
         "example line": ["aaaaaaaaaaaa","aaaaaaaaaaaa","aaaaaaaaaaaa","aaaaaaaaaaaa","aaaaaaaaaaaa","aaaaaaaaaaaa"],
    "Ice Cream Machine": ["Ice Cream"   ,"Machine"     ,"(Vanity)"    ,"We all scream","for Ice","Cream!"],
    "Fire Extinguisher": ["Fire",        "Extinguisher","(Propulsion)","Short and ", "sweet."],
          "Oxygen Tank": ["Oxygen Tank", "(Life Support)", "It's quite",  "heavy."],
        "Refridgerator": ["Refridgerator","(Life Support)","Still has ", "lefovers", "in it."],
          "Car Battery": ["Car Battery", "(Fuel)", "Once powered", "a unique", "DeLorean."],
         "Supply Crate": ["Supply Crate","(Life Support)","Everything", "an astronaut", "needs."],
     "Rocket Fuel Tank": ["Rocket Fuel", "(Fuel)",      "Fly me to the", "Moon..."],
    "Standard Thruster": ["Rocket ",     "Thruster",    "(Propulsion)","The Classic."],
       "Box of Kittens": ["Box of ",     "Kittens",     "(Vanity)",    "Never ending", "fluffiness!"],
          "alien_drive": ["Alien Engine","(Propulsion)","Stolen from", "some poor",   "guy."],
       "alien_artifact": ["Alien",       "Artifact",    "(Fuel)",       "Its faintly", "glowing."],
      "Nitro Thrusters": ["Nitro ",      "Thrusters",   "(Propulsion)","Gotta go ",   "fast!"],
           "Fabricator": ["Fabricator",  "(Life Support)","Home Baked","Cookies for", "days!"],
                "Wi-Fi": ["Wi-Fi",       "(Vanity)",    "Netflix and", "Chill."],
    "Nuclear Generator": ["Nuclear",     "Reactor",     "(Fuel)"     ,"Smells like", "Chernobyl."],
         "Gold Bullion": ["Gold",        "Bullion",     "(Vanity)",   "Here comes", "the Money!"],
                   "TV": ["TV",          "(Vanity)",    "A relic",    "from an old", "age."],
   "Video Game Console": ["Video Game",  "Console",     "(Vanity)",   "It's a",     "PlayBox U."],
        "Shield System": ["Shield System","(Consumable)","Protects",  "from",       "Asteroids."],
        "Backup System": ["Backup System","(Consumable)","Use in case", "of nebula"],
        "Repair Drones": ["Repair Drones","(Consumable)","Repairs all", "parts."],
           "Repair Kit": ["Repair Kit",  "(Consumable)","Repairs a",  "single part."],
          "Speed Boost": ["Speed Boost", "(Consumable)","Greatly",    "increases",  "speed."]
};
