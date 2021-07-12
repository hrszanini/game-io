const {Collider2D, Position, Size, GameObject} = require('./engine/components');
const { Game } = require('./engine/game');

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

    player.collider2d = new Collider2D(new Position(0,0,0), new Size(20,20,0));
    player.name = name;
    player.velocity = velocity;
    player.color = color;
    player.score = 0;

    player.control = new Control();

    player.setControl = (command) => {
        player.control[command] = true;
    }

    player.onUpdate = () => {
        if(player.control.UP && player.position.x < 290)
            player.position.x += player.velocity;
        if(player.control.DOWN && player.position.x > 0)
            player.position.x -= player.velocity;
        if(player.control.RIGHT && player.position.y < 590)
            player.position.y += player.velocity;
        if(player.control.LEFT && player.position.y > 0)
            player.position.y -= player.velocity;
        player.control = new Control();
    }

    return player;
}

function newScore(x, y){
    let score = new GameObject();
    score.position = new Position(x, y, 0);
    score.collider2d = new Collider2D(new Position(0,0,0), new Size(20,20,0));

    score.name = "Score";
    score.color = "rgb(255, 255, 255)";

    score.onCollision2D = (collisions) => {
        min = Math.ceil(0);
        max = Math.floor(300);
        let newX = Math.floor(Math.random() * 250);
        let newY = Math.floor(Math.random() * 550);

        score.position = new Position(newX, newY, 0);
    }

    return score;
}

module.exports = { newPlayer, newScore };