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
					msg.react("🔎").then(msg=>{
					msg.message.react("🇸").then(msg=>{
					msg.message.react("🇵").then(msg=>{
					msg.message.react("🇴").then(msg=>{
					msg.message.react("🇮").then(msg=>{
					msg.message.react("🇱").then(msg=>{
					msg.message.react("🇪").then(msg=>{
					msg.message.react("🇷").then(msg=>{
					})})})})})})})});
			});
		});
	}
}