const Component = require("./component");

class BoxCollider {
    constructor(){
        this.offset = new Component.Vector();
        this.size = new Component.Vector();
    }

    collision(gameObject1, gameObject2){
        const collider1x = gameObject1.position.x + gameObject1.collider.offset.x;
        const collider1y = gameObject1.position.y + gameObject1.collider.offset.y;
        const initial1x = collider1x - (gameObject1.collider.size.x / 2); 
        const final1x = collider1x + (gameObject1.collider.size.x / 2); 
        const initial1y = collider1y - (gameObject1.collider.size.y / 2);
        const final1y = collider1y + (gameObject1.collider.size.y / 2);

        const collider2x = gameObject2.position.x + gameObject2.collider.offset.x;
        const collider2y = gameObject2.position.y + gameObject2.collider.offset.y;
        const initial2x = collider2x - (gameObject2.collider.size.x / 2); 
        const final2x = collider2x + (gameObject2.collider.size.x / 2); 
        const initial2y = collider2y - (gameObject2.collider.size.y / 2);
        const final2y = collider2y + (gameObject2.collider.size.y / 2);

        if((initial1x > initial2x && initial1x < final2x)|| (final1x > initial2x && final1x < final2x))
            if((initial1y > initial2y && initial1y < final2y)|| (final1y > initial2y && final1y < final2y))
                return true;
        return false;
    }
}

module.exports = { BoxCollider };