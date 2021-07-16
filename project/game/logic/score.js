const { BoxCollider } = require("../engine/collider");
const { Vector } = require("../engine/component");
const { GameObject } = require("../engine/gameObject");

const { Tag } = require("./tags");

class Score{
    constructor(color){
        let score = new GameObject();
        score.position = new Vector(50, 50);
        score.collider = new BoxCollider();
        score.collider.size = new Vector(20,20);
        score.tag = Tag.SCORE;

        score.properties.color = color;
        score.onCollision = (collisions) => {
            for(let pos in collisions){
                const gameObject = collisions[pos];
                if(gameObject.tag == Tag.PLAYER || gameObject.tag == Tag.SCORE){
                    gameObject.properties.score += 1;
                    score.destroy();
                }
            }
        };

        return score;
    }
}

module.exports = { Score };