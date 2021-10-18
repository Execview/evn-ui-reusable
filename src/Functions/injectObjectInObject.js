const injectObjectInObject = (io,a,pos) => {
	let okeys = Object.keys(io)
	let o = {...io}
	const ObjectToReplace = Object.keys(a).find((k)=>okeys.includes(k))
	if(ObjectToReplace){
		okeys = okeys.filter(k=>k!==ObjectToReplace)
		const {[ObjectToReplace]:_, ...rest} = o
		o = rest
	}

	let n;
	switch(pos){
		case 'start': n=0; break;
		case 'end': n=-1; break;
		default: n = pos || (pos===0 ? 0 : -1)
	}
	
	n = n > okeys.length ? okeys.length : n
	n = n < -1 * okeys.length ? 0 : n
	n = n < 0 ? okeys.length + 1 + n : n

	if(n===0){return {...a,...o};}
	if(n===okeys.length){return {...o,...a};}

	let newO = {}	
	okeys.forEach((id,i)=>{
		if(i===n){newO={...newO,...a};}
		newO[id] = o[id]
	})
	return newO
}

export default injectObjectInObject;