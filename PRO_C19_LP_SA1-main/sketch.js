var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5;

  spookySound.loop();
}

function draw() {
  background(200);
  
  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300    
    }

    if(keyDown("space")){
      ghost.velocityY = -5;
    }
      ghost.velocityY = ghost.velocityY + 0.8;
  
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
  
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
  
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }

    spawnDoors();
    drawSprites();
  }

  if(gameState === "end"){
    stroke("blue");
    fill("red");
    textSize(30);    
    text("GAME OVER!", 230,250)

  }
  

  
  
  
   
}

function spawnDoors(){
  if(frameCount%240===0){
    door = createSprite(200,-50);
    door.x = Math.round(random(120,400));
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 600;
    doorsGroup.add(door);

    ghost.depth = door.depth;
    ghost.depth += 1;

    climber = createSprite(200,10);
    climber.x = door.x;
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 600;
    climbersGroup.add(climber);
    ghost.depth = climber.depth;
    ghost.depth += 1;

    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 600;
    invisibleBlockGroup.add(invisibleBlock);

    
  }

}