var socket = io();
var control = {
  37: "LEFT",
  40: "UP",
  39: "RIGHT",
  38: "DOWN"
}

//Initialize Player
var player = { velocity: 10 } 
player.name = prompt("Insira seu nome");
player.color = prompt("Insira um cor ( Vermelho, Verde, Azul, Preto )");

switch(player.color.toUpperCase()){
  case "VERMELHO":
    player.color = "rgb(255,0,0)";
    break;
  case "VERDE":
    player.color = "rgb(0,255,0)";
    break;
  case "AZUL":
    player.color = "rgb(0,0,255)";
    break;
  case "PRETO":
  default:
    player.color = "rgb(0,0,0)";
}

socket.emit("Create user", player);

var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

function command(e){
    if(e.keyCode >= 37 && e.keyCode <= 40){
        socket.emit("Command", {'player': player.name, 'command': control[e.keyCode]});
    }
}

function render(objects){
  ctx.clearRect(0, 0, 300, 500);
  for(let pos in objects){
    playerRender = objects[pos];
    ctx.fillStyle = playerRender.color;
    ctx.fillRect(playerRender.position.y, playerRender.position.x, 10, 10);
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(pos, playerRender.position.y, playerRender.position.x - 5);
  }
}

socket.on("Render", function(msg){ 
  render(msg);
});