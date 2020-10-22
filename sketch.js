var pet, happyPet, petImg, petImgTwo, database, foodS, foodStock, lastFed, feed, addFood, fedTime;
var food, name, formPetName;
var gameState = 0;

function preload() {
  petImg = loadImage("images/dogImg.png");
  petImgTwo = loadImage("images/MilkDog.png");
}

function setup() {
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readstock);

  var canvas = createCanvas(1375, 655);

  game = new Game();
  game.getState();
  game.start();

  feed = createButton("Feed the dog");
  feed.position((width / 2) - 75, 80);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position((width / 2) - 65, 115);
  addFood.mousePressed(addPetFood);

  food = new Food();

  pet = createSprite(width / 2, height - 100, 10, 10);
  pet.addImage(petImg);
  pet.scale = 0.15;
}

function draw() {
  background(46, 139, 87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) { lastFed = data.val(); });

  food.display();
  drawSprites();

  noStroke();
  textSize(25);
  fill("White");
  text("Food Reaming: " + foodS, (width / 2) - 100, height - 150);

  if (lastFed >= 12) {
    text("Last Fed: " + lastFed % 12 + "PM", (width / 2) - 100, 65);
  }
  else if (lastFed == 0) {
    text("Last Fed: 12 AM", (width / 2) - 100, 65);
  }
  else {
    text("Last Fed: " + lastFed + "AM", (width / 2) - 100, 65);
  }
}

function readstock(data) {
  foodS = data.val();
}

function writestock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  });
}

function feedDog() {
  pet.addImage(petImgTwo);
  writestock(foodS);
  database.ref('/').update({
    Food: foodS,
    FeedTime: 12
  });
}

function addPetFood() {
  pet.addImage(petImg);
  foodS++
  database.ref('/').update({
    Food: foodS
  });
}