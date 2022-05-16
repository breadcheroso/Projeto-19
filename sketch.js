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
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
  ghost = createSprite(200,200,50,50)
  ghost.scale = 0.3
  ghost.addImage("ghost",ghostImg)
}

function draw() {
  background(200);
  if (gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }
    if (keyDown("LEFT_ARROW")){
      ghost.x = ghost.x - 3
    }
    if (keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 3
    }
    if (keyDown("SPACE")){
      ghost.velocityY = -10
    }
    ghost.velocityY = ghost.velocityY + .8
    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy()
      gameState = "end"
    }
    spawndoors()
  
    drawSprites()
  }
    if (gameState === "end"){
      stroke("yellow")
      fill("yellow")
      textSize(30)
      text("Fim de Jogo!",230,250)
    }
}
function spawndoors(){
  if (frameCount % 240 === 0){
    var doors = createSprite(200,-50)
    var climber = createSprite(200,10)
    var invisibleBlock = createSprite(200,15)

    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    doors.x = Math.round(random(120,400))
    climber.x = doors.x
    invisibleBlock.x = doors.x

    doors.addImage(doorImg)
    doors.velocityY = 1

    climber.addImage(climberImg)
    climber.velocityY = 1

    invisibleBlock.velocityY = 1
    ghost.depth = doors.depth 
    ghost.depth += 1
    invisibleBlock.lifetime = 800
    doors.lifetime = 800
    climber.lifetime = 800
    invisibleBlock.debug = true

    
    doorsGroup.add(doors)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)

     
  }
}