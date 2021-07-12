class Collider2D {
    constructor(position, size){
        this.position = position;
        this.size = size;
    }

    collision(gameObject1, gameObject2){
        const collider1x = gameObject1.position.x + gameObject1.collider2d.position.x;
        const collider1y = gameObject1.position.y + gameObject1.collider2d.position.y;
        const initial1x = collider1x - (gameObject1.collider2d.size.x / 2); 
        const final1x = collider1x + (gameObject1.collider2d.size.x / 2); 
        const initial1y = collider1y - (gameObject1.collider2d.size.y / 2);
        const final1y = collider1y + (gameObject1.collider2d.size.y / 2);

        const collider2x = gameObject2.position.x + gameObject2.collider2d.position.x;
        const collider2y = gameObject2.position.y + gameObject2.collider2d.position.y;
        const initial2x = collider2x - (gameObject2.collider2d.size.x / 2); 
        const final2x = collider2x + (gameObject2.collider2d.size.x / 2); 
        const initial2y = collider2y - (gameObject2.collider2d.size.y / 2);
        const final2y = collider2y + (gameObject2.collider2d.size.y / 2);

        if((initial1x > initial2x && initial1x < final2x)|| (final1x > initial2x && final1x < final2x))
            if((initial1y > initial2y && initial1y < final2y)|| (final1y > initial2y && final1y < final2y))
                return true;
        return false;
    }
}

class Position {
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Size {
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class GameObject {
    constructor(){
        this.position = new Position(0, 0, 0);
        this.size = new Size(10, 10, 10);
        this.collider2d = new Collider2D(new Position(0, 0, 0), new Size(10, 10, 10));
    }

    onStart(){}

    onUpdate(){}
}

module.exports = {Collider2D, Position, Size, GameObject};