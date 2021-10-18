const recursiveDeepCopy = (o) => {
    var newO,i;	
    if (typeof o !== 'object') {return o;}
    if (!o) {return o;}
    var str = Object.prototype.toString.apply(o)
    if ('[object Array]' === str) {
        newO = [];
        for (i = 0; i < o.length; i += 1) {newO[i] = recursiveDeepCopy(o[i]);}
        return newO;}		
    if('[object Date]' === str){return new Date(o)}	
    newO = {};
    for (i in o) {
    if (o.hasOwnProperty(i)) {newO[i] = recursiveDeepCopy(o[i]);}}
    return newO;
}

export default recursiveDeepCopy;