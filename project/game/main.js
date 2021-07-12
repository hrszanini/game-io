const { Game } = require('./engine/game');
const { newPlayer, newScore } = require('./model');

const gameInstance = new Game(60);
gameInstance.start();

const scoreInstance = newScore(50, 50);
gameInstance.addGameObject(scoreInstance);

function instantiatePlayer(player){
    const playerInstance = newPlayer(player.name.toUpperCase(), player.velocity, player.color);
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