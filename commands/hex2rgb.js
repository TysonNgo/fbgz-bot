const escape = require('../utils/reEscape');
const { prefix } = require('../config');

function hex2RGB(hexStr){
	let val = parseInt(hexStr, 16);
	let b = val & 0xff;
	val >>= 8; 
	let g = val & 0xff;
	val >>= 8;
	let r = val & 0xff;
	return {
		r: r,
		g: g,
		b: b
	}
}

function rgb2Hex(r, g, b){
	let result = 0;
	result = (result + r) << 8;
	result = (result + g) << 8;
	result += b;
	return '#'+result.toString(16).padStart(6, '0');
}

const re = new RegExp(`^${escape(prefix)}(rgb2hex|hex2rgb) (((\\d{3}),\\s*(\\d{3}),\\s*(\\d{3}))|(#?([\\dabcdef]{6})))$`)
module.exports = {
	cmdRe: re,
	description: `\`${prefix}hex2rgb\` - converts hex to RGB\n\`${prefix}rgb2hex\` - converts RGB to hex`,
	exec: msg => {
		let args = re.exec(msg.content);
		switch (args[1]){
			case 'rgb2hex':
				if (args[4]){
					let r = Number(args[4]);
					let g = Number(args[5]);
					let b = Number(args[6]);
					msg.reply(rgb2Hex(r, g, b));
				}
				break;
			case 'hex2rgb':
				if (args[8]){
					let {r, g, b} = hex2RGB(args[8])
					msg.reply(`rgb(${r},${g},${b})`);
				}
				break;
		}
	}
}
