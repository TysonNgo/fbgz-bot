const escape = require('../utils/reEscape');
const { prefix } = require('../config');
const JsonFileManager = require('../utils/JsonFileManager');

module.exports = {
	cmdRe: new RegExp(`^${escape(prefix)}weight all$`),
	description: `\`${prefix}weight all\` - get everyone\'s current and goal weight`,
	exec: msg => {
		const weights = new JsonFileManager('bodyweight.json').load();
		let result = '';
		for (let user in weights){
			u = weights[user];
			let curr = u.current_weight || '';
			let goal = u.goal_weight || '';
			try{
				result += `**${msg.guild.members.get(user).user.tag}:** ${curr}${goal ? '/'+goal : ''} lbs\n`;
			} catch(e){
				result += `**${user}:** ${curr}${goal ? '/'+goal : ''} lbs\n`;
			}
		}
		msg.channel.send(result);
	}
}