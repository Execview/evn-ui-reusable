import {useRef, useLayoutEffect, useState} from 'react'

const useFunctionalRef = (replacementRef) => {
	const internalRef = useRef()
	const myRef = replacementRef || internalRef
	const [selfRef, setSelfRef] = useState({current: null})
	useLayoutEffect(()=>{
		if(selfRef.current!==myRef.current){
			setSelfRef(myRef)
		}
	})
	return [myRef, selfRef.current]
}

export default useFunctionalRef