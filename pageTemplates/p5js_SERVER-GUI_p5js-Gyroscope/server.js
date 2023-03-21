const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { v4: uuidv4 } = require('uuid');

const port = process.env.PORT;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

players = {};
let numOfPlayers = 0;
let maxPlayers = 4;
let activePlayers = [];

const playerSlots = [
    {slot: 'playerOne', connected: false},
    {slot: 'playerTwo', connected: false},
    {slot: 'playerThree', connected: false},
    {slot: 'playerFour', connected: false},
]

let planeWidth = 200;
let planeHeight = 200;

class eventManager { 
    constructor() {
    }
    static ioEmit(eventName, eventData) {
        io.emit(eventName, eventData);
    }
    static broadcastEmit(eventName, eventData) {
        socket.broadcast.emit(eventName, eventData);
    }
    static emit(eventName, eventData) {
        socket.emit(eventName, eventData);
    }
}

/**
 * On connection, the server first looks for an available page number => "game page"
 * The player is then added to the dictionary and sent to their designated page
 * On dissconnect, remove from dictionary 
*/
io.on('connection', function(socket) {
    const playerId = uuidv4();
    console.log(`Client connected: ${playerId}`);
    // console.log('a user connected: ', socket.id);

    socket.on('playerConnect', () => {
      console.log(`Player connected: ${socket.id}`);
        numOfPlayers++;
      io.emit('numOfPlayers', numOfPlayers);
    });
    
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
        numOfPlayers--;
      io.emit('numOfPlayers', numOfPlayers);
    });
    // let pageNum = 1;
    // while (players[pageNum]) {
    //   pageNum++;
    // }

    // players[pageNum] = socket.id;
    // // socket.emit('page', pageNum);

    // io.emit('numOfPlayers', Object.keys(players).length);

    // socket.emit('userConnected', socket.id);
    // socket.on('startGame', function () {
    //     players[playerId] = {
    //       socketId: socket.id,
    //       playerId: playerId,
    //     };
    
    //     socket.emit('currentPlayers', players);
    //     // socket.broadcast.emit('newPlayer', players[playerId]);
    //   })

    // socket.on('guiChange', (data) => {
    //     socket.broadcast.emit('guiChange', data);
    // })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        for (const [key, value] of Object.entries(players)) {
          if (value === socket.id) {
            delete players[key];
            io.emit('numOfPlayers', Object.keys(players).length);
            break;
          }
        }
      });
})


// change 3000 to port
server.listen(3000, () => {
    console.log('listening on *:3000');
  });

  class Asset {
    static instances = [];
    constructor(type) {
  
      Asset.instances.push(this);
    }
    static setupPlane(planeWidth, planeHeight) {
      push();
      fill(0, 255, 0);
      translate(0, 50, 0);
      rotateX(PI/2);
      plane(planeWidth, planeHeight);
      pop();
    }
    createAsset() {
      const assetCreators = {
        mainPlayer: () => this.createPlayer('main'),
        guestPlayer: () => this.createPlayer('guest')
      }
      const className = this.constructor.name;
      const assetCreator = assetCreators[className];
  
      if (!assetCreator) {
        throw new Error('Invalid class');
      }
  
      let elm = assetCreator();
      this.elm = elm;
  
      // this.updatePosition();
    }
    createPlayer(type) {
      switch (type) {
        case 'main':
        // do something
          push();
          fill(0, 0, 255);
          translate(0, 20, 0);
          sphere(10);
          pop();
        break;
        case 'guest':
        // do something
          push();
          fill(0, 255, 0);
          translate(0, 20, 0);
          sphere(10);
          pop();
        break;
      }
    }
  }
  class mainPlayer extends Asset {
    constructor() {
      super();
    }
    // createMarble() {
    //   push();
    //   fill(0, 0, 255);
    //   translate(0, 20, 0);
    //   sphere(10);
    //   pop();
    // }
  }
  class guestPlayer extends mainPlayer {
    constructor() {
      super();
    }
  }