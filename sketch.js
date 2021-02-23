var balloon, background;
function preload() {
  backgroundImg = loadImage("1.png")
  balloonImage = loadAnimation("2.png")
}

function setup() {
  var canvas = createCanvas(1920,937);
  balloon = createSprite(500,300, 50, 50);
  balloon.addAnimation("hotairballoon", balloonImage);   
  balloon.scale = 0.5;
  database = firebase.database();
   console.log(database);

  var ballposition = database.ref("Balloon/Position");
  ballposition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg); 

  fill("black");
  textSize(20);
  text("Use arrow", 30, 30);

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 10;

  }

  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x + 10;
                                                              
  }

  else if(keyDown(UP_ARROW)){
    if (balloon.scale <1){ balloon.scale = balloon.scale+0.05;
    }
  
    balloon.y = balloon.y - 10;
  } 

  else if(keyDown(DOWN_ARROW)){ writePosition(0, 10);
    if (balloon.scale <1){ writePosition(0, -10); }
    if (balloon.scale >0.1){ balloon.scale = balloon.scale-0.05;}
    balloon.y = balloon.y + 10;
  }

  drawSprites();
}

function readPosition(data){
position = data.val();
balloon.x = position.x;
balloon.y = position.y;
}

function writePosition(x, y){
database.ref('Balloon/Position').set({
  'x': balloon.x + x,
  'y': balloon.y + y,
})
}

function showError(){
  console.log("error");
}