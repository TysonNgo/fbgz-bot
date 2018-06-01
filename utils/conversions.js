function C2F(t, F2C=false){
	t = Number(t);
	return F2C ?
		((t-32)/1.8).toFixed(1) :
		(t*1.8+32).toFixed(1);
}

function kg2lb(w, lb2kg=false){
	w = Number(w);
	return lb2kg ?
		(w/2.20462).toFixed(1) :
		(w*2.20462).toFixed(1);
}


let exec = {
	kg2lb: kg2lb,
	lb2kg: w => kg2lb(w, true),
	C2F:   C2F,
	F2C:   t => C2F(t, true)
}

let re = {
	kg2lb: /(\d+(\.\d+)?) ?kgs?(?=\s|$)/gi,
	lb2kg: /(\d+(\.\d+)?) ?lbs?(?=\s|$)/gi,
	C2F:   /(-?\d+(\.\d+)?) ?C(?=\s|$)/g,
	F2C:   /(-?\d+(\.\d+)?) ?F(?=\s|$)/g
}

module.exports = bot => {
	bot.on('message', msg => {
		if (msg.author.bot || msg.channel.type === 'dm') return;
		new Promise((resolve, reject) => {
			let result = '';
			for (let r in re){
				if (re[r].test(msg.content)){
					let [a, b] = r.split('2');
					let match = msg.content.match(re[r]);
					for (let i = 0; i < match.length; i++){
						let u = new RegExp('^(-?\\d+(\.\\d+)?)').exec(match[i])[1];
						result += `${u} ${a} ~ ${exec[r](u)} ${b}\n`;
					}
				}
			}
			if (result)	resolve(result);
			else reject();
		})
			.then(res => {
				msg.channel.send(res);
			})
			.catch(e => {})
	})
}