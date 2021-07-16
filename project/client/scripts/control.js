var control = {
    37: "LEFT",
    40: "UP",
    39: "RIGHT",
    38: "DOWN"
};

var commands = {};

//Initialize Player
var player = {};
player.name = prompt("Insira seu nome").toUpperCase();
player.color = prompt("Insira um cor ( Vermelho, Verde, Azul, Preto )").toUpperCase();

document.body.addEventListener("keydown", addCommand);
document.body.addEventListener("keyup", remCommand);

function addCommand(event){
    if(event.keyCode >= 37 && event.keyCode <= 40)
    commands[control[event.keyCode]] = true;
}

function remCommand(event){
    if(event.keyCode >= 37 && event.keyCode <= 40)
        delete commands[control[event.keyCode]];
}

function resetCommands(){
    commands = {};
}