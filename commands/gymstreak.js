const JsonFileManager = require('../utils/JsonFileManager');

module.exports = {
	cmdRe: /^\.gymstreak$/,
	description: '`.gymstreak` - gets your gym streak in days',
	exec: msg => {
		let streaks = new JsonFileManager('gymstreak.json').load();
		let streak = streaks[msg.author.id] || 0;
		msg.reply(`${streak} days`);
	}
}