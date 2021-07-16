const { BoxCollider } = require("./collider");
const { Vector } = require("./component");
const { Physics } = require("./physics");

class GameObject {
    constructor(){
        this.tag = null;
        this.toDestroy = false;
        this.properties = {};
        this.position = new Vector();
        this.size = new Vector();

        this.collider = new BoxCollider();
        this.physics = new Physics();
        
        this.onCollision = undefined;

        this.onStart = () => {};

        this.onUpdate = () => {};

        this.move = (vector, min, max) => {
            let intendedX = this.position.x + vector.x;
            let intendedY = this.position.y + vector.y;

            if(min !== undefined){
                intendedX = intendedX > min.x ? intendedX : min.x;
                intendedY = intendedY > min.y ? intendedY : min.y;
            }

            if(max !== undefined){
                intendedX = intendedX < max.x ? intendedX : max.x;
                intendedY = intendedY < max.y ? intendedY : max.y;
            }
            
            this.position.x = intendedX;
            this.position.y = intendedY;
        };
        
        this.destroy = () => {
            this.toDestroy = true;
        };
    }
}

module.exports = { GameObject };