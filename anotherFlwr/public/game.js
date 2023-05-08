// game.js ¯\_(ツ)_/¯

// GLOBAL 
let debug = false;

// let player;
let gameIsStarted = false;

let mainPlayerInstance;
let guestPlayerInstance;
let sprite;
let el;

let gameObjects = [];
let gameSprites = [];
let activePlayers = [];

// gameAssets = gameAssets.concat(activePlayers);
// let gameAssets = [...sprites, ...npcSprites, ...activePlayers]; 
// let gameAssets = [];

let numOfSpriteElms = 5;
let minDist = 50;

// DIV ELEMENTS
let mapWidth = 800;
let mapHeight = 800;
let mainContainer = document.createElement('div');
  mainContainer.setAttribute('id', 'mainContainer');
  mainContainer.style.width = window.innerWidth;
  mainContainer.style.width = window.innerHeight;
  document.body.append(mainContainer);

let playerGUI = document.createElement('div');
  playerGUI.setAttribute('id', 'playerGUI');

let currencyCounter = document.createElement('div');
currencyCounter.setAttribute('id', 'currencyCounter');
currencyCounter.style.display = 'none';

let currencyDisplay = document.createElement('div');
currencyDisplay.setAttribute('id', 'currencyDisplay');
currencyDisplay.style.display = 'none';

currencyCounter.append(currencyDisplay);

// playerGUI.append(currencyCounter);
  
let startMenu = document.createElement('div');
  startMenu.setAttribute('id', 'startMenu');

let startDiv = document.createElement('div');
startDiv.setAttribute('id', 'startDiv');

let gameIntro = document.createElement('div');
gameIntro.setAttribute('id', 'gameIntro');
gameIntro.innerHTML = "WELCOME TO FLWR";

let startDisplay = document.createElement('div');
startDisplay.setAttribute('id', 'startDisplay');

let introInstruction = document.createElement('div');
introInstruction.setAttribute('id', 'introInstruction');
introInstruction.innerHTML = "PRESS 'ENTER' TO START";

let gifContainer = document.createElement('div');
gifContainer.setAttribute('id', 'gifContainer');

let loadingGIF = document.createElement('div');
loadingGIF.setAttribute('id', 'loading');

gifContainer.append(loadingGIF);

let startButton = document.createElement('button');
  startButton.setAttribute('id', 'startButton');
  startButton.innerHTML = 'Start';

let pickFlowerOption = document.querySelectorAll('.pickFlowerOption');


  startMenu.append(startDiv, currencyCounter);
  startDiv.append(gameIntro, startDisplay, introInstruction, gifContainer);

// let plantButton = document.createElement('button');
//   plantButton.setAttribute('id', 'plantButton');
//   plantButton.innerHTML = 'Plant Flower';

  // plantButton.addEventListener('click', function() {
  //   for (let i = 0; i < gameAsset.instances.length; i++) {
  //     if (gameAsset.instances[i] instanceof mainPlayer) {
  //       // call the plantFlower method on the mainPlayer instance
  //       gameAsset.instances[i].plantFlower();
  //       break; // break out of the loop once the mainPlayer instance is found
  //     }
  //   }
  // })

// DEBUG PANEL
let debugToggle = document.createElement('input');
debugToggle.setAttribute('type', 'checkbox');
debugToggle.setAttribute('id', 'debugToggle');

let debugLabel = document.createElement('label');
debugLabel.setAttribute('for', 'debugToggle');
debugLabel.innerHTML = 'Debug mode';

let debugDiv = document.createElement('div');
debugDiv.setAttribute('id', 'debugDiv');
debugDiv.append(debugToggle, debugLabel);

let root = document.documentElement;
debugToggle.addEventListener('change', () => {
  if (debugToggle.checked) {
    root.style.setProperty('--display', 'block');
  } else {
    root.style.setProperty('--display', 'none');
  }
});

// startMenu.append(startButton, debugToggle);
// startMenu.append(startButton, debugToggle);

let gameMap = document.createElement('div');
  gameMap.setAttribute('id', 'gameMap');
  gameMap.style.width = `${mapWidth}px`;
  gameMap.style.height = `${mapHeight}px`;



// key stuff
const leftKey = "ArrowLeft";
const rightKey = "ArrowRight";
const upKey = "ArrowUp";
const downKey = "ArrowDown";

// play game

