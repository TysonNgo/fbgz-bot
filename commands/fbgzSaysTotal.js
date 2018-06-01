const fs = require('fs');
const JsonFileManager = require('../utils/JsonFileManager');

module.exports = {
	cmdRe: /^\.fbgzSays total$/,
	description: '`.fbgzSays total` - gets the total number of fbgz quotes',
	exec: msg => {
		let fbgz = new JsonFileManager('fbgz.json').load();
		let total = fbgz.quotes.length;
		msg.reply(total+" total quotes.");
	}
}