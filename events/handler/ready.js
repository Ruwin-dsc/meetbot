const Discord = require("discord.js");

module.exports = {
  name: "ready",
  async execute(bot) {
    console.log(`Connectés à ${bot.user.username}`);
    console.log(`Le bot est utilisé sur ${bot.guilds.cache.size} serveur(s) !`);

    bot.user.setPresence({
      activities: [
        {
          name: "By Ruwinou",
          type: Discord.ActivityType.Streaming,
          url: "https://www.twitch.tv/ruwin2007yt",
        },
      ],
      status: "dnd",
    });

    
  },
};
