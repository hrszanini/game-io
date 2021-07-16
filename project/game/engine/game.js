class Game {
    constructor(){
        this.rooms = {};

        this.addRoom = (id, room) => {
            this.rooms[id] = room;
        };
        this.startRoom = (id) => {
            this.rooms[id].start();
        };
        this.stopRoom = (id) => {
            this.rooms[id].stop();
        };
        this.continueRoom = (id) => {
            this.rooms[id].continue();
        };
    }
}

module.exports = { Game };