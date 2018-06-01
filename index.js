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

bot.on('guildMemberRemove', member => {
	bot.channels.get('382635966495588357').send(`<@${member.id}> is no longer in this server`);
})

const charShift = require('./utils/charShift');
bot.on('messageReactionAdd', (reaction, user) => {
	if (!reaction.me) return;
	// spoiler command
	if (reaction.message.reactions.first()._emoji.name == '🔎'){
		if (!user.dmChannel){
			user.createDM().then(dm => {
				dm.send(charShift(reaction.message.content, reverse=true));
			});
		}else{
			user.dmChannel.send(charShift(reaction.message.content, reverse=true));
		}
	}
});

bot.login(DISCORD_TOKEN);