const escape = require('../utils/reEscape');
const { prefix } = require('../config');
const JsonFileManager = require('../utils/JsonFileManager');

module.exports = {
	cmdRe: new RegExp(`^${escape(prefix)}weight$`),
	description: `\`${prefix}weight\` - get your current weight`,
	exec: msg => {
		const weights = new JsonFileManager('bodyweight.json').load();
		if (msg.author.id in weights){
			let user = weights[msg.author.id];
			let curr = user.current_weight ? user.current_weight+" lbs" : "";
			let goal = user.goal_weight ? user.goal_weight+" lbs" : "";
			msg.reply("\ncurrent weight:\t"+curr+"\n"+
					"goal weight:\t"+goal)
		} else {
			msg.reply("\nyou have not set your current/goal weight\nset your current/goal weight in pounds with `.setweight <weight>` or `.setgoalweight <weight>`")
		}
	}
}