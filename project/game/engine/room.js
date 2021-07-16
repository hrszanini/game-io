const { BoxCollider } = require("./collider");
const { Vector } = require("./component");

class Room {
    constructor(){
        this.gameObjects = [];
        this.active = false;
        this.fps = 60;
        this.screen = new Vector(300, 600);

        this.addGameObject = (gameObject) => {
            this.gameObjects.push(gameObject);
        };

        this.collisionProcess = (gameObject) => {
            const collisions = [];
            for(let pos in this.gameObjects){
                const gameObject2 = this.gameObjects[pos];

                if(gameObject !== gameObject2){
                    if (new BoxCollider().collision(gameObject, gameObject2))
                        collisions.push(gameObject2);
                }
            }
            return collisions;
        };

        this.physicsProcess = (gameObject) => {
            gameObject.physics.addWeight();
            gameObject.physics.addDrag();
            gameObject.move(gameObject.physics.force, new Vector(), this.screen);
        };

        this.loop = () => {
            let listToDestroy = [];
            
            for(let pos in this.gameObjects){
                const gameObject = this.gameObjects[pos]
                if(gameObject.onCollision !== undefined){
                    const collisions = this.collisionProcess(gameObject);
                    if(collisions.length > 0)
                        gameObject.onCollision(collisions);
                }

                if(gameObject.physics !== undefined || gameObject.physics !== null){
                    this.physicsProcess(gameObject);
                }

                gameObject.onUpdate();

                if(gameObject.toDestroy)
                    listToDestroy.push(gameObject);
            }

            for(let pos in listToDestroy){
                const gameObject = listToDestroy[pos]
                const index = this.gameObjects.indexOf(gameObject);
                this.gameObjects.splice(index, 1);
            }
        };
    
        this.initialize = () => {
            for(let pos in this.gameObjects){
                const gameObject = this.gameObjects[pos];
                gameObject.onStart();
            }
        };

        this.timer = (timeInterval) => {
            if(this.active)
                setTimeout(() => {
                    this.loop();
                    this.timer();
                }, timeInterval, timeInterval);
        };

        this.start = () => {
            this.initialize();
            this.continue();
        };

        this.continue = () => {
            const timeInterval = 1000 / this.fps;
            this.active = true;
            this.timer(timeInterval);
        };

        this.stop = () => {
            this.active = false;
        };
    }
}

module.exports = { Room }