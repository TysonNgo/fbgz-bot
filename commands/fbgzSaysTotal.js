const escape = require('../utils/reEscape');
const { prefix } = require('../config');
const fs = require('fs');
const JsonFileManager = require('../utils/JsonFileManager');

module.exports = {
	cmdRe: new RegExp(`^${escape(prefix)}fbgzSays total$`),
	description: `\`${prefix}fbgzSays total\` - gets the total number of fbgz quotes`,
	exec: msg => {
		let fbgz = new JsonFileManager('fbgz.json').load();
		let total = fbgz.quotes.length;
		msg.reply(total+" total quotes.");
	}
}