window.onkeydown = function (e) {
  let player = mainPlayerInstance;
  // const keyCode = event.key;
  e.preventDefault();
if(gameIsStarted === true) {
  switch (e.keyCode) {
    case 37: // left arrow
      if (player.currentDirection === 'left') {
        //player.stepLeft();
        player.step(); 
      } else {
        player.setFacingDirection('left');
      }
      break;
    case 38: // up arrow
      if (player.currentDirection === 'up') {
        // player.stepUp();
        player.step();
      } else {
        player.setFacingDirection('up');
      }
      break;
    case 39: // right arrow
      if (player.currentDirection === 'right') {
        // player.stepRight();
        player.step();
      } else {
        player.setFacingDirection('right');
      }
      break;
    case 40: // down arrow
      if (player.currentDirection === 'down') {
        // player.stepDown();
        player.step();
      } else {
        player.setFacingDirection('down');
      }
      break;

      // wasd plant keys
      case 87: // w
      //player.setFacingDirection('up');
      player.presentFlower('up');
      // for (let i = 0; i < gameAsset.instances.length; i++) {
      //   if (gameAsset.instances[i] instanceof mainPlayer) {
      //     gameAsset.instances[i].plantFlower();
      //   }
      // }
      break;
      case 65: // a
      //player.setFacingDirection('left');
      player.presentFlower('left');
      // for (let i = 0; i < gameAsset.instances.length; i++) {
      //   if (gameAsset.instances[i] instanceof mainPlayer) {
      //     gameAsset.instances[i].plantFlower();
      //   }
      // }
      break;
      case 83: // s
      //player.setFacingDirection('down');
      player.presentFlower('down');
      // for (let i = 0; i < gameAsset.instances.length; i++) {
      //   if (gameAsset.instances[i] instanceof mainPlayer) {
      //     gameAsset.instances[i].plantFlower();
      //   }
      // }
      break;
      case 68: // d
      //player.setFacingDirection('right');
      player.presentFlower('right');
      // for (let i = 0; i < gameAsset.instances.length; i++) {
      //   if (gameAsset.instances[i] instanceof mainPlayer) {
      //     gameAsset.instances[i].plantFlower();
      //   }
      // }
      break;
  }
} else {
  switch (e.keyCode) {
    case 13: // enter 
      console.log('enter pressed')
        if (activePlayers.length === 15) {
          console.log("max players");
        } else {
          socket.emit('startGame');
          document.body.classList.add('gameIsStarted');
          // startButton.style.display = "none";
          currencyCounter.style.display = 'block';
          currencyDisplay.style.display = 'block';
          startDiv.style.display = 'none';
          // startMenu.append(plantButton);
          playerGUI.style.display = "block";
          gameIsStarted = true;
          backgroundAudio();
        }
      break;
    }
  };
}

let socket = io();
mainContainer.append(playerGUI, startMenu, gameMap);

class eventManager { // not implementing this yet... will be a mediator for behaviors and interactions
  constructor() {
  }
  static emit(eventName, eventData) {
    socket.emit(eventName, eventData);
    // console.log('emitting things?')
  }
}

startButton.addEventListener('click', () => {
  if (activePlayers.length === 5) {
    console.log("max players");
  } else {
    socket.emit('startGame');
    document.body.classList.add('gameIsStarted');
    startButton.style.display = "none";
    // startMenu.append(plantButton);
    playerGUI.style.display = "block";
    gameIsStarted = true;
    backgroundAudio();
  }
});

function backgroundAudio() {
  let forestSound = new Audio('assets/sound/forest.mp3');
  forestSound.play();
  forestSound.loop = true;
}
// gameAssets superclass => environment
// worldObjects & gameSprites
// worldObjects => things in environment
// gameSprites => characters in environment
  // **objectType param defines a thing OR player

