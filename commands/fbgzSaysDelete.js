const escape = require('../utils/reEscape');
const { prefix } = require('../config');
const JsonFileManager = require('../utils/JsonFileManager');

const re = new RegExp(`^${escape(prefix)}fbgzSays delete (\\d+)$`);
module.exports = {
	cmdRe: re,
	description: `\`${prefix}fbgzSays delete <i>\` - delete a quote by index`,
	exec: msg => {
		if (msg.author.id !== '101788430479925248') return;
		let jfm = new JsonFileManager('fbgz.json');
		let fbgz = jfm.load();
		let quotes = fbgz.quotes;
		let index = Number(re.exec(msg.content)[1]);

		if (quotes && index < quotes.length){
			let q = quotes[index];
			quotes.splice(index, 1);
			jfm.save(fbgz);
			msg.reply(`\n"${q.quote}" - ${q.by} ${q.year}\n\nquote deleted`);
		}
	}
}
