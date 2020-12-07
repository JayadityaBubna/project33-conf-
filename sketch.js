//creating basics for physics engine
const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
const Body=Matter.Body;
var engine,world;

//creating arrays
var particles=[];
var plinkos=[];
var divisions=[];

//creating variable for particle
var particle;

//creating variable for division height
var divisionHeight=300;

//creating variable ground
var ground;

//creating score and count
var score=0;
var count=0;

//gamestates
var gameState="play";

function setup() {
  //creating canvas
  createCanvas(480,800);
  
  //creating an engine and world
  engine=Engine.create();
  world=engine.world;
  
  //creating ground
  ground=new Ground(width/2,height,width,20);
  
  //creating divisions
  for(var i=0;i<=width;i=i+80){
    divisions.push(new Divisions(i,height-divisionHeight/2,10,divisionHeight));
  }
  
  //creating plinkos
  for(var j=45;j<=width;j=j+50){
    plinkos.push(new Plinko(j,75));
  }
  for(var j=70;j<=470;j=j+50){
    plinkos.push(new Plinko(j,175));
  }
  for(var j=45;j<=470;j=j+50){
    plinkos.push(new Plinko(j,275));
  }
  for(var j=70;j<=470;j=j+50){
    plinkos.push(new Plinko(j,375));
  }

  
}

function draw() {
  
  //background color
  background(0); 

  //updating engine
  Engine.update(engine);
  
  //generating scores according to position
  if(particle!=null){
    particle.display();


   if(particle.body.position.y>500 && particle.body.position.x<80){
     score=score+50;
     particle=null;
    }
   if(particle.body.position.y>500 && particle.body.position.x<160){
     score=score+10;
     particle=null;
    }
   if(particle.body.position.y>500 && particle.body.position.x<240){
     score=score+20;
     particle=null;
    }
   if(particle.body.position.y>500 && particle.body.position.x>320){
     score=score+50;
     particle=null;
    }
   if(particle.body.position.y>500 && particle.body.position.x>400){
      score=score+50;
      particle=null;
    }
    //ending the game
    if(count>=5){
      gameState="end"
    }

  }

  //ending game
  if(gameState==="end"){
    textSize(50);
    fill("red");
    text("GAME OVER",250,250);
  }
  
  textSize(25)
  text("SCORE:"+score,20,50);
  text("COUNT:"+count,200,50);
  text("500",20,520);
  text("500",420,520);
  text("200",100,520);
  text("200",340,520);
  text("100",180,520);
  text("100",260,520);

  

  //displaying divisions
  for(var i=0;i<divisions.length;i++){
    divisions[i].display();
  }


  //displaying plinkos
  for(var j=0;j<plinkos.length;j++){
    plinkos[j].display();
  }

  //displaying ground
  ground.display();


}
function mousePressed(){
  if(gameState!=="end"){
    count=count+1;
    particle=new Particle(mouseX,10,10,10);
   }
  }