var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver,gameOverImg;

var jerry,tom,cheese,backgroundImage,ground;
var jerry_running,tomImage,cheeseImage;

var obstaclesGroup,cheeseGroup;
var score = 0;

function preload(){
  
  jerry_running = loadAnimation("jerry running.png");
 
  tomImage = loadImage("Tom as obstacle.png");
  
  cheeseImage = loadImage("cheese image.png");
  
  backgroundImage = loadImage("background.jpg");

  gameOverImg = loadImage("game-over.jpg")
}

function setup() {
 createCanvas(800,400);
  
  ground = createSprite(0,190,200,10);
 ground.addImage("ground",backgroundImage);
 ground.x = ground.width /2;
  ground.velocityX = -3;
  
  
  jerry = createSprite(70,300,20,50);
  jerry.addAnimation("running",jerry_running);
  jerry.scale = 0.3;
  
   invisibleGround = createSprite(0,350,1300,10);
  invisibleGround.visible = false;
  
 obstacleGroup = new Group();
  cheeseGroup = new Group();
  
  gameOver = createSprite(300,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale=1.4;
  
  jerry.setCollider("circle",0,0,100);
  jerry.debug = false;
}

function draw() {
  
   if(gameState === PLAY){
     
     gameOver.visible = false;
    
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("space")&& jerry.y >=200){
      
      jerry.velocityY = -14;
    
    }
    
    jerry.velocityY = jerry.velocityY + 0.8;
    
    jerry.collide(invisibleGround);
    
    
    if(ground.x < 0 ){
      
       ground.x = ground.width/2;
      
    }
     
     if(cheeseGroup.isTouching(jerry)) {
     cheeseGroup.destroyEach() ;
     score = score + 1 ;
   }
    
     if(jerry.isTouching(obstacleGroup)){
       gameState = END;
     }
  }
  
  else if (gameState === END) {
    
      ground.velocityX = 0;
      jerry.velocityY = 0
     
    obstacleGroup.setVelocityXEach(0);
     cheeseGroup.setVelocityXEach(0);
   
    obstacleGroup.destroyEach();
  cheeseGroup.destroyEach();
     
      gameOver.visible = true;
   }
  
 spawnCheese();
spawnObstacles();
  
  drawSprites();
}

function spawnCheese() {
  
  if (frameCount % 60 === 0) {
    cheese = createSprite(600,140,40,10);
    cheese.y = Math.round(random(80,120));
  cheese .addImage(cheeseImage);
   cheese .scale = 0.3;
    cheese.velocityX = -3;
    
     
    cheese.lifetime = 200;
    
    
    cheese.depth = jerry.depth;
    jerry.depth = jerry.depth + 1;
    
    
    cheeseGroup.add(cheese);
  }
  
}

function spawnObstacles() {
  
  if (frameCount % 250 === 0) {
    tom = createSprite(600, 260, 40, 50);
    
  tom .addImage(tomImage);
   tom .scale = 0.04;
    tom.velocityX = -4;
    
     
    tom.lifetime = 180;
   
    
    obstacleGroup.add(tom);
  }
  
}

