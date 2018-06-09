const JsonFileManager = require('../utils/JsonFileManager');

module.exports = {
	cmdRe: /^\.fbgzSays stats$/,
	description: '\`.fbgzSays stats\` - displays the amount of quotes everyone has added',
	exec: msg => {
		let members = msg.guild.members;
		let fbgz = new JsonFileManager('fbgz.json').load();
		let quoteTotals = {};
		fbgz.quotes.forEach(q => {
			if (q.added_by in quoteTotals) quoteTotals[q.added_by]++;
			else quoteTotals[q.added_by] = 1;
		})
		let result = '';
		for (let q in quoteTotals){
			result += `${members.get(q).displayName}: ${quoteTotals[q]}\n`;
		}

		msg.channel.send(result);
	}
}
