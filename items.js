
rocketThruster = new thruster("propulsion","Standard Thruster",100, "sprites/Thruster.png");
rocketThruster.efficiency = 10;

var tier1 = {};
tier1.push(new Item("vanity","Ice Cream Machine",100, "sprites/IceCreamMachine.png"));

var tier2 = {};
tier2.push(new Item("life_support","Supply Crate",100, "sprites/Storage.png"));
tier2.push(new Item("fuel","Rocket Fuel Tank",100, "sprites/Thruster.png"));

var tier3 = {};
tier3.push(new Item("life_support","Supply Crate",100, "sprites/Storage.png"));
tier3.push(new Item("fuel","Rocket Fuel Tank",100, "sprites/Thruster.png"));

var tier4 = {};
tier3.push(new Item("life_support","Supply Crate",100, "sprites/Storage.png"));
tier3.push(new Item("fuel","Rocket Fuel Tank",100, "sprites/Thruster.png"));

var parts = {}
parts.push(tier1);
parts.push(tier2);
parts.push(tier3);
parts.push(teir4);
