//variáveis

//Rio, auxiliar rio
var Rio, rioImg;
//porta, portagrupo, auxiliar para imagem
var doorImg, door, doorsGroup;
//grade, auxiliar de imagem, Gradegrupo
var climberImg, climber, climbersGroup;
//fantasma, auxiliar de imagem
var ghost, ghostImg;
//bloco invisível, e grupo de bloco invisível
var invisibleBlockGroup, invisibleBlock;

//estado de jogo
var gameState = "play"

function preload() {
  //imagens
  rioImg = loadImage("rio com floresta.png ");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");

  //som
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  //colocar o som para tocar 
   spookySound.loop();

  //sprite da torre e suas características
  Rio = createSprite(300, 300);
  Rio.addImage("tower", towerImg);
  Rio.velocityY = 1;

  //sprite do fantasma e suas características 
   ghost = createSprite(300,200,50,50);
   ghost.addImage("fantasma",ghostImg);
   ghost.scale = 0.3;


  //criação de grupos
   doorsGroup = new Group();
   climberGroup = new Group();
   invisibleBlockGroup = new Group();



}

function draw() {
  background(200);

  //verificação dos estados de jogo 
  //gamestate === "play"
  if(gameState==="play"){
     if(keyDown("left_arrow")){
        ghost.x = ghost.x -3;
      }
      if(keyDown("right_arrow")){
         ghost.x = ghost.x +3;
        }
      if(keyDown("space")){
        ghost.velocityY = -10;
        }
        ghost.velocityY = ghost.velocityY + 0.8;
  

      //recarregamento da imagem da torre
      if (tower.y > 600) {
      tower.y = 0;
    }

     //chamar a função de criar portas aqui
     criarportas();

    //verificação de fim de jogo aqui
     if(climberGroup.isTouching(ghost)){
       ghost.velocityY = 0;
     }

      if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
        ghost.destroy();
        gameState = "end"
      }

   //código para desenhar qualquer sprite
    drawSprites();
    
}

   //tudo que acontece quando gameState === "end"
    if(gameState=== "end"){
      background("green");
      stroke("white");
      fill ("yellow");
      textSize(30);
      text ("gameOver", 230,250);
      spookySound.stop();
    }
  }


//função para criar portas 
function criarportas(){
   if(frameCount %240===0){
     door = createSprite(200,-50);
     climber = createSprite(200,10);
     invisibleBlock = createSprite(200,15);

     invisibleBlock.width = climber.width;
     invisibleBlock.height = 2;

    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage("porta", doorImg);
    climber.addImage(climberImg);

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    ghost.depth = door.depth;
    ghost.depth +=1;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    doorsGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    invisibleBlock.debug = true;



   }



}





