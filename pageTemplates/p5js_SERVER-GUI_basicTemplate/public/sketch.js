

let debugMode = true;
let debugButton = document.getElementById("debugButton");
let debugInfo = document.getElementById("debug");
debugButton.addEventListener("click", ()=>{
    debugMode = !debugMode;
    debugInfo.style.display = debugMode?"block":"none";
});

let mainText = document.getElementById('main-text');
let allowButton = document.getElementById('gyroPermission');

from: https://stackoverflow.com/a/14301832
window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if(window.mobileAndTabletcheck() || debugMode === true){
  mainText.innerHTML = "🌀";
  document.getElementById("getGyroAccess").style.display = "block";
  allowButton.addEventListener("click", permission)

}else{
  mainText.innerHTML = "Device orientation cannot be accessed on this device. Please access this website on a mobile device.";
}

function permission() {
  document.getElementById("gyro-text").innerHTML = "getting access to gyroscope.";
  if ( (typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function")) {
      // (optional) Do something before API request prompt.
      DeviceMotionEvent.requestPermission()
          .then( response => {
          // (optional) Do something after API prompt dismissed.
          if ( response == "granted" ) {
              document.getElementById("gyro-text").innerHTML = "Ready.";
              document.getElementById("getGyroAccess").style.display = "none";
              // document.getElementById("sound-interface").style.display = "block";

              window.addEventListener('deviceorientation', (event) => {
                  document.getElementById("alpha").innerHTML = event.alpha;
                  document.getElementById("beta").innerHTML = event.beta;
                  document.getElementById("gamma").innerHTML = event.gamma;
              });
              // window.addEventListener('deviceorientation', (event) => {
              //   ui.alpha = event.alpha;
              //   ui.beta = event.beta;
              //   ui.gamma = event.gamma; 
              //   updateUI();
              // });
              
              // function updateUI() {
              //   document.getElementById("alpha").innerHTML = ui.alpha;
              //   document.getElementById("beta").innerHTML = ui.beta;
              //   document.getElementById("gamma").innerHTML = ui.gamma;
              // }
          }
      })
          .catch( console.error )
  } else {
    if(debugMode === false) {
      document.getElementById("gyro-text").innerHTML = "Cannot access your phone's gyroscope.";
    } else {
      document.getElementById("gyro-text").innerHTML = "Use sensor values to simulate movement.";
      
    //   window.addEventListener('deviceorientation', (event) => {
    //     document.getElementById("alpha").innerHTML = event.alpha;
    //     document.getElementById("beta").innerHTML = event.beta;
    //     document.getElementById("gamma").innerHTML = event.gamma;
    // });

     window.addEventListener('deviceorientation', (event) => {
        ui.alpha = event.alpha;
        ui.beta = event.beta;
        ui.gamma = event.gamma; 
        updateUI();
      });
      
      function updateUI() {
        document.getElementById("alpha").innerHTML = ui.alpha;
        document.getElementById("beta").innerHTML = ui.beta;
        document.getElementById("gamma").innerHTML = ui.gamma;
      }
    }
  }
}


const socket = io();


socket.on('userConnected', function (id) {
  console.log(`${id} connected`);
});

const gui = new dat.GUI();

let ui = {
  alpha: 0,
  beta: 90,
  gamma: 0,
  acc_x: 0,
  acc_y: 0,
  frames: 0, 
  hidden: false,
  color: [255, 0, 0, 255],
};

function setup() {
  createCanvas(400, 400);

  gui.add(ui, "frames").listen();
  
  // Alpha range: 0-360
  gui.add(ui, "alpha", 0, 360).onChange(function(value) {
    // Map alpha value to canvas width
    ui.alpha = value;
    ui.alpha = map(ui.alpha, 0, 360, 0, width);
  });
  
  // Beta range: -180-180
  gui.add(ui, "beta", -180, 180).onChange(function(value) {
    // Map beta value to canvas height
    ui.beta = value;
    ui.beta = map(ui.beta, -180, 180, 0, height);
  });
  
  // Gamma range: -90-90
  gui.add(ui, "gamma", -90, 90).onChange(function(value) {
    // Map gamma value to canvas diameter
    ui.gamma = value;
    ui.dia = map(ui.gamma, -90, 90, 100, 400);
  });
  
  gui.add(ui, "hidden"); // boolean
  gui.addColor(ui, "color");
}

let circle = {
  x: 200,
  y: 200,
  radius: 50,
  color: [255, 0, 0]
};

function draw() {
   //ui.dia++;
   background(220);
   ui.frames = frameCount;
  
   if (ui.hidden) {
     // don't show the circle
   } else {
      circle.x = map(ui.beta, -180, 180, 0, width);
      circle.y = map(ui.gamma, -90, 90, 0, height);

      let hue = map(ui.alpha, 0, 360, 0, 360);
      circle.color = [hue, 100, 100];
   }
  // background(220);
  // ellipse(mouseX, mouseY, 50, 50);
  fill(circle.color);
  ellipse(circle.x, circle.y, circle.radius);
}

socket.on('disconnectUser', function(id) {
  console.log(`${id} connected`);
})


// references

// https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events/Detecting_device_orientation
  // https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events/Orientation_and_motion_data_explained
// https://developer.android.com/guide/topics/sensors/sensors_position#:~:text=The%20range%20of%20values%20is%20-180%20degrees%20to,screen%20and%20a%20plane%20perpendicular%20to%20the%20ground.
