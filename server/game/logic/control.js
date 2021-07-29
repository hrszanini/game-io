class Control{
    constructor(){
        this.action = {
            UP: undefined,
            DOWN: undefined,
            LEFT: undefined,
            RIGHT: undefined,
            ACTION1: undefined,
            ACTION3: undefined,
            ACTION4: undefined,
            ACTION5: undefined
        }

        this.cachedCommands = [];

        this.addCommand = (command) => {
            for(let pos in this.cachedCommands){
                if(command == this.cachedCommands[pos])
                    return;
            }
            this.cachedCommands.push(command);
        };

        this.run = () => {
            while(this.cachedCommands.length > 0){
                let command = this.cachedCommands.pop();
                this.action[command]();  
            }
        };
    }
}

module.exports = { Control }