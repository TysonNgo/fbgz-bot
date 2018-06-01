const JsonFileManager = require('../utils/JsonFileManager');

const re = /^\.fbgzSays add ((.|\n)*)$$/;
module.exports = {
	cmdRe: re,
	description: '`.fbgzSays add "<quote>" - <name> <year>` - adds a fbgz quote',
	exec: msg => {
		let jfm = new JsonFileManager('fbgz.json');
		let fbgz = jfm.load();
		let quote = {
			quote: re.exec(msg.content)[1],
			added_by: msg.author.id,
		};
		if (/^"((.|\n)*)" - (.*) \d{4}$/.test(quote.quote)){
			if (fbgz.quotes){
				fbgz.quotes.push(quote);
			} else{
				fbgz.quotes = [quote];
			}
		} else {
			msg.reply('Incorrect format\n ```.fbgzSays add "quote" - name year```');
			return;
		}
		jfm.save(fbgz);
		msg.reply("quote added");
	}
}