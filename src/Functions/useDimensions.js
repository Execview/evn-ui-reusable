import { useEffect, useRef, useState } from "react"

const useDimensions = (options={}) => {
	const replacementRef = options.ref
	const getNodeFromCurrent = options.getNodeFromCurrent || ((c)=>c)
	const windowSize = useWindowSize()
	const internalRef = useRef()
	const myRef = replacementRef || internalRef

	const getRect = () => {
		const currentNode = getNodeFromCurrent(myRef?.current)
		const BCR = currentNode && currentNode.getBoundingClientRect();
		if(!BCR){return {}}
		const rect = {
			x: BCR.left + window.pageXOffset,
			y: BCR.top + window.scrollY,
			screenX: BCR.left,
			screenY: BCR.top,
			width: BCR.width,
			height: BCR.height
		};
		return rect
	}

	return [myRef, getRect]
}

export default useDimensions

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({width:0, height:0})
	const onResize = () => setWindowSize({
		width: window.innerWidth,
		height: window.innerHeight
	})
	useEffect(()=>{
		window.addEventListener('resize', onResize);
		return (()=>window.removeEventListener('resize', onResize));
	},[])
	
	return windowSize
}
