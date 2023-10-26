const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const bot = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildInvites ], partials: [ Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction, Partials.ThreadMember, Partials.GuildScheduledEvent ]});
const config = require('./config.json')

bot.commands = new Collection();
bot.aliases = new Collection();

const commandHandler = require("./handlers/command.js")(bot);
const eventdHandler = require("./handlers/event.js")(bot);
const loadDatabase = require("./handlers/Database/loadDatabase");
const DataBase = require("./handlers/Database/loginDatabase");
DataBase.connectDatabase(bot);

bot.login(config.token)