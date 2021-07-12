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
            }
        }, this.timeInterval);
    }
}

module.exports = { Game };