const escape = require('../utils/reEscape');
const { prefix } = require('../config');
const JsonFileManager = require('../utils/JsonFileManager');
let quoteIndexes = [];

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

module.exports = {
	cmdRe: new RegExp(`^${escape(prefix)}fbgzSays$`),
	description: `\`${prefix}fbgzSays\` - get a random fbgz quote`,
	exec: msg => {
		let fbgz = new JsonFileManager('fbgz.json').load();
		if (!fbgz.quotes.length) return msg.reply('there are 0 quotes');
		if (!quoteIndexes.length){
			quoteIndexes = Array.apply(null, Array(fbgz.quotes.length)).map((x, i) => { return i; });
			shuffle(quoteIndexes);
		}
		const q = fbgz.quotes[quoteIndexes.pop()];
		let color = 0xFFFFFF;
		let icon_url;
		let member;
		try{
			member = msg.guild.members.get(q.by_id);
			color = member.displayColor;
			icon_url = member.user.avatarURL;
		} catch(e) {}
		msg.channel.send({
			embed: {
				color: color,
				description: q.quote,
				author: {
					name: q.by.replace(/^([a-z])/, c => c.toUpperCase()),
					icon_url: icon_url
				},
				footer: {
					text: `- ${q.year}`
				}
			}
		});
	}
}
