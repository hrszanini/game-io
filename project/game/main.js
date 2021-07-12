const { Game } = require('./engine/game');
const { newPlayer } = require('./model');

const gameInstance = new Game(60);
gameInstance.start();

function instantiatePlayer(name){
    const player = newPlayer(name, 10);
    gameInstance.addGameObject(player);
}

function commandPlayer(name, command){
    for(let pos in gameInstance.gameObjects){
        const player = gameInstance.gameObjects[pos];
        if(player.name == name)
            player.setControl(command);
    }
}

function getPlayers(){
    let players = {};
    for(let pos in gameInstance.gameObjects){
        const player = gameInstance.gameObjects[pos];
        players[player.name] = player.position;
    }
    return players;
}

module.exports = {instantiatePlayer, commandPlayer, getPlayers};