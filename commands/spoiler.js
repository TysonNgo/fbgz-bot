const charShift = require('../utils/charShift');

let re = /^\.spoiler ((.|\n)*)$/;
module.exports = {
	cmdRe: re,
	description: '`.spoiler <message>` - sends a low effort encryption of the message; can be revealed by reacting with the bot',
	exec: msg => {
		msg.delete().then(msg => {
			msg.channel.send(
				`<@${msg.author.id}>\n`+
				charShift(re.exec(msg.content)[1])).then(msg =>{
					let emojis = [
						msg.react('🔎'),
						'🇸', '🇵', '🇴', '🇮', '🇱', '🇪', '🇷'];
					emojis.reduce((a, b) => a.then(r => r.message.react(b)));
					msg.awaitReactions((reaction, user) => {
						if (!reaction.me) return;
						let content = reaction.message.content.split('\n').pop();
						if (reaction.message.reactions.first()._emoji.name == '🔎'){
							if (!user.dmChannel){
								user.createDM().then(dm => {
									dm.send(charShift(content, reverse=true));
								});
							}else{
								user.dmChannel.send(charShift(content, reverse=true));
							}
						}
					})
			});
		});
	}
}