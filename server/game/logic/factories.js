const { Vector, BoxCollider, GameObject } = require("GameEngine");
const { Control } = require("./control");
const { Tag } = require("./tags");

const property = {
    CONTROL: "control",
    NAME: "name",
    COLOR: "color",
    MAX_ACCELERATION: "maxAcceleration",
    ACCELERATION: "acceleration",
    SCORE: "score"
}

function playerFactory(name, color){
    let player = new GameObject();
    let control = new Control();

    player.setProperty(property.ACCELERATION, 1);
    player.setProperty(property.MAX_ACCELERATION, 10);
    player.setProperty(property.NAME, name);
    player.setProperty(property.COLOR, color);
    player.setProperty(property.SCORE, 0);
    player.setProperty(property.CONTROL, control);

    player.collider = new BoxCollider(new Vector(), new Vector(20,20));

    player.tag = Tag.PLAYER;

    //player.physics.mass = -0.05;

    player.physics.setLimit(new Vector(player.getProperty(property.MAX_ACCELERATION), player.getProperty(property.MAX_ACCELERATION)));
    player.physics.drag = new Vector(0.5, 0.5);

    player.onUpdate = () => {
        player.getProperty(property.CONTROL).run();
    };

    control.action.RIGHT = () => {
        player.physics.addForce(new Vector(player.getProperty(property.ACCELERATION), 0));
    };

    control.action.LEFT = () => {
        player.physics.addForce(new Vector(-player.getProperty(property.ACCELERATION), 0));
    };

    control.action.UP = () => {
        player.physics.addForce(new Vector(0, player.getProperty(property.ACCELERATION)));
    };
    
    control.action.DOWN = () => {
        player.physics.addForce(new Vector(0, -player.getProperty(property.ACCELERATION)));
    };

    return player;
}

function scoreFactory(color){
    let score = new GameObject();
    score.position = new Vector(50, 50);

    let scoreCollider = new BoxCollider(new Vector(), new Vector(20,20));
    score.collider = scoreCollider;

    score.tag = Tag.SCORE;

    score.setProperty(property.COLOR, color);
    score.onCollision = (collisions) => {
        collisions.map((gameObject) => {
            if(gameObject.tag == Tag.PLAYER || gameObject.tag == Tag.SCORE){
                gameObject.properties.score += 1;
                score.destroy();
            }
        });
    };

    return score;
}

function renderObjectFactory(gameObject){
    return {
        tag: gameObject.tag,
        position: gameObject.position,
        name: gameObject.getProperty(property.NAME),
        color: gameObject.getProperty(property.COLOR),
        score: gameObject.getProperty(property.SCORE)
    };
}

module.exports = { playerFactory, scoreFactory, renderObjectFactory };