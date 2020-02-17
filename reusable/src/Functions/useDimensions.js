import useFunctionalRef from "./useFunctionalRef"

const useDimensions = (options={}) => {
	const replacementRef = options.ref
	const getNodeFromCurrent = options.getNodeFromCurrent || ((c)=>c)

	const [myRef, current] = useFunctionalRef(replacementRef)

	const getRect = () => {
		const currentNode = getNodeFromCurrent(current)
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
