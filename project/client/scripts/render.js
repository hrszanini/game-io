var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

var Color = {
    VERMELHO: "rgb(255, 0, 0)",
    VERDE: "rgb(0, 255, 0)",
    AZUL: "rgb(0, 0, 255)",
    PRETO: "rgb(0, 0, 0)",
    BRANCO: "rgb(255, 255, 255)",
    CINZA: "rgb(125, 125, 125)"
}

function render(msg){
    ctx.clearRect(0, 0, 1200, 615);

    let objects = msg.objects;
  
    for(let pos in objects){
        let object = objects[pos];
        drawObject(object);
    }

    drawHeader(msg.leadder);
}

function drawObject(object){
    for(let i=1; i<=15; i++){
        ctx.globalAlpha = (1/15) * (15 - i);
        ctx.fillStyle = object.color;
        ctx.beginPath();
        ctx.arc(object.position.x, object.position.y + 15, i, 0, 2 * Math.PI);
        ctx.fill();
    }

    let text;
    if(object.tag == "player")
        text = `${object.name} ${object.score}`;
    else
        text = `${object.tag}`;

    ctx.globalAlpha = 1;
    ctx.fillStyle = Color.PRETO;
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, object.position.x,  object.position.y + 22 + 20);
}

function drawHeader(leadder){
    ctx.fillStyle = Color.CINZA;
    ctx.fillRect(0, 0, 1200, 25);

    ctx.font = "20px Arial";
    ctx.fillStyle = Color.BRANCO;

    ctx.textAlign = "left";
    let leadderText = `LEADDER: ${leadder.name} | HIGHSCORE:  ${leadder.score}`;
    ctx.fillText(leadderText, 10, 20);

    ctx.textAlign = "right";
    let pingText = `${ping} ms`;
    ctx.fillText(pingText, 1190, 20);
}
