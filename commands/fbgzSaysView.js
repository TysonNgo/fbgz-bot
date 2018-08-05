const escape = require('../utils/reEscape');
const { prefix } = require('../config');
const JsonFileManager = require('../utils/JsonFileManager');

const re = new RegExp(`^${escape(prefix)}fbgzSays view( -a)?$`);
module.exports = {
	cmdRe: re,
	description: `\`${prefix}fbgzSays view\` - see the quotes you have added`,
	exec: msg => {
		let fbgz = new JsonFileManager('fbgz.json').load();
		let quotes = fbgz.quotes;
		if (quotes){
			let results = [[]];
			for (let i = 0; i < quotes.length; i++){
				let q = quotes[i]
				if (msg.author.id === q.added_by || re.exec(msg.content)[1]){
					let result = results[results.length-1];
					if (result.length === 25){
						results.push([]);
					}
					results[results.length-1].push({
						name: i,
						value: `"${q.quote}" - ${q.by} ${q.year}`
					});
				}
			}
			for (let i = 0; i < results.length; i++){
				setTimeout(() =>{
					msg.channel.send({
						embed: {
							color: 0xDDDDDD,
							description: !i ? '**index**\nquote' : null,
							fields: results[i]
						}
					})
						.then(m => {
							m.delete(10000);
						});
				}, 100*i);
			}
		}
	}
}
