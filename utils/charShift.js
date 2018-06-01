module.exports = function(str, reverse=false){
	let result = "";
	let shift = reverse ? -1 : 1;
	for (var i = 0; i<str.length; i++){
		result += String.fromCharCode(str[i].charCodeAt(0)+shift);
	}
	return result;
}