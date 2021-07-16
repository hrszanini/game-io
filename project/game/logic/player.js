const { BoxCollider } = require("../engine/collider");
const { Vector } = require("../engine/component");
const { GameObject } = require("../engine/gameObject");

const { Control } = require("./control");
const { Tag } = require("./tags");

class Player{
    constructor(name, color){
        let player = new GameObject();
        let control = new Control();

        player.properties.acceleration = 1;
        player.properties.maxAcceleration = 10;
        player.properties.name = name;
        player.properties.color = color;
        player.properties.score = 0;
        player.properties.control = control;

        player.collider = new BoxCollider();
        player.collider.size = new Vector(20,20);
        player.tag = Tag.PLAYER;

        //player.physics.mass = -0.05;

        player.physics.setLimit(new Vector(player.properties.maxAcceleration, player.properties.maxAcceleration));
        player.physics.drag = new Vector(0.5, 0.5);

        player.onUpdate = () => { 
            player.properties.control.run();
        };

        control.action.RIGHT = () => {
            player.physics.addForce(new Vector(player.properties.acceleration, 0));
        };

        control.action.LEFT = () => {
            player.physics.addForce(new Vector(-player.properties.acceleration, 0));
        };

        control.action.UP = () => {
            player.physics.addForce(new Vector(0, player.properties.acceleration));
        };
        
        control.action.DOWN = () => {
            player.physics.addForce(new Vector(0, -player.properties.acceleration));
        };

        return player;
    }
}

module.exports = { Player };