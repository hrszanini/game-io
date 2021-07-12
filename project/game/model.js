const {Collider2D, Position, Size, GameObject} = require('./engine/components');

class Control{
    constructor(){
        this.UP = false;
        this.DOWN = false;
        this.LEFT = false;
        this.RIGHT = false;
    }
}

function newPlayer(name, velocity, color){
    let player = new GameObject();

    player.name = name;
    player.velocity = velocity;
    player.color = color;

    player.control = new Control();

    player.setControl = (command) => {
        player.control[command] = true;
    }

    player.onUpdate = () => {
        if(player.control.UP && player.position.x < 150)
            player.position.x += player.velocity;
        if(player.control.DOWN && player.position.x > 0)
            player.position.x -= player.velocity;
        if(player.control.RIGHT && player.position.y < 300)
            player.position.y += player.velocity;
        if(player.control.LEFT && player.position.y > 0)
            player.position.y -= player.velocity;
        player.control = new Control();
    }

    return player;
}

module.exports = { newPlayer };