const escape = require('../utils/reEscape');
const { prefix } = require('../config');
const sharp = require('sharp');
const request = require('request').defaults({ encoding: null });

let re = new RegExp(`^${escape(prefix)}widify( +<:.*?:\\d+>)?( +\\d+)?$`);
module.exports = {
	cmdRe: re,
	description: `\`${prefix}widify <emoji> <widen factor>\` - widens an image or non-unicode emoji; <emoji> and <widen factor> are optional`,
	exec: msg => {
	    let match = re.exec(msg.content);
	    let emoji = match[1] ? /\d+/.exec(match[1])[0] : null;
	    let wfactor = match[2] ? Number(match[2]) : 5;

	    let attachments = msg.attachments.array();
	    if (attachments.length || emoji){
	        let url, width, height;

	        if (attachments.length){
	            url = attachments[0].url;
	            width = attachments[0].width;
	            height = attachments[0].height;
	            if (attachments[0].filesize > 2000000) return msg.reply('file too large (limit 2mb)');
	        } else {
	            url = `https://cdn.discordapp.com/emojis/${emoji}.png?v=1`
	            width = 32;
	            height = 32;
	        }

	        if (width * wfactor > 5000) return msg.reply('resulting width is too large. send a smaller image and/or decrease the widen factor');

	        request.get(url, (err, res, body) => {
	            sharp(new Buffer(body))
	                .resize(width * wfactor, height)
	                .ignoreAspectRatio()
	                .toBuffer()
	                .then(b => {
	                   msg.channel.sendFile(b);//.then(()=>msg.delete());
	                })
	        })
	    }		
	}
}