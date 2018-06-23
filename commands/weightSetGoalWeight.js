const escape = require('../utils/reEscape');
const { prefix } = require('../config');
const JsonFileManager = require('../utils/JsonFileManager');

const re = new RegExp(`^${escape(prefix)}setgoalweight (\\d+(\\.\\d+)?)$`);
module.exports = {
	cmdRe: re,
	description: `\`${prefix}setgoalweight <weight>\` - sets your goal weight in pounds`,
	exec: msg => {
		const jfm = new JsonFileManager('bodyweight.json');
		let weights = jfm.load();
		if (msg.author.id in weights){
			weights[msg.author.id].goal_weight = re.exec(msg.content)[1];
		} else {
			weights[msg.author.id] = {
				current_weight: null,
				goal_weight: re.exec(msg.content)[1]
			}
		}
		jfm.save(weights);
		msg.reply(`set your goal weight to ${weights[msg.author.id].goal_weight} lbs`);
	}
}