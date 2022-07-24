var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;



var newImage;

// preload all of the nececary animations and images for the code.
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage ("obstacle1.png")

  obstacle2 = loadImage ("obstacle2.png")

  obstacle3 = loadImage ("obstacle3.png")

  obstacle4 = loadImage ("obstacle4.png")
  
  obstacle5 = loadImage ("obstacle5.png")

  obstacle6 = loadImage ("obstacle6.png")
}

// create a canvas size of 600 by 200.
function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  // create an infinte ground that resets to half of the width of the canvas.
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  // make an invisible ground for the trex to collide to so that its feet are on the visible ground.
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
}

function draw() {
  background(180);
  
  // make the trex jump by pressing space but only if its y pos is below 100
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  }
  
  // give the trex a y velocity so that it comes back down after jumping.
  trex.velocityY = trex.velocityY + 0.8
  
  // resets the ground to make it infinite
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  // make the trex collide to the invisible ground.
  trex.collide(invisibleGround);
  
  //spawn the clouds
  spawnClouds();
  spawnObstacles();
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200
    
    //adjust the depth so the trex is in front of the clouds.
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
}

// spawn an obstacle every 60 frames with a velocityX of -3
function spawnObstacles() {
  if (frameCount % 60 === 0){
    obstacle = createSprite (600, 165, 10, 40)
    obstacle.velocityX= -3;

    // creating a switch statement to randomley choose a image to assign to the obstacle (1, 6) and use break to stop the loop
var rand = Math.round(random(1, 6))
switch(rand){
  case 1: obstacle.addImage (obstacle1)
    break;

  case 2: obstacle.addImage (obstacle2)
    break;

  case 3: obstacle.addImage (obstacle3)
    break;

  case 4: obstacle.addImage (obstacle4)
    break;

  case 5: obstacle.addImage (obstacle5)
    break;

  case 6: obstacle.addImage (obstacle6)
    break;

    // if the machine does not generate a number then break the code to try again.
  default:break;

}
 
// scale the obstacles down
obstacle.scale = 0.5

// give the obstacles a lifetime to avoid memory leak.
obstacle.lifetime = 200;

  }
  
}

