const ISOSTRINGPATTERN = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/
function objectCopierWithStringToDate(o) {
		var newO,i;
		if (typeof o !== 'object') {
			if(typeof o === 'string' && RegExp(ISOSTRINGPATTERN).test(o)){return new Date(o)}
			return o;
		}
		if (!o) {return o;}
		var str = Object.prototype.toString.apply(o)		
		if ('[object Array]' === str) { 
			newO = [];
			for (i = 0; i < o.length; i += 1) {newO[i] = objectCopierWithStringToDate(o[i]);}
			return newO;}		
		if('[object Date]' === str){return new Date(o)}	
		newO = {};
		for (i in o) {
			if (o.hasOwnProperty(i)) {newO[i] = objectCopierWithStringToDate(o[i]);}
		}
		return newO;
}

export default objectCopierWithStringToDate;