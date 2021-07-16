var socket = io();

const Channel = {
  CONNECTION: "connection",
  CHAT: "chat",
  CREATE_USER: "create_user",
  FRAME: "frame",
  COMMAND: "command",
  PING: "ping"
}

//Socket configuration
socket.emit(Channel.CREATE_USER, player);

function sendChat(){
  let sendText = document.getElementById("sendtext");
  socket.emit(Channel.CHAT, {"name": player.name, "message": sendText.value});
  sendText.value = "";
}

function sendCommand(){
  for(pos in commands)
    socket.emit(Channel.COMMAND, {"name": player.name, "command": pos});
}
  
socket.on(Channel.FRAME, function(msg){ 
  render(msg); 
  sendCommand();
});

socket.on(Channel.CHAT, function(msg){ 
  let chatText = document.getElementById("chattext");
  chatText.scrollTop = chatText.scrollHeight;
  chatText.value += `${msg}\n`;
});

var ping = 0;

socket.on(Channel.PING, function(msg){ 
  ping = Date.now() - msg;
});