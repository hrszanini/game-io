const IO = require('socket.io');
const { Tag } = require('./logic/tags');
const gameInstance = require('./main');

const Channel = {
    CONNECTION: "connection",
    CHAT: "chat",
    CREATE_USER: "create_user",
    FRAME: "frame",
    COMMAND: "command",
    PING: "ping"
}

function configure(http){
    var io = IO(http);

    io.on(Channel.CONNECTION, function(socket){

        socket.on(Channel.CREATE_USER, function(msg){
            if(msg.name != null){
                console.log(`${Channel.CREATE_USER}: ${msg.name} ${msg.color}`);
                gameInstance.instantiatePlayer(msg.name, msg.color);
            }
        });
    
        socket.on(Channel.COMMAND, function(msg){
            //console.log(`${Channel.COMMAND}: ${msg.name} ${msg.command}`);
            gameInstance.commandPlayer(msg.name, msg.command);
        });
    
        socket.on(Channel.CHAT, function(msg){
            console.log(`${Channel.CHAT}: ${msg.name} ${msg.message}`);
            io.emit(Channel.CHAT, `${msg.name}: ${msg.message}`);
        });

    });

    const leadder = { name: "Mrs. Nobody", score: 0 };

    gameInstance.instantiateUpdateFunction(() => {
        const objects = gameInstance.getObjects();

        for(let pos in objects){
            object = objects[pos];
            if(object.tag == Tag.PLAYER && object.score > leadder.score){
                leadder.name = object.name;
                leadder.score = object.score;
            }
        }

        const msg = { 
            "leadder": leadder,
            "objects": objects
        };
    
        io.emit(Channel.FRAME, msg);
    });

    setInterval(io.emit,1000, Channel.PING, Date.now());
}

module.exports = { configure };