const escape = require('../utils/reEscape');
const { prefix } = require('../config');
const JsonFileManager = require('../utils/JsonFileManager');

module.exports = {
	cmdRe: new RegExp(`^${escape(prefix)}gymstreak\\+\\+$`),
	description: `\`${prefix}gymstreak++\` - increments your gym streak`,
	exec: msg => {
		const jfm = new JsonFileManager('gymstreak.json');
		let streaks = jfm.load();
		if (msg.author.id in streaks){
			streaks[msg.author.id]++;
		} else {
			streaks[msg.author.id] = 1;
		}
		jfm.save(streaks);
		msg.reply(`streak set to ${streaks[msg.author.id]} days`);
	}
}