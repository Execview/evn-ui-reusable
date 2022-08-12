import React, { useState, useEffect } from 'react';
import RightClickMenu from './RightClickMenu';
import useDimensions from '../../Functions/useDimensions';

const RightClickMenuWrapper = (props) => {
	const getParentFromCurrent = (c) => c && c.parentNode
	const [wrapperRef, getParentDimensions] = useDimensions({getNodeFromCurrent: getParentFromCurrent})
	const parentNode = getParentFromCurrent(wrapperRef?.current)
	const [selfOpen, setSelfOpen] = useState(false)
	const [open, setOpen] = props.setOpen ? [props.open,props.setOpen] : [selfOpen, setSelfOpen]
	const [position, setPosition] = useState(null);

	const openMenu = (e) => {
		if (props.stopPropagation) { e.stopPropagation(); }

		if (props.takeParentLocation) {
			setOpen(true)
			setPosition(getParentDimensions());
			
		} else {
			const newMousePosition = {
				x: e.pageX,
				y: e.pageY,
				screenX: e.clientX,
				screenY: e.clientY,
				width: 0,
				height: 0
			};
			setPosition(newMousePosition);
			setOpen(true)
		}
	};

	useEffect(() => {
		if (!parentNode) { return; }
		const onLeftClick = (e) => { if (props.onLeftClick) { openMenu(e); } };
		const onContextMenu = (e) => { if (!props.onLeftClick) { e.preventDefault(); openMenu(e); } };
		parentNode.addEventListener('click', onLeftClick);
		parentNode.addEventListener('contextmenu', onContextMenu);
		
		return (() => {
			parentNode.removeEventListener('click',onLeftClick)
			parentNode.removeEventListener('contextmenu',onContextMenu)
		})
	});

	return (
        <div ref={wrapperRef}>
			{position && open && (
				<RightClickMenu
					rightClickDOMNode={props.rightClickDOMNode}
					dontPortal={props.dontPortal}
					inline={props.inline}
					position={position}
					takeParentLocation={props.takeParentLocation}
					closeMenu={()=>setOpen(false)}
					enableModal={props.enableModal}
					forceModal={props.forceModal}
					rightClickMenuClassName={props.rightClickMenuClassName}
					modalClassName={props.modalClassName}
					rightClickMenuStyle={props.rightClickMenuStyle}
					modalStyle={props.modalStyle}
					OCOProps ={props.OCOProps}
					moveBox={props.moveBox}
					slideBox={props.slideBox}
				>
					{props.children}
				</RightClickMenu>
			)}
        </div>
	);
};

export default RightClickMenuWrapper;
