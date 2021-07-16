class Vector {
    constructor(x, y){
        if(x === undefined)
            x = 0;

        if(y === undefined)
            y = 0;

        this.x = x;
        this.y = y;
    }
}


module.exports = { Vector };