const fs = require('fs');

module.exports = class JsonFileManager{
	constructor(filename){
		this.filename = filename;
	}

	load(){
		return JSON.parse(fs.readFileSync(__dirname+'/../jsons/'+this.filename));
	}

	save(obj){
		fs.writeFileSync(__dirname+'/../jsons/'+this.filename, JSON.stringify(obj))
	}
}