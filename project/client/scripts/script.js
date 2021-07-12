var socket = io();
var control = {
  37: "LEFT",
  40: "UP",
  39: "RIGHT",
  38: "DOWN"
}
var commands = {};

//Initialize Player
var player = { velocity: 2 } 
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
  if(e.keyCode >= 37 && e.keyCode <= 40)
  commands[control[e.keyCode]] = true;
}

function uncommand(e){
  if(e.keyCode >= 37 && e.keyCode <= 40)
  delete commands[control[e.keyCode]];
}

function resetCommand(){
  commands = {};
}

document.getElementById("body").addEventListener("onfocusout", resetCommand);

function render(objects){
  ctx.clearRect(0, 0, 600, 300);
  for(let pos in objects){
    playerRender = objects[pos];
    ctx.fillStyle = playerRender.color;
    ctx.fillRect(playerRender.position.y, playerRender.position.x, 20, 20);
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(pos, playerRender.position.y + 10, playerRender.position.x + 30);
  }
}

setInterval( () => {
  for(pos in commands){
    socket.emit("Command", {'player': player.name,'command': pos});
    console.log(pos);
  }
}, 1000/100);
  
socket.on("Render", function(msg){ 
  render(msg);
});