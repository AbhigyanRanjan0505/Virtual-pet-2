class Form {
    constructor() {}
  
    display(){
      var title = createElement('h1')
      title.html("Virtual Pet Game");
      title.position((width/2)-140, -20);
      
      var input = createInput("Enter Your Pet name");
      input.position((width/2)-100, 150);

      var button = createButton('Play');
      button.position((width/2)-50, 188);
  
      button.mousePressed(function(){
        input.hide();
        button.hide();
  
        var name = input.value();
      });
  
    }
  }
