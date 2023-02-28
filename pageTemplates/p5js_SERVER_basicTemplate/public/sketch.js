let socket = io();

socket.on('userConnected', function (id) {
  console.log(`${id} connected`);
});

socket.on('disconnectUser', function(id) {
  console.log(`${id} connected`);
})


function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(220);
    ellipse(mouseX, mouseY, 50, 50);
  }