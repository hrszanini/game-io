const { Collider2D } = require("./components");

class Game{
    constructor(fps){
        this.gameObjects = [];
        if(fps === undefined)
            fps = 60;
        this.timeInterval = 1000 / fps;
    }

    addGameObject(gameObject){
        this.gameObjects.push(gameObject);
    }

    initialize(){
        for(let pos in this.gameObjects){
            this.gameObjects[pos].onStart();
        }
    }

    start(){
        this.initialize();

        setInterval(() => {
            for(let pos in this.gameObjects){
                this.gameObjects[pos].onUpdate();

                if(this.gameObjects[pos].onCollision2D !== undefined){
                    let collisions = [];
                    for(let pos2 in this.gameObjects){
                        if(pos != pos2 && new Collider2D().collision(this.gameObjects[pos], this.gameObjects[pos2])){
                            collisions.push(this.gameObjects[pos2]);
                        }
                    }
                    if(collisions.length > 0){
                        this.gameObjects[pos].onCollision2D(collisions);
                    }
                }
            }
        }, this.timeInterval);
    }
}

module.exports = { Game };