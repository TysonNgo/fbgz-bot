const escape = require('../utils/reEscape');
const { prefix } = require('../config');
const JsonFileManager = require('../utils/JsonFileManager');

let re = new RegExp(`^${escape(prefix)}gymstreak *= *(\\d+)$`);
module.exports = {
	cmdRe: re,
	description: `\`${prefix}gymstreak = <int>\` - sets your gym streak in days`,
	exec: msg => {
		const jfm = new JsonFileManager('gymstreak.json');
		let streaks = jfm.load();
		let newStreak = Number(re.exec(msg.content)[1]);
		if (msg.author.id in streaks){
			streaks[msg.author.id] = newStreak;
		} else {
			streaks[msg.author.id] = newStreak;
		}
		jfm.save(streaks);
		msg.reply(`streak set to ${newStreak} days`);
	}
}