class assetManager { // not implementing this yet... will be a mediator for behaviors and interactions
  constructor() {
  }
}
class gameAsset {
  static instances = [];
  constructor(objectType, elmId, posX, posY, width, height) {
    // this.elm = document.getElementById(elmId);
    this.objectType = objectType;
    this.elmId = elmId;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.colliderFoot;
    this.elm;
    //
    this.playerId;
    this.zIndex;
    this.isVisible;
    // this.collidable = true;
    this.currentDirection = 'down';
    this.faceLeft = false;
    this.faceRight = false;
    this.faceUp = false;
    this.faceDown = true;

    gameAsset.instances.push(this);
  }
  static delete(instance) {
    let index = gameAsset.instances.indexOf(instance);
    if (index !== -1) {
      gameAsset.instances.splice(index, 1);
    }
  }
  setZIndex() {
    let colliderToe = this.posY - this.height;
    let z = 1 + Math.floor(((colliderToe - 1) / mapHeight) *99);
    this.elm.style.zIndex = z;
  }
  updatePosition() {
    this.setZIndex();
    // this.checkAround(this.posX, this.posY);
    if (this.elm) {
      this.elm.style.left = `${this.posX}px`;
      this.elm.style.top = `${this.posY}px`;
    }
  }
  isColliding(nextStepX, nextStepY) {
    
    let distanceThreshold = 100;
    let addedEventListener = false;
    

    for (let i = 0; i < gameAsset.instances.length; i++) {
      let asset = gameAsset.instances[i];

      

      if (asset !== this && asset.isCollectable && asset.state == 3) {
        let distance = Math.sqrt(Math.pow(nextStepX - asset.posX, 2) + Math.pow(nextStepY - asset.posY, 2));
        let pickFlowerOption = document.querySelector(`#pickFlowerOption-${asset.elmId}`);

        const clickHandler = (event) => {
          if(addedEventListener) {
            pickFlowerOption.removeEventListener('click', clickHandler);
            addedEventListener = false;
          }
          
          // Send the asset ID along with the event
          pickFlowerOption.style.display = 'none';
          socket.emit('pickFlower', { player: this.playerId, asset: asset.elmId});
        };

        if (distance < distanceThreshold) {
          if(!addedEventListener) {
            pickFlowerOption.addEventListener('click', clickHandler);
            addedEventListener = true;
          }
          
          pickFlowerOption.style.display = 'block';
          // pickFlowerOption.addEventListener('click', (event) => {
          //   // Send the asset ID along with the event
          //   socket.emit('pickFlower', { player: this.playerId, asset: asset.elmId});
          // });
        } else {
          if(addedEventListener) {
            pickFlowerOption.removeEventListener('click', clickHandler);
            addedEventListener = false;
          }
          pickFlowerOption.style.display = 'none';
          // pickFlowerOption.removeEventListener('click');
          
        }
      }
    }

    let nearbyObjects = gameAsset.instances.filter(asset => {
      let distance = Math.sqrt(Math.pow(nextStepX - asset.posX, 2) + Math.pow(nextStepY - asset.posY, 2));
      return distance < distanceThreshold; // only return objects within the threshold
    });

    // console.log(nearbyObjects)

      if (nextStepX >= 0 && nextStepX < mapWidth - this.width && nextStepY >= 0 && nextStepY < mapHeight - this.height) {
        for (let i = 0; i < nearbyObjects.length; i++) {
          let asset = nearbyObjects[i];
          
          
          // if (asset !== this && asset.isCollectable && asset.state == 3) {
          //   // let assetFootX = asset.posX + asset.colliderFoot.offsetLeft;
          //   // let assetFootY = asset.posY + asset.colliderFoot.offsetTop;
          //   // let playerFootX = nextStepX + this.colliderFoot.offsetLeft;
          //   // let playerFootY = nextStepY + this.colliderFoot.offsetTop;
          //   // if (playerFootX + this.colliderFoot.offsetWidth > asset.posX && playerFootX < asset.posX + asset.width &&
          //   //     playerFootY + this.colliderFoot.offsetHeight > asset.posY && playerFootY < asset.posY + asset.height) {
          //     let distance = Math.sqrt(Math.pow(nextStepX - asset.posX, 2) + Math.pow(nextStepY - asset.posY, 2));
          //     if (distance < distanceThreshold) {
          //       let pickFlowerOption = document.querySelector(`#pickFlowerOption-${asset.elmId}`);
          //       pickFlowerOption.style.display = 'block';
          //     } else {
          //       let pickFlowerOption = document.querySelector(`#pickFlowerOption-${asset.elmId}`);
          //       pickFlowerOption.style.display = 'none';
          //     }
          //       // this.collectWorldItem(asset);
          //       // console.log('am I checking?')
          //       // console.log('collecting asset')
          //   //     return false;
          //   // }
          // }

          if (asset !== this && asset.collidable) {
            let assetFootX = asset.posX + asset.colliderFoot.offsetLeft;
            let assetFootY = asset.posY + asset.colliderFoot.offsetTop;
            let playerFootX = nextStepX + this.colliderFoot.offsetLeft;
            let playerFootY = nextStepY + this.colliderFoot.offsetTop;
            if (playerFootX + this.colliderFoot.offsetWidth > assetFootX && playerFootX < assetFootX + asset.colliderFoot.offsetWidth &&
                playerFootY + this.colliderFoot.offsetHeight > assetFootY && playerFootY < assetFootY + asset.colliderFoot.offsetHeight) {
              return true; // colliding
            }
          }

        }
        return false; // !isColliding
    } else {
      // player outside map bounds
      return true;
    }


    // Check if the player is WITHIN the bounds of the game map
    // if (nextStepX >= 0 && nextStepX < mapWidth - this.width && nextStepY >= 0 && nextStepY < mapHeight - this.height) {
    //   // Check for collisions with all assets
    //   for (let i = 0; i < gameAsset.instances.length; i++) { //loop
    //     let asset = gameAsset.instances[i]; 
    //     // if (asset !== this && asset.collidable) { // not me and is collidable
    //     //   if ((nextStepX + this.colliderFoot.offsetWidth > asset.posX && nextStepX < asset.posX + asset.width) && 
    //     //       (nextStepY + this.colliderFoot.offsetHeight > asset.posY && nextStepY < asset.posY + asset.height)) {
    //     //     return true; // colliding 
    //     //   }
    //     // }
    //     //   let assetToe = asset.posY + asset.height;
    //     //   let playerToe = nextStepY + this.colliderFoot.offsetHeight;
    //     //   if (nextStepX + this.colliderFoot.offsetWidth > asset.posX && nextStepX < asset.posX + asset.width &&
    //     //     playerToe > asset.posY && nextStepY < assetToe) {
    //     //     return true; // colliding
    //     //   }

    //     if (asset !== this && asset.isCollectable && asset.state == 3) {
    //       // let assetFootX = asset.posX + asset.colliderFoot.offsetLeft;
    //       // let assetFootY = asset.posY + asset.colliderFoot.offsetTop;
    //       let playerFootX = nextStepX + this.colliderFoot.offsetLeft;
    //       let playerFootY = nextStepY + this.colliderFoot.offsetTop;
    //       if (playerFootX + this.colliderFoot.offsetWidth > asset.posX && playerFootX < asset.posX + asset.width &&
    //           playerFootY + this.colliderFoot.offsetHeight > asset.posY && playerFootY < asset.posY + asset.height) {
    //           // this.collectWorldItem(asset);
              
    //           // console.log('collecting asset')
    //           return false;
    //       }
    //     }

    //     if (asset !== this && asset.collidable) {
    //       let assetFootX = asset.posX + asset.colliderFoot.offsetLeft;
    //       let assetFootY = asset.posY + asset.colliderFoot.offsetTop;
    //       let playerFootX = nextStepX + this.colliderFoot.offsetLeft;
    //       let playerFootY = nextStepY + this.colliderFoot.offsetTop;
    //       if (playerFootX + this.colliderFoot.offsetWidth > assetFootX && playerFootX < assetFootX + asset.colliderFoot.offsetWidth &&
    //           playerFootY + this.colliderFoot.offsetHeight > assetFootY && playerFootY < assetFootY + asset.colliderFoot.offsetHeight) {
    //         return true; // colliding
    //       }
    //     }
        
    //   }
    //   return false; // !isColliding
    // } else {
    //   // player outside map bounds
    //   return true;
    // }
  }
  checkAround(posX, posY) {
    for (let i = 0; i < gameAsset.instances.length; i++) { //loop
      let asset = gameAsset.instances[i]; 

      // }
        // if (asset !== this && asset.isCollectable && asset.state === 3) {
        if ( asset !== this ) { // this being me
          console.log('checking');
          let playerFootX = posX + this.colliderFoot.offsetLeft;
          let playerFootY = posY + this.colliderFoot.offsetTop;
          let distanceThreshold = 50; // expand the area

          if (playerFootX + this.colliderFoot.offsetWidth + distanceThreshold > asset.posX && playerFootX + distanceThreshold < asset.posX + asset.width &&
              playerFootY + this.colliderFoot.offsetHeight + distanceThreshold > asset.posY && playerFootY + distanceThreshold < asset.posY + asset.height) {
              // if(asset.objectType === 'flower' && asset.state == 3) {
              //     console.log("You are near a pickable flower.");
              //     this.displayOption('pickFlower', asset);
              //     return;
              //   }

                switch (asset.objectType) {
                case 'flower':
                  // console.log('a flower is in range')
                  // console.log(asset.state);
                  if(asset.state == 3) {
                    this.displayOption('pickFlower', asset);
                  }
                    
                  break;
                  default:
                    break;
              }
              
          }
        }
    }
  }
  displayOption(type, asset) {
    switch (type) {
      case 'pickFlower':
        // console.log(asset);
        // console.log('displaying option')
        // let pickFlowerOption = document.createElement("div");
        //   pickFlowerOption.classList.add("pickFlowerOption");
        //     pickFlowerOption.style.left = `${asset.posX + asset.width/2}px`;
        //     pickFlowerOption.style.top = `${asset.posY - 20}px`;
        let pickFlowerOption = document.querySelectorAll('.pickFlowerOption')
        pickFlowerOption.style.display = 'block';
        // gameMap.append(pickFlowerOption)

      break;
      default:
        break;
    }
  }
  createElement() {
    const elementCreators = {
      worldObject: () => this.createObject("world"),
      interactiveObject: () => this.createObject("interactive"),
      staticSpriteObject: () => this.createObject("staticSprite"),
      worldItem: () => this.createItem(),
      gameSprite: () => this.createGameSprite(),
      followerSprite: () => this.createGameSprite("follower"),
      mainPlayer: () => this.createPlayer("main"),
      guestPlayer: () => this.createPlayer("guest")
    };
    const className = this.constructor.name;
    const elementCreator = elementCreators[className];

    if (!elementCreator) {
      throw new Error("Invalid class");
    }

    let elm = elementCreator();
    elm.style.left = `${this.posX}px`;
    elm.style.top = `${this.posY}px`;
    elm.style.width = `${this.width}px`;
    elm.style.height = `${this.height}px`;
    this.elm = elm;

    this.colliderFoot = document.createElement('div');
    this.colliderFoot.classList.add("colliderFoot");
    this.colliderFoot.style.width = `${this.width}px`;
    this.colliderFoot.style.height = `${this.height * 0.25}px`;


 if (className === "mainPlayer" || className === "guestPlayer") {
    elm.setAttribute("id", this.playerId);
    if(debug) {
      elm.innerHTML = `<p class="debugTag">${this.playerId}</p>`;
    }

    // this.canvas = document.createElement('canvas');
    // this.canvas.style.width = this.width;
    // this.canvas.style.height = this.height;
    // this.canvas.style.position = 'absolute';
    // this.canvas.style.top = '0';
    // this.canvas.style.left = '0';

    // this.ctx = this.canvas.getContext('2d');
    // elm.append(this.canvas);
  } else {
    if(debug) {
      elm.innerHTML = `<p class="debugTag">${this.elmId}</p>`;
    }
  }

  // this.updatePosition();
  gameMap.append(elm);
  elm.append(this.colliderFoot);

    return elm;
  }
  getElm() {
    return document.getElementById(this.elmId);
  }
  removeElm() {
    const elm = this.getElm();
    if (elm) {
      elm.remove();
    }
  }
  createObject(type) {
    let worldObjectElm = document.createElement("div");
    worldObjectElm.classList.add("worldObject");
    worldObjectElm.classList.add(type + "Object");
    return worldObjectElm;
  }
  createItem() {
    let itemElm = document.createElement("div");
    itemElm.id = this.elmId;
    itemElm.classList.add("item");
    return itemElm;
  }
  createGameSprite(type) { // need to have different types
    let gameSpriteElm = document.createElement("div");
    gameSpriteElm.id = this.elmId;
    gameSpriteElm.classList.add("gameSprite");
    gameSpriteElm.classList.add(type + "Sprite");
    return gameSpriteElm;
  }
  createPlayer(type) {
    let playerElm = document.createElement("div");
    // this.elmId = this.playerId;
    playerElm.id = this.playerId;
    playerElm.classList.add(type + "Player");
    this.playerId = playerElm.id; 
    console.log
    return playerElm;
  }
}
class worldObject extends gameAsset {
  constructor(objectType, elmId, posX, posY, width, height) {
    super(objectType, elmId, posX, posY, width, height);
    
  }
}
class interactiveObject extends worldObject {
  constructor(objectType, elmId, posX, posY, width, height) {
    super(objectType, elmId, posX, posY, width, height);
  }
}
class staticSpriteObject extends interactiveObject {
  constructor(objectType, elmId, posX, posY, width, height) {
    super(objectType, elmId, posX, posY, width, height);
    this.collidable = false;
  }
}
class worldItem extends worldObject {
  constructor(objectType, elmId, posX, posY, width, height, state, color) {
    super(objectType, elmId, posX, posY, width, height);
    this.state = state;
    this.color = color;
    this.collidable = false;
    this.isCollectable = true;
    // console.log(this);
  }
  itemState() {
    // console.log(this.state);
    this.colliderFoot.style.width = `${this.width * 0.4}px`;
    this.colliderFoot.style.height = `${this.height * 0.10}px`;
    switch (this.state) {
      case '1': // sprout state
        // console.log(this.state, this.color);
          this.elm.style.backgroundImage = `url(assets/flower/1/${this.color}.png)`;
        break;
      case '2': // sapling state
          this.elm.style.backgroundImage = `url(assets/flower/2/${this.color}.png)`;
        break;
      case '3': // mature state
          this.isCollectable = true;
          this.elm.style.backgroundImage = `url(assets/flower/3/${this.color}.png)`;
        break;
    }
  }
  // static collectWorldItem() {
  //   if (this.isCollectable && this.isColliding(posX, posY)) {
  //     console.log(`Picked up ${this.objectType}!`);
  //   }
  // }
}
class gameSprite extends gameAsset {
  constructor(objectType, elmId, posX, posY, width, height, currentDirection) {
    super(objectType, elmId, posX, posY, width, height, currentDirection);
    this.currentDirection;
    // this.velocity;
    this.inventory = [];
  }
  updateServerPosition() {
    // console.log('updateServerPosition: ', this.playerId, this.posx, this.posY, this.currentDirection);
    // this.updateFlowerTrainPosition() 
    socket.emit('playerMovement', { playerId: this.playerId, x: this.posX, y: this.posY, currentDirection: this.currentDirection });
    // pathFinderSprite.moveTrain();
  }
  setFacingDirection(direction) {
    this.faceLeft = direction === 'left';
    this.faceRight = direction === 'right';
    this.faceUp = direction === 'up';
    this.faceDown = direction === 'down';
    
    this.currentDirection = direction;
    this.updateServerPosition();
    // console.log('setFacingDirection: ', this.currentDirection);
  }
  step() {
    // console.log('step', this.posX, this.posY)

    let nextStepX = this.posX;
    let nextStepY = this.posY;

    if (this.faceLeft) {
      nextStepX -= this.velocity;
    } else if (this.faceRight) {
      nextStepX += this.velocity;
    } else if (this.faceUp) {
      nextStepY -= this.velocity;
    } else if (this.faceDown) {
      nextStepY += this.velocity;
    }

    // console.log('step: nextStep', nextStepX, nextStepY)

    eventManager.emit('playerMovement', { playerId: this.playerId, x: nextStepX, y: nextStepY, currentDirection: this.currentDirection });
    // request server to move instead of moving here => isColliding and updatePosition
    if (!this.isColliding(nextStepX, nextStepY)) {
      // this.posX = nextStepX;
      // this.posY = nextStepY;
      // this.updatePosition();
      // this.updateServerPosition();
        //eventManager.emit('playerMovement', { playerId: this.playerId, x: nextStepX, y: nextStepY, currentDirection: this.currentDirection });
        // console.log('Server should move player if clients are in sync.')
      // this.renderSheet();
      // this.moveTrain();
    } else {
        // for moving if the dist is less than this.velocity but greater than 0
    }
  }
  
}
class followerSprite extends gameSprite {
  constructor(objectType, elmId, posX, posY, width, height, currentDirection) {
    super(objectType, elmId, posX, posY, width, height, currentDirection);
    this.currentDirection;
    this.velocity = 1;
    this.collidable = false; // I just dont want the headache right now
    this.isTargetting = false;
    this.inventory;

    // console.log(gameAsset.instances);
    // console.log(this.targetPlayer);
  }
  static followTarget(follower, target) {
    follower.isTargetting = true;
    console.log(`${follower.elmId} is going to follow ${target.elmId}`);

    let moveInterval = setInterval(() => {
      let finishedMoving = follower.move(target);
      if (finishedMoving) {
        clearInterval(moveInterval);
        console.log(`reached destination, clear interval`);
      }
    }, 100);
  }
  // collectWorldItem(asset) {
  //   let exclSound = new Audio('assets/sound/exclamation.mp3');
  //       exclSound.play();
        
