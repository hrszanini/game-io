const { Vector } = require("./component");

class Physics{
    constructor(mass, gravity){
        if(mass === undefined)
            mass = 0;
        if(gravity === undefined)
            gravity = 9.81;

        this.mass = mass;
        this.gravity = gravity;
        this.force = new Vector();
        this.drag = new Vector();
        this.limit = undefined;

        this.setForce = (vector) => {
            this.force = vector;
            this.limitForce();
        };

        this.setLimit = (vector) => {
            this.limit = vector;
        }

        this.addForce = (vector) => {
            this.force.x = this.force.x + vector.x;
            this.force.y = this.force.y + vector.y;
            this.limitForce();
        };

        this.addWeight = () => {
            const massVector = new Vector(0, -(this.mass * gravity));
            this.addForce(massVector);
        };

        this.addDrag = () => {
            this.force.x *= this.drag.x;
            this.force.y *= this.drag.y;
        };

        this.limitForce = () => {
            if(this.limit !== undefined){
                if(this.force.x > this.limit.x || this.force.x < -this.limit.x)
                    this.force.x = this.limit.x * Math.sign(this.force.x);
                if(this.force.y > this.limit.y || this.force.y < -this.limit.y)
                    this.force.y = this.limit.y * Math.sign(this.force.y);
            }
        };
    }
}

module.exports = { Physics };