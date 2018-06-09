const fuzz = require('fuzzball');
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
		const quoteRe = /^"((.|\n)*)" - (.*) \d{4}$/;
		if (quoteRe.test(quote.quote)){
			// search latest messages in channel for matching quote
			new Promise((resolve, reject) => {
				// CHANGE THIS HARDCODED VALUE LATER
				if (msg.author.id === '101788430479925248') return resolve();

				msg.channel.fetchMessages({limit: 100, before: msg.id})
				.then(msgs => {
					let concatMsgs = '';
					let result = '';
					let q = quoteRe.exec(quote.quote);
					msgs = Array.from(msgs).map(i => i[1]);
					for (let i = 0; i < msgs.length; i++){
						let m = msgs[i];
						if (re.test(m.content) || m.author.bot) continue;
						concatMsgs = m.content + (concatMsgs ? '\n' + concatMsgs : '');
						let r = fuzz.partial_ratio(m.content, quote.quote);

						if (fuzz.ratio(q[1], concatMsgs) === 100 || fuzz.ratio(q[1], m.content) === 100){
							return resolve();
						} else if (r >= 70){
							result = m.content + (result ? '\n'+result : '');
						} else {
							concatMsgs = '';
						}
					}

					if (!result) return reject('Quote does not exist');

					msg.reply(`**DID YOU MEAN THIS?:**\n\n${result}`)
						.then(m => {
							m.react('🇾').then(() => {
							m.react('🇳');});
							m.awaitReactions((reaction, user) => {
								if (reaction.emoji.name === '🇾' && user.id === msg.author.id){
									quote.quote = q[0].replace(q[1], result);
									m.delete();
									resolve();
								} else if (reaction.emoji.name === '🇳' && user.id === msg.author.id){
									m.delete();
									reject();
								}
							}, {time: 10000})
						});
				})
			})
				.then(() => {
					if (fbgz.quotes){
						fbgz.quotes.push(quote);
					} else{
						fbgz.quotes = [quote];
					}
					jfm.save(fbgz);
					msg.reply(`\n\`\`\`${quoteRe.exec(quote.quote)[1]}\`\`\`\nquote added`);
				})
				.catch(e => {
					if (e) msg.reply(e);
				})
		} else {
			msg.reply('Incorrect format\n ```.fbgzSays add "quote" - name year```');
			return;
		};
	}
}
