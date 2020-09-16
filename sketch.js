var Tower, TowerImage;
var Door, DoorImage;
var Climber, ClimberImage, ClimberGroup;
var Ghost, GhostImage;
var PLAY = 1, END = 0, gameState = PLAY;
var InvisibleBlock, InvisibleGroup;

function preload(){
  TowerImage = loadImage("tower.png");
  DoorImage = loadImage("door.png");
  ClimberImage = loadImage("climber.png");
  GhostImage = loadImage("ghost-standing.png");
}

function setup(){
 createCanvas(600,600);
  Tower = createSprite(300,300, 10,10);
  Tower.addImage("Increase", TowerImage);
  Tower.velocityY = 2;
  Ghost = createSprite(200, 200, 10, 10);
  Ghost.addImage("Standing", GhostImage);
  Ghost.scale = 0.5;
  ClimberGroup = new Group();
  InvisibleGroup = new Group();
}

function draw(){
  background("white");
  if(gameState===PLAY){
   
    if(Tower.y > 600){
   Tower.y = 300 
  }
  spawnDoors();
  if (keyDown("space")){
    Ghost.velocityY = -5;
  }
  if(keyDown(RIGHT_ARROW)){
     Ghost.x = Ghost.x + 5;
     }
  if(keyDown(LEFT_ARROW)){
    Ghost.x = Ghost.x - 5;
  }
  Ghost.velocityY = Ghost.velocityY + 0.8;
  if (ClimberGroup.isTouching(Ghost)){
   Ghost.velocityY = 0; 
  }
  if (Ghost.isTouching(InvisibleGroup)||Ghost.y > 600){
   Ghost.destroy();
    gameState = END;
  }
    
  drawSprites();
  }
  if (gameState===END){
     text("Game Over!", 300, 300); 
    }
}

function spawnDoors(){
  if(frameCount%240===0){
   Door = createSprite(200, -50, 10,10);
    Door.addImage("Open", DoorImage);
    Door.velocityY =  2;
    Door.x = Math.round(random(120,400));
    Door.lifetime = 360;
    Climber = createSprite(200, 20, 10, 10);
    Climber.addImage("railing", ClimberImage);
    Climber.x = Door.x;
    Climber.velocityY = 2;
    Climber.lifetime = 360;
    Ghost.depth = Door.depth;
    Ghost.depth = Door.depth + 1;
    ClimberGroup.add(Climber);
    InvisibleBlock = createSprite(200, 25, 10, 2)
    InvisibleBlock.width = Climber.width;
    InvisibleBlock.x = Door.x;
    InvisibleBlock.velocityY = 2
    InvisibleGroup.add(InvisibleBlock);
  //console.log(Climber.y);
  }
}