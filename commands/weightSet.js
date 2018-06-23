const escape = require('../utils/reEscape');
const { prefix } = require('../config');
const JsonFileManager = require('../utils/JsonFileManager');

const re = new RegExp(`^${escape(prefix)}setweight (\\d+(\\.\\d+)?)$`);
module.exports = {
	cmdRe: re,
	description: `\`${prefix}setweight <weight>\` - sets your current weight in pounds`,
	exec: msg => {
		const jfm = new JsonFileManager('bodyweight.json');
		let weights = jfm.load();
		if (msg.author.id in weights){
			weights[msg.author.id].current_weight = re.exec(msg.content)[1];
		} else {
			weights[msg.author.id] = {
				current_weight: re.exec(msg.content)[1],
				goal_weight: null
			}
		}
		jfm.save(weights);
		msg.reply(`set your weight to ${weights[msg.author.id].current_weight} lbs`);
	}
}