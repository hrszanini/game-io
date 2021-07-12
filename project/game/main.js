const { Game } = require('./engine/game');
const { newPlayer } = require('./model');

const gameInstance = new Game(60);
gameInstance.start();

function instantiatePlayer(player){
    const playerInstance = newPlayer(player.name, player.velocity, player.color);
    gameInstance.addGameObject(playerInstance);
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
        players[player.name] = {
            position: player.position,
            color: player.color
        }
    }
    return players;
}

module.exports = {instantiatePlayer, commandPlayer, getPlayers};