class Food {
  constructor() {
    this.image = loadImage("images/Milk.png");
  }

  getFood() {
    var foodRef = database.ref('Food');
    foodRef.on("value", function (data) {
      foodS = data.val();
    })
  }

  updateFood(food) {
    database.ref('/').update({
      Food: food
    });
  }

  display() {
    var x = 10;
    var y = 250;

    if (foodS != 0) {
      for (var i = 0; i < foodS; i = i + 1) {
        if (i % 1 === 0) {
          imageMode(CENTER);
          image(this.image, x, y, 50, 50);
          x = x + 30;
        }
      }
      imageMode(CENTER);
      image(this.image, x, y, 50, 50);
    }
  }
  
  updateName(name) {
    database.ref('/').update({
      Name: name
    });
}

  update(name){
    var enterNameIndex = "player" + name;
    database.ref(enterNameIndex).set({
      Name:name
    });
  }
}