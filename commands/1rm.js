function calcORM(w, r){
	let oneRepMaxes = {
		lom1rm: w * Math.pow(r, 1 / 10),
		brz1rm: w * (36 / (37 - r)),
		epl1rm: w * (1 + (r / 30)),
		may1rm: (w * 100) / (52.2 + (41.9 * Math.exp(-1 * (r * 0.055)))),
		oco1rm: w * (1 + r * 0.025),
		wat1rm: (w * 100) / (48.8 + (53.8 * Math.exp(-1 * (r * 0.075)))),
		lan1rm: w * 100 / (101.3 - 2.67123 * r)
	}

	let result = 0;

	for (let orm in oneRepMaxes){
		result += oneRepMaxes[orm];
	}

	return Math.floor(result/Object.keys(oneRepMaxes).length);
}

const re = /^\.1rm (\d+)x(\d+)$/;
module.exports = {
	cmdRe: re,
	description: '`.1rm <weight>x<reps>` - computes 1 rep max given weight x reps',
	exec: msg => {
		let params = re.exec(msg.content);
		let w = Number(params[1]);
		let r = Number(params[2]);
		msg.reply(calcORM(w, r));
	}
}