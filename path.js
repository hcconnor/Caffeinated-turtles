function node(x,y,name){
  this.children = [];
  this.x = x;
  this.y = y;
  this.name = name;
}

function nodeTree(){
  roomPath.push(new node(340,160,"Engine Room"));             //0
  roomPath.push(new node(340,322,"Cargo"));                  //1
  roomPath.push(new node(340,470,"Engine Room"));            //2
  roomPath.push(new node(464,160,"Crew Quarters"));          //3
  roomPath.push(new node(464,322,"Rear Command Deck"));     //4
  roomPath.push(new node(464,470,"Science Lab"));           //5
  roomPath.push(new node(573,160,"Infirmary"));              //6
  roomPath.push(new node(573,322,"Forward Command Deck"));  //7
  roomPath.push(new node(573,470,"Engineering Deck"));      //8
  roomPath.push(new node(720,160,"Radar Deck"));             //9
  roomPath.push(new node(720,322,"Bridge"));                //10
  roomPath.push(new node(720,470,"Life Support"));          //11

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
