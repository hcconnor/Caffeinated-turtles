var roomPath = [];

function node(x,y,name){
  this.children = [];
  this.x = x;
  this.y = y;
  this.name = name;
}

function nodeTree(){
  roomPath.push(new node(0,0,"Engine Room"));             //0
  roomPath.push(new node(0,10,"Cargo"));                  //1
  roomPath.push(new node(0,20,"Engine Room"));            //2
  roomPath.push(new node(10,0,"Crew Quarters"));          //3
  roomPath.push(new node(10,10,"Rear Command Deck"));     //4
  roomPath.push(new node(10,20,"Science Lab"));           //5
  roomPath.push(new node(20,0,"Infirmary"));              //6
  roomPath.push(new node(20,10,"Forward Command Deck"));  //7
  roomPath.push(new node(20,20,"Engineering Deck"));      //8
  roomPath.push(new node(30,0,"Radar Deck"));             //9
  roomPath.push(new node(30,10,"Bridge"));                //10
  roomPath.push(new node(30,20,"Life Support"));          //11

  roomPath[0].children = [roomPath[1],roomPath[3]];
  roomPath[1].children = [roomPath[0],roomPath[4],roomPath[2]];
  roomPath[2].children = [roomPath[1],roomPath[5]];
  roomPath[3].children = [roomPath[0],roomPath[4]];
  roomPath[4].children = [roomPath[3],roomPath[7],roomPath[5]];
  roomPath[5].children = [roomPath[4],roomPath[2]];
  roomPath[6].children = [roomPath[7],roomPath[9]];
  roomPath[7].children = [roomPath[6],roomPath[4],roomPath[8],roomPath[10]];
  roomPath[8].children = [roomPath[7],roomPath[11]];
  roomPath[9].children = [roomPath[6]];
  roomPath[10].children = [roomPath[7]];
  roomPath[11].children = [roomPath[8]];
}
