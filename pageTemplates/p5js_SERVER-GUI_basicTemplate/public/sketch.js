const socket = io();

socket.on('userConnected', function (id) {
  console.log(`${id} connected`);
});

const gui = new dat.GUI();

// shared data object 
const sharedData = {
  x: 100,
  y: 200,
  dia: 300,
  hidden: false,
  frames: "0",
  color: [255, 0, 0, 255]
};

function setup() {
  createCanvas(500, 500);
  gui.add(sharedData, 'frames').listen();
  gui.add(sharedData, 'x', 0, width, 0.5).onChange(() => {
    socket.emit('guiChange', sharedData);
  });
  gui.add(sharedData, 'y').min(0).max(height).step(1).onChange(() => {
    socket.emit('guiChange', sharedData);
  });
  gui.add(sharedData, 'dia').min(100).max(400).listen().onChange(() => {
    socket.emit('guiChange', sharedData);
  });
  gui.add(sharedData, 'hidden').onChange(() => {
    socket.emit('guiChange', sharedData);
  });
  gui.addColor(sharedData, 'color').onChange(() => {
    socket.emit('guiChange', sharedData);
});
}

function draw() {
    background(220);
    
    sharedData.frames = frameCount;
    
    if (sharedData.hidden) {
      // don't show the circle
    } else {
      fill(sharedData.color);
      circle(sharedData.x, sharedData.y, sharedData.dia);
    }
  }


function limitTheValue(e) {
  // the first paremeter receives the value in the interface you just manipulated.
  console.log(e);
  if (sharedData.dia > 300) {
    sharedData.dia = 300;
  }
}

// event listeners
function mousePressed() {
  //
}

socket.on('guiChange', (data) => {
  sharedData.x = data.x;
  sharedData.y = data.y;
  sharedData.dia = data.dia;
  sharedData.hidden = data.hidden;
  sharedData.color = data.color;
});

socket.on('disconnectUser', function(id) {
  console.log(`${id} connected`);
})


// function setup() {
//   createCanvas(500, 500);

//   // gui = new dat.GUI();
  
  
//   gui.add(ui, "frames").listen(); // text 
//   gui.add(ui, "x", 0, width, 0.5);
//   gui.add(ui, "y").min(0).max(height).step(1);
//   gui.add(ui, "dia").min(100).max(400).listen().onChange(
//     limitTheValue
//   );
//   gui.add(ui, "hidden"); // boolean
//   gui.addColor(ui, "color");
  
//   // addFolder
//   // onChange
// }

// function draw() {
//   background(220);
  
//   //ui.dia++;
//   ui.frames = frameCount;
  
//   if (ui.hidden) {
//     // don't show the circle
//   } else {
//     fill(ui.color);
//     circle(ui.x, ui.y, ui.dia);
//   }
// }

// function limitTheValue(e) {
//   // the first paremeter receives the value in the interface you just manipulated.
//   console.log(e);
//   if (ui.dia > 300) {
//     ui.dia = 300;
//   }
// }

// // event listeners
// function mousePressed() {
//   //
// }