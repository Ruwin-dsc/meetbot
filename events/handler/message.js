const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "messageCreate",
  execute(message, bot) {
    if(!config.owner.includes(message.author.id)) return
        const prefix = config.prefix

        const messageArray = message.content.split(" ");
        const cmd = messageArray[0].toLowerCase();
        const args = messageArray.slice(1);

        if (!(cmd.startsWith(prefix))) return;
        let slicecmd;
        if (cmd.startsWith(prefix)) slicecmd = cmd.slice(prefix.length);
        const commandfile = bot.commands.get(slicecmd) || bot.aliases.get(slicecmd);
        if (!commandfile) return;
  
            if (commandfile) {
          commandfile.run(bot, message, args);
        } 
  },
};
