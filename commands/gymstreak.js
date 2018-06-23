const escape = require('../utils/reEscape');
const { prefix } = require('../config');
const JsonFileManager = require('../utils/JsonFileManager');

module.exports = {
	cmdRe: new RegExp(`^${escape(prefix)}gymstreak$`),
	description: `\`${prefix}gymstreak\` - gets your gym streak in days`,
	exec: msg => {
		let streaks = new JsonFileManager('gymstreak.json').load();
		let streak = streaks[msg.author.id] || 0;
		msg.reply(`${streak} days`);
	}
}