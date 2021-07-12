var socket = io();
var control = {
  37: "LEFT",
  40: "UP",
  39: "RIGHT",
  38: "DOWN"
}
var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

var player = prompt("Insira seu nome");
socket.emit("Create user", {'player': player});

function command(e){
    if(e.keyCode >= 37 && e.keyCode <= 40){
        socket.emit("Command", {'player': player, 'command': control[e.keyCode]});
    }
}

function render(objects){
  ctx.clearRect(0, 0, 300, 500);
  for(let player in objects){
    playerRender = objects[player];
    ctx.fillStyle = "rgb(0,200,0)";
    ctx.fillRect(playerRender.y, playerRender.x, 10, 10);
  }
}

socket.on("Render", function(msg){ 
  render(msg);
});