  //   console.log(asset);
  //   console.log(`Picked up a ${asset.objectType}!`);

  //   console.log(this.playerId, asset.elmId);

  //   socket.emit('worldItemCollected', {asset: asset});
  //   this.inventory.push(asset);
  //   console.log(`${this.playerId} inventory: ${JSON.stringify(this.inventory.length)}`);
  //   gameAsset.delete(asset);

  //   asset.removeElm(asset.elmId);
  //   this.updateCurrencyCounter();
  // }
move(target) {
  const dx = target.posX - this.posX;
  const dy = target.posY - this.posY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance === 0) {
    console.log(`${this.elmId} caught the thing`);
    return true;
  }

  const threshold = 50;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const angleDelta = angle - this.currentDirection;
  const smoothingFactor = 0.5;
  this.currentDirection += angleDelta * smoothingFactor;

  let direction = "";
  if (this.currentDirection >= -45 && this.currentDirection <= 45) {
    direction = "right";
  } else if (this.currentDirection > 45 && this.currentDirection <= 135) {
    direction = "down";
  } else if (this.currentDirection > 135 || this.currentDirection <= -135) {
    direction = "left";
  } else if (this.currentDirection > -135 && this.currentDirection <= -45) {
    direction = "up";
  }

  if (distance > threshold) {
    if (direction === "left") {
      this.posX -= this.velocity;
    } else if (direction === "right") {
      this.posX += this.velocity;
    } else if (direction === "up") {
      this.posY -= this.velocity;
    } else if (direction === "down") {
      this.posY += this.velocity;
    }
    return false;
  } else {
    return true;
  }
}


}
class mainPlayer extends gameSprite {
  constructor(objectType, elmId, posX, posY, width, height, currentDirection) {
    super(objectType, elmId, posX, posY, width, height, currentDirection);
    this.currencyDisplay = document.getElementById('currencyDisplay');
    
    this.velocity = 5;
    this.inventory = [];
    //
  }
  updateCurrencyCounter() {
    let count = this.inventory.length.toString().padStart(2, '0');
    this.currencyDisplay.innerHTML = count; 
  }
  // plantFlower() {
  //   if (this.inventory.length > 0) {

