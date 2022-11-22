import React from 'react'
import recursiveDeepDiffs from './recursiveDeepDiffs.js'
const recursiveDeepDiffsREACT = (original,updated) => {
	  const filterReactComponent = (c) => {
	    const { _owner, $$typeof, ...rest } = c;
	    return rest;
	  };
	  const stopRecursion = (o, u) => {
	    if (React.isValidElement(o) && React.isValidElement(u)) {
	      if (recursiveDeepDiffs(filterReactComponent(o), filterReactComponent(u), { stopRecursion })) {
	        return 'updated';
	      }
	      return 'ignore';
	    }
	    return 'continue';
	  };
	  const diffs = recursiveDeepDiffs(original, updated, { stopRecursion });
	  return diffs;
}

export default recursiveDeepDiffsREACT