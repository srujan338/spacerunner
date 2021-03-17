var PLAY=1;
var END=0;
var gameState=PLAY;

var spaceImg,space;
var player,playerImg;
var enemy,enemyImg,enemyGroup;
var star,starGroup,coinsound;

var score=0;

function preload(){
  enemyImg=loadImage('enemy.png');
   playerImg=loadImage('images.png');
  star=loadImage('stars.png');
  coinsound=loadSound('coin.wav');
}

function setup() {
  createCanvas(400,200);
  background(180);
  
 stars=createSprite(600,200,10,10);
    stars.scale=1/10;
    stars.velocityX=-5;
    stars.addImage(star);
  
  player=createSprite(50,100,20,20);
  player.addImage('spaceship',playerImg);
  player.scale=0.25;

  enemyGroup=new Group();
  starGroup=new Group();
 
}

function draw() {
  background(0);
   fill('white');
   text('Score: '+score,300,10);
   
  
  if(gameState===PLAY){
  
      player.y=mouseY;
     
    if (enemyGroup.isTouching(player)){
    gameState=END;}
 
    if(starGroup.isTouching(player)){
      score=score+1;
      coinsound.play();
      starGroup[0].destroy();
    }
  }
  else if(gameState===END){
    
    enemyGroup.setVelocityXEach(0);
    enemyGroup.setLifetimeEach(-1);
    
    starGroup.setVelocityXEach(0);
    starGroup.setLifetimeEach(-1);
  }
  spawnEnemy();
  spawnStars();
  drawSprites();
}

function spawnEnemy(){
  if (frameCount%100===0){
    enemy=createSprite(600,100,10,10);
    enemy.addImage('enemyship',enemyImg);
    enemy.scale=1/10;
    enemy.velocityX=-(3+10+score/50);
    
    enemy.y=Math.round(random(50,150));
    enemy.setCollider('circle',0,0,200);
     //enemy.debug=true;
     
    enemy.lifetime= 210;
    enemyGroup.add(enemy);
   
    stars.depth=enemy.depth;
    enemy.depth=enemy.depth+1;
  }
}

function spawnStars(){
  if(frameCount%10===0){
    var stars=createSprite(600,200,10,10);
    stars.scale=1/10;
    stars.velocityX=-(3+5+score/50);
    stars.addImage(star);
    stars.y=Math.round(random(20,200))
    
    stars.lifetime=220;
    
    starGroup.add(stars);
    
    stars.depth=player.depth;
    player.depth=player.depth+1;
  }
  
}
