const escape = require('../utils/reEscape');
const { prefix } = require('../config');
const fs = require('fs');
const helpRe = new RegExp(`^${escape(prefix)}help$`);

module.exports = bot => {
	let helpDescriptions = [];
	// import the commands
	fs.readdirSync(__dirname)
		.filter(f => f !== 'index.js' && /\.js$/.test(f))
		.forEach(module => {
			const cmd = require('./'+module);
			helpDescriptions.push(cmd.description);
			bot.on('message', msg => {
				if (msg.author.bot || msg.channel.type === 'dm') return;
				if (cmd.cmdRe.test(msg.content)){
					if (cmd.blacklist && ~cmd.blacklist.indexOf(msg.author.id)){
						return msg.reply('you cannot use this command.');
					}
					cmd.exec(msg);
				}
			})
		});
	bot.on('message', msg => {
		if (msg.author.bot || msg.channel.type === 'dm') return;
		if (helpRe.test(msg.content)){
			msg.channel.send(
				'List of commands: \n\t'+
				helpDescriptions.join('\n\t')
			);
		}
	})
}
