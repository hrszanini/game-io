const { Vector, Game, Room, GameObject } = require("GameEngine")
const { Color } = require("./logic/color");
const { playerFactory, scoreFactory, renderObjectFactory } = require("./logic/factories");
const { Tag } = require("./logic/tags");

const HEIGHT = 600;
const WIDTH = 1200;

const roomId = "Main";
const roomInstance = new Room();
const gameInstance = new Game();

roomInstance.screen = new Vector(WIDTH, HEIGHT);

gameInstance.addRoom(roomId, roomInstance);
gameInstance.startRoom(roomId);

setInterval(() => {
    let scoreCount = 0;
    for(pos in roomInstance.gameObjects){
        if(roomInstance.gameObjects[pos].tag == Tag.SCORE)
            scoreCount++;
    }
    if(scoreCount < 5){
        let scoreInstance = scoreFactory(Color.BRANCO);
        scoreInstance.position = new Vector(randomInt(0,WIDTH), randomInt(0,HEIGHT));
        roomInstance.addGameObject(scoreInstance);
    }
}, 2000);

function instantiateUpdateFunction(callback){
    const gameObject = new GameObject();
    gameObject.onUpdate = callback;
    roomInstance.addGameObject(gameObject);
}

function instantiatePlayer(name, color){
    const playerInstance = playerFactory(name, Color[color]);
    roomInstance.addGameObject(playerInstance, name);
}

function commandPlayer(name, command){
    const gameObject = roomInstance.gameObjects[name];
    gameObject.properties.control.addCommand(command);
}

function getObjects(){
    let renderObjects = {};

    for(let pos in roomInstance.gameObjects){
        const object = roomInstance.gameObjects[pos];
        
        if(object.tag != null)
            renderObjects[pos] = renderObjectFactory(object); 
    }

    return renderObjects;
}

function randomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = { instantiatePlayer, commandPlayer, getObjects, instantiateUpdateFunction };