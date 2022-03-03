var ship, water;
var shipImg,bgImg,waterImg,helicopterImg,bombImg,gameOverImg;
var score;
var bombGroup,helicopterGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
    shipImg = loadAnimation("images/ship.png","images/ship2.png","images/ship.png");
    gameOverImg = loadAnimation("images/gameOver.png");
    bgImg = loadImage("images/skybg.jpg");

    waterImg = loadImage("images/waterbg.png");
    helicopterImg = loadImage("images/helicopter.png");
    bombImg = loadImage("images/bomb.png");
}

function setup(){
    createCanvas(800,500);
    
    water = createSprite(500,380,1600,20);
    water.addImage("water",waterImg);
    console.log(water.width);
    water.velocityX = -2;
  //  water.debug = true;

    ship = createSprite(500,350,50,50); 
    ship.addAnimation("ship",shipImg);
    ship.addAnimation("gameOver",gameOverImg);
    ship.scale = 0.4;

    score = 0;

    bombGroup = new Group();
    helicopterGroup = new Group();
}

function draw(){
    background(bgImg);

    if(gameState === PLAY) {
        score = Math.round(frameCount/6);

        if(water.x < 300) {
            water.x = water.width/2;
        }

        if(keyDown(LEFT_ARROW) && ship.x >50) {
            ship.x = ship.x - 5;
        }
     
        if(keyDown("right") && ship.x < 750) {
            ship.x = ship.x + 5;
        }
     
        spawnHelicopter();

        if(ship.isTouching(bombGroup)) {
            gameState = END;
        }

    } else if(gameState === END) {
        water.velocityX = 0;
        bombGroup.destroyEach();
        helicopterGroup.destroyEach();
        ship.changeAnimation("gameOver",gameOverImg);
        ship.x = 400;

    }




    

    textSize(20);
    fill("yellow");
    text("Score : " + score,600,50);

   // console.log(frameCount);
  // console.log(water.x);

   
  
//    var rand = Math.round(random(1,50));

//    console.log(rand);

//console.log(frameCount%100);

  

   drawSprites();
    

}


function spawnHelicopter() {

    if(frameCount % 200 === 0) {
        var xPos = Math.round(random(10,750));

        var helicopter = createSprite(xPos, 40, 20,20);
        helicopter.addImage("helicopter", helicopterImg);
        helicopter.scale = 0.5;
        helicopter.velocityX = -5;
        helicopterGroup.add(helicopter);
        helicopter.lifetime = 160;

        var bomb = createSprite(helicopter.x,40,10,10);
        bomb.addImage("bomb",bombImg);
        bomb.scale = 0.1;
        bombGroup.add(bomb);
        bomb.lifetime = 250;
        bomb.velocityY = 2;

    }
    
}