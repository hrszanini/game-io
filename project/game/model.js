const {Collider2D, Position, Size, GameObject} = require('./engine/components');

class Control{
    constructor(){
        this.UP = false;
        this.DOWN = false;
        this.LEFT = false;
        this.RIGHT = false;
    }
}

function newPlayer(name, velocity){
    let player = new GameObject();

    player.name = name;
    player.velocity = velocity;

    player.control = new Control();

    player.setControl = (command) => {
        player.control[command] = true;
    }

    player.onUpdate = () => {
        if(player.control.UP)
            player.position.x += player.velocity;
        if(player.control.DOWN)
            player.position.x -= player.velocity;
        if(player.control.RIGHT)
            player.position.y += player.velocity;
        if(player.control.LEFT)
            player.position.y -= player.velocity;
        player.control = new Control();
    }

    return player;
}

module.exports = { newPlayer };