  //     // remove from inventory
  //     let flowerToPlant = this.inventory.pop();
      
  //     // where to plant
  //     flowerToPlant.posX = this.posX + this.width/2;
  //     flowerToPlant.posY = this.posY + this.height - 10;
  //     flowerToPlant.elm.style.left = flowerToPlant.posX + 'px';
  //     flowerToPlant.elm.style.top = flowerToPlant.posY + 'px';

  //     // flowerToPlant.elm.style.backgroundColor = 'pink';

  //     flowerToPlant.collidable = true; // I dont think this is working

  //     gameAsset.instances.push(flowerToPlant); 

  //     gameMap.append(flowerToPlant.elm) // append to the map
  //     // console.log(flowerToPlant);
  //     this.updateCurrencyCounter(); // remove the flower from the counter

  //     socket.emit('planted', {flower: flowerToPlant}); // emitting the data about the planted flower
  //   } else {
  //     console.log('no flowers in inventory')
  //   }
  // }
  plantFlower() {
    if (this.inventory.length > 0) {
        let flowerToPlant = this.inventory.pop(); 
        console.log(flowerToPlant);
      // console.log('the player wants to plant a flower');

      // eventManager.emit('planting', { flower: asset});
    }
  }
  collectWorldItem(asset) {
    if (this.isCollectable && this.isColliding(posX, posY) && this.state === 3) {
    }
    // let exclSound = new Audio('public/assets/sound/exclamation.mp3');
    //     exclSound.play();
  
    console.log(asset);
    // console.log(`Picked up a ${asset.objectType}!`);
    // console.log(this.playerId, asset.elmId);

    socket.emit('worldItemCollected', {asset: asset}); // sending collected item data.
    this.inventory.push(asset);
    // console.log(`${this.playerId} inventory: ${JSON.stringify(this.inventory.length)}`);
   

    // asset.removeElm(asset.elmId);
    // gameAsset.delete(asset);

    this.updateCurrencyCounter();
    // } else {
    //   console.log("no empty slot");
    // }
  }
  step() { 
    // super.step(); 
    // console.log('step', this.posX, this.posY)

    let nextStepX = this.posX;
    let nextStepY = this.posY;

    if (this.faceLeft) {
      nextStepX -= this.velocity;
    } else if (this.faceRight) {
      nextStepX += this.velocity;
    } else if (this.faceUp) {
      nextStepY -= this.velocity;
    } else if (this.faceDown) {
      nextStepY += this.velocity;
    }

    // request server to move instead of moving here => isColliding and updatePosition
    if (!this.isColliding(nextStepX, nextStepY)) {

      // console.log('step: nextStep', nextStepX, nextStepY)

      eventManager.emit('playerMovement', { playerId: this.playerId, x: nextStepX, y: nextStepY, currentDirection: this.currentDirection });
  
    } else {
        // for moving if the dist is less than this.velocity but greater than 0
    }
  }
  getElm() {
    return document.getElementById(this.playerId);
  }
  presentFlower(direction) {
    this.currentDirection = direction;
      switch (direction) {
        case 'left': // sprout state
          // console.log(this.state, this.color);
            this.elm.style.backgroundImage = `url(assets/hand/L/5.png)`;
          break;
        case 'right':
            this.elm.style.backgroundImage = `url(assets/hand/R/5.png)`;
          break;
        case 'up': 
            this.elm.style.backgroundImage = `url(assets/hand/U/5.png)`;
          break;
          case 'down': 
            this.elm.style.backgroundImage = `url(assets/hand/D/5.png)`;
          break;
      }
  }
  setFacingDirection(direction) {
    super.setFacingDirection(direction);
  }
  setZIndex() {
    super.setZIndex(); 
  }
  updatePosition() {
    // super.step(); 
    // console.log('I am being called');
    this.setZIndex();
    // this.checkAround(this.posX, this.posY);
    // console.log('updatePosition', this.posX, this.posY)
    this.elm.style.left = `${this.posX}px`;
    this.elm.style.top = `${this.posY}px`;
    // gameMap.style.left = `${-this.posX}px`;
    // gameMap.style.top = `${-this.posY}px`;

    this.colliderFoot.style.width = `${this.width * 0.75}px`;
    this.colliderFoot.style.height = `${this.height * 0.2}px`;
    this.colliderFoot.style.bottom = `${5}px`;

    switch (this.currentDirection) {
      case 'left': // sprout state
        // console.log(this.state, this.color);
          //this.elm.style.backgroundImage = `url(assets/player/${this.currentDirection}/${this.currentDirection}.gif)`;
          this.elm.style.backgroundImage = `url(assets/hand/L/1.png)`;
          break;
      case 'right':
          //this.elm.style.backgroundImage = `url(assets/player/${this.currentDirection}/${this.currentDirection}.gif)`;
          this.elm.style.backgroundImage = `url(assets/hand/R/1.png)`;
          break;
      case 'up': 
          //this.elm.style.backgroundImage = `url(assets/player/${this.currentDirection}/${this.currentDirection}.gif)`;
          this.elm.style.backgroundImage = `url(assets/hand/U/1.png)`;
          break;
        case 'down': 
          //this.elm.style.backgroundImage = `url(assets/player/${this.currentDirection}/${this.currentDirection}.gif)`;
          this.elm.style.backgroundImage = `url(assets/hand/D/1.png)`;
          break;
    }
  }
}
class guestPlayer extends mainPlayer {
  constructor(objectType, elmId, posX, posY, width, height, currentDirection) {
    super(objectType, elmId, posX, posY, width, height, currentDirection);
    // this.flwrTrain = new pathFinderSprite(elmId, posX, posY, width, height);
  }
}
// console.log(gameAsset.instances);
socket.on('gameObjects', function (objectInfo) {
  console.log(objectInfo);
  objectInfo.forEach((info) => {
        let { objectType, elmId, posX, posY, width, height, currentDirection, state, color } = info; // deconstruct objectInfo

        if(objectType == 'staticSprite') {
          let staticSprite = new staticSpriteObject(objectType, elmId, posX, posY, width, height);
            staticSprite.createElement();
            staticSprite.setZIndex();
            // gameObjects.push(staticSprite);
        } if(objectType == 'flower') {
          let flower = new worldItem(objectType, elmId, posX, posY, width, height, state, color);
            flower.createElement();
            flower.itemState();
            flower.setZIndex();

            if(state == 3) {
              let pickFlowerOption = document.createElement("div");
              // pickFlowerOption.classList.add("pickFlowerOption");
              pickFlowerOption.classList.add(`pickFlowerOption-${elmId}`, 'pickFlowerOption');
              pickFlowerOption.id = `pickFlowerOption-${elmId}`;
                  pickFlowerOption.style.left = `${posX + width/2 - 95}px`;
                  pickFlowerOption.style.top = `${posY - height - 90}px`;
                  pickFlowerOption.style.display = 'none';
              gameMap.append(pickFlowerOption)
            }
            
          //   gameObjects.push(flower);
        } // remove this when you add the enemy sprite back in
        // } if(objectType == 'enemySprite') {
        //   let slug = new followerSprite(objectType, elmId, posX, posY, width, height, currentDirection);
        //     slug.createElement();
        //     //socket.emit('assignTarget', { slugId: slug.elmId, targetType: 'player', targetId: playerId });
        // }
    });
  });
  socket.on('playerId', function(playerId) {
    console.log(`Received ${playerId} from server`);
  });
  socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (playerId) { // loop through players
      console.log(playerId);
      // Is me?
      if (players[playerId].socketId == socket.id) {
        // If the player => active players: skip
        let existingPlayerIndex = activePlayers.findIndex(player => player.playerId == playerId);
        if (existingPlayerIndex >= 0) {
          return;
        }
        console.log(`Adding mainPlayer-${playerId} to activePlayers`);
          let assignedSprite = gameAsset.instances.find(staticSprite => staticSprite.elmId == players[playerId].elmId);
            // console.log(assignedSprite); // check if param values are correct for the assigned'static'Sprite 
          mainPlayerInstance = new mainPlayer('player', assignedSprite.elmId,  players[playerId].posX,  players[playerId].posY, assignedSprite.width, assignedSprite.height, players[playerId].currentDirection);
            mainPlayerInstance.playerId = playerId
            mainPlayerInstance.createElement();
            mainPlayerInstance.updatePosition();  
            mainPlayerInstance.updateCurrencyCounter();  
          // mainPlayerTrain = new pathFinderSprite();
            // mainPlayerInstance.displayFlowerTrain();

            activePlayers.push(mainPlayerInstance);
            // console.log(assignedSprite);
            // assignedSprite.removeElm(assignedSprite.elmId);
            assignedSprite.elm.style.display = 'none';
            assignedSprite.collidable = false;
            // console.log(mainPlayerInstance instanceof mainPlayer); // check if mPI is a mainPlayer instance
            // console.log(gameAsset.instances); 
      } else {
        // Otherwise, create a new Player object for another player
        let existingPlayerIndex = activePlayers.findIndex(player => player.playerId === playerId);
        if (existingPlayerIndex >= 0) {
          return;
        }
        console.log(`Adding guestPlayer-${playerId} to activePlayers`);
        let assignedSprite = gameAsset.instances.find(staticSprite => staticSprite.elmId == players[playerId].elmId);
            // console.log(assignedSprite); // check if parameter values are correct for the assigned'static'Sprite 
          guestPlayerInstance = new guestPlayer('player', assignedSprite.elmId,  players[playerId].posX,  players[playerId].posY, assignedSprite.width, assignedSprite.height, players[playerId].currentDirection);
            guestPlayerInstance.playerId = playerId;
              guestPlayerInstance.createElement();

            activePlayers.push(guestPlayerInstance);
            // assignedSprite.removeElm(assignedSprite.elmId);
            assignedSprite.elm.style.display = 'none';
            assignedSprite.collidable = false;
            
            // console.log(guestPlayerInstance instanceof guestPlayer); // check if gPI is a guestPlayer instance
            // console.log(gameAsset.instances); 
      }
    });
  });
  socket.on('newPlayer', function (playerInfo) {
    let existingPlayerIndex = activePlayers.findIndex(player => player.playerId === playerInfo.playerId);
    if (existingPlayerIndex >= 0) {
      return;
    }
    console.log(`Adding guestPlayer-${playerInfo.playerId} to activePlayers`);
    let assignedSprite = gameAsset.instances.find(staticSprite => staticSprite.elmId == playerInfo.elmId);
  
    guestPlayerInstance = new guestPlayer('player', assignedSprite.elmId, playerInfo.posX, playerInfo.posY, assignedSprite.width, assignedSprite.height, playerInfo.currentDirection);
    guestPlayerInstance.playerId = playerInfo.playerId;
    guestPlayerInstance.createElement();
  
    activePlayers.push(guestPlayerInstance);
    assignedSprite.elm.style.display = 'none';
    assignedSprite.collidable = false;
  });
  socket.on('playerMoved', function (playerInfo) {
        //console.log(playerInfo.posX, playerInfo.posY, playerInfo.currentDirection);
    let movedPlayer = activePlayers.find(player => player.playerId === playerInfo.playerId);
        // console.log("before updating movement: ", movedPlayer.posX, movedPlayer.posY);
      movedPlayer.posX = playerInfo.posX;
      movedPlayer.posY = playerInfo.posY;
      movedPlayer.currentDirection = playerInfo.currentDirection;
        // console.log("after updating movement: ", movedPlayer.posX, movedPlayer.posY);
      movedPlayer.updatePosition();
      // movedPlayer.isColliding(playerInfo.posX, playerInfo.posY)
      // movedPlayer.checkAround(playerInfo.posX, playerInfo.posX);
        // console.log(movedPlayer);
  });
  socket.on('updateWorldItem', function (itemInfo) {
    // console.log(itemInfo);

    let item = itemInfo.asset;

    let gameAssetInstance = gameAsset.instances.find(asset => asset.elmId === item.elmId);
    gameAssetInstance.removeElm();

    // console.log(gameAssetInstance);

    gameAsset.delete(gameAssetInstance);
    // console.log(gameAsset.instances);
    

    // if (typeof asset === 'object') {
    //   console.log('asset is an object');
    // } else {
    //   console.log('asset is not an object');
    // }

    // if (typeof asset.removeElm === 'function') {
    //   console.log('asset.removeElm is a function');
    // } else {
    //   console.log('asset.removeElm is not a function');
    // }

    // console.log(asset);

    // gameAsset.delete(asset);
    // // console.log(gameAsset.instances);
    // asset.removeElm();
  });
  socket.on('updateClientPosition', function (movementData) {
    // console.log(movementData);

    for (let i = 0; i < gameAsset.instances.length; i++) {
      if (gameAsset.instances[i].elmId === movementData.id) {
        // console.log(gameAsset.instances[i])
        // Update posX and posY properties with new values
        gameAsset.instances[i].posX = movementData.x;
        gameAsset.instances[i].posY = movementData.y;
        gameAsset.instances[i].currentDirection = movementData.direction;

        // console.log(movementData.direction)

        // console.log(gameAsset.instances[i].currentDirection);
        // in the case of gameAsset.instances[i].objectType = 'enemySprite'
        if (gameAsset.instances[i].currentDirection === "left") {
          gameAsset.instances[i].elm.style.backgroundImage = 'url(assets/slug/nud01_left.png)';
        } else if (gameAsset.instances[i].currentDirection === "right") {
          gameAsset.instances[i].elm.style.backgroundImage = 'url(assets/slug/nud01_right.png)';
        } else if (gameAsset.instances[i].currentDirection === "up") {
          gameAsset.instances[i].elm.style.backgroundImage = 'url(assets/slug/nud01_back.png)';
        } else if (gameAsset.instances[i].currentDirection === "down") {
          gameAsset.instances[i].elm.style.backgroundImage = 'url(assets/slug/nud01_front.png)';
        }

      //  console.log(gameAsset.instances[i]);
        gameAsset.instances[i].updatePosition();
        break; // Exit loop once instance is found and updated
      }
    }

  });
  socket.on('plantedItem', function (itemData) { 
    console.log(itemData);

    // let newElm = document.createElement('div'); // creating a new div
      //  newElm.setAttribute('id', itemData.elmId);

      let newElm = document.createElement('div');
      // newElm.id = itemData.flower.elmId;
      // newElm.style.cssText = `position: absolute; left: ${itemData.flower.posX}px; top: ${itemData.flower.posY}px; width: ${itemData.flower.width}px; height: ${itemData.flower.height}px;`;

      newElm.id = itemData.flower.elmId;
      newElm.style.position = 'absolute';
      newElm.style.left = itemData.flower.posX + 'px';
      newElm.style.top = itemData.flower.posY + 'px';
      newElm.style.width = itemData.flower.width + 'px';
      newElm.style.height = itemData.flower.height + 'px';
      newElm.style.backgroundColor = 'pink';

      
      // let objectType = itemData.flower.objectType;
      // let elmId = itemData.flower.elmId;
      // let posX = itemData.flower.posX;
      // let posY = itemData.flower.posY;
      // let width = itemData.flower.width;
      // let height = itemData.flower.height;
      // let state = itemData.flower.state;
      // let color = itemData.flower.color;

        // let flower = new worldItem(objectType, elmId, posX, posY, width, height, state, color);
        
        // flower.isCollectable = false;
        // flower.collidable = true;
        let flower = new worldItem(itemData.flower);
        flower.itemState();

        console.log(flower instanceof gameAsset)
        gameAsset.instances.push(flower);

    // itemData.flower.isCollectable = false;
    // itemData.flower.collidable = true;

    
    // console.log(itemData.elm);
    gameMap.append(newElm);

    console.log(newElm);

  });
  socket.on('pickedFlower', function (itemData) { 
    console.log('picking flower');

  });
  socket.on('disconnectUser', function (playerId) {
    let playerIndex = activePlayers.findIndex(player => player.playerId === playerId);
    if (playerIndex === -1) {
      console.log("No player to remove");
      return;
    }
    let disconnectedPlayer = activePlayers[playerIndex];

      activePlayers.splice(playerIndex, 1);

    let gameAssetInstance = gameAsset.instances.find(asset => asset.playerId === playerId);
      if (gameAssetInstance) {
        console.log(gameAssetInstance);

        let assignedSprite = gameAsset.instances.find(staticSprite => staticSprite.elmId == disconnectedPlayer.elmId);
        // console.log(assignedSprite);
          assignedSprite.posX = gameAssetInstance.posX;
          assignedSprite.posY = gameAssetInstance.posY;
          assignedSprite.updatePosition();
          assignedSprite.elm.style.display = 'block';

        gameAsset.delete(gameAssetInstance)
        gameAssetInstance.removeElm(gameMap);
      }
    console.log(`${playerId} has disconnected`);
  });




