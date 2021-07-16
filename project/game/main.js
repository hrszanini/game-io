const { Vector } = require("./engine/component");
const { Game } = require("./engine/game");
const { Room } = require("./engine/room");
const { Score } = require("./logic/score");
const { Color } = require("./logic/color");
const { Player } = require("./logic/player");
const { GameObject } = require("./engine/gameObject");
const { Tag } = require("./logic/tags");

const HEIGHT = 600;
const WIDTH = 1200;
var scoreID = 0;
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
        let scoreInstance = new Score(Color.BRANCO);
        scoreInstance.properties.name = scoreID++;
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
    const playerInstance = new Player(name, Color[color]);
    roomInstance.addGameObject(playerInstance);
}

function commandPlayer(name, command){
    for(let pos in roomInstance.gameObjects){
        const gameObject = roomInstance.gameObjects[pos];
        if(gameObject.properties.name == name){
            gameObject.properties.control.addCommand(command);
        }
    }
}

function getObjects(){
    let objects = {};
    for(let pos in roomInstance.gameObjects){
        const object = roomInstance.gameObjects[pos];
        if(object.tag != null){
            objects[object.properties.name] = {
                name: object.properties.name,
                position: object.position,
                color: object.properties.color,
                score: object.properties.score,
                tag: object.tag
            }
        }
    }
    return objects;
}

function randomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {instantiatePlayer, commandPlayer, getObjects, instantiateUpdateFunction};