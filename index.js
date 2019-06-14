require('events').EventEmitter.defaultMaxListeners = 30;

const Discord = require('discord.js');
const bot = new Discord.Client();

const {prefix} = require('./config');

const DISCORD_TOKEN = process.env["DISCORD_TOKEN"];
const ANILIST_CLIENT_ID = process.env["ANILIST_CLIENT_ID"];
const ANILIST_CLIENT_SECRET = process.env["ANILIST_CLIENT_SECRET"];

const DailySketch = require('./Discord-Daily-Sketch-Bot/DailySketch.js');
const DailySketchMALChar = require('./Discord-Daily-Sketch-Bot-MAL-Char/DailySketch.js');
const ds = new DailySketch({
	discord_client: bot,
	anilist_client_id: ANILIST_CLIENT_ID,
	anilist_client_secret: ANILIST_CLIENT_SECRET
});
const dsMALChar = new DailySketchMALChar({
	discord_client: bot
});

require('./commands')(bot);
require('./utils/conversions')(bot);

bot.on('ready', () => {
	bot.channels.get('382636893512269824').send('<@101788430479925248> bot restarted');
	bot.user.setActivity(`${prefix}help`);
})

bot.on('guildMemberRemove', member => {
	bot.channels.get('382635966495588357').send(`<@${member.id}> is no longer in this server`);
})

bot.login(DISCORD_TOKEN);
