const JsonFileManager = require('../utils/JsonFileManager');
let quoteIndexes = [];

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

module.exports = {
	cmdRe: /^\.fbgzSays$/,
	description: '`.fbgzSays` - get a random fbgz quote',
	exec: msg => {
		let fbgz = new JsonFileManager('fbgz.json').load();
		if (!fbgz.quotes.length) return msg.reply('there are 0 quotes');
		if (!quoteIndexes.length){
			quoteIndexes = Array.apply(null, Array(fbgz.quotes.length)).map((x, i) => { return i; });
			shuffle(quoteIndexes);
		}
		msg.channel.send(fbgz.quotes[quoteIndexes.pop()].quote);
	}
}
