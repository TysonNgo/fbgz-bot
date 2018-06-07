require('events').EventEmitter.defaultMaxListeners = 30;

const Discord = require('discord.js');
const bot = new Discord.Client();

const DISCORD_TOKEN = process.env["DISCORD_TOKEN"];
const ANILIST_CLIENT_ID = process.env["ANILIST_CLIENT_ID"];
const ANILIST_CLIENT_SECRET = process.env["ANILIST_CLIENT_SECRET"];

const DailySketch = require('./Discord-Daily-Sketch-Bot/DailySketch.js');
const ds = new DailySketch({
	discord_client: bot,
	anilist_client_id: ANILIST_CLIENT_ID,
	anilist_client_secret: ANILIST_CLIENT_SECRET
});

require('./commands')(bot);
require('./utils/conversions')(bot);

bot.on('guildMemberRemove', member => {
	bot.channels.get('382635966495588357').send(`<@${member.id}> is no longer in this server`);
})

bot.login(DISCORD_TOKEN);