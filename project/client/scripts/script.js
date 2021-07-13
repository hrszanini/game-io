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
player.name = prompt("Insira seu nome").toUpperCase();
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
  //Reset screen
  ctx.clearRect(0, 0, 600, 300);

  players = objects.players;
  for(let pos in players){
    playerRender = players[pos];

    //ctx.fillRect(playerRender.position.y, playerRender.position.x, 20, 20);

    //Player draw
    ctx.fillStyle = playerRender.color;
    ctx.beginPath();
    ctx.arc(playerRender.position.y, playerRender.position.x + 15, 10, 0, 2 * Math.PI);
    ctx.fill();

    //Player name
    let text = pos;
    if(playerRender.score !== undefined)
      text += ` ${playerRender.score}`;

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, playerRender.position.y, playerRender.position.x + 20 + 15);
  }

  ctx.fillStyle = "rgb(125, 125, 125)";
  ctx.fillRect(0, 0, 600, 15);

  let leadderText = `HIGHSCORE: ${objects.leadder.name} - ${objects.leadder.score}`;
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.font = "10px Arial";
  ctx.textAlign = "left";
  ctx.fillText(leadderText, 10, 10);
}

setInterval( () => {
  for(pos in commands){
    socket.emit("Command", {'player': player.name,'command': pos});
  }
}, 1000/100);
  
socket.on("Render", function(msg){ 
  render(msg);
});