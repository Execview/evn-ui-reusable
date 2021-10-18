import React from 'react';
import classes from './Panel.module.css';

const Panel = React.forwardRef((props,ref) => {
	const caretDimensions = props.caretDimensions || [18,9]
	const caretAdjustment = props.caretAdjustment || [0,0]
	const caretPosition = props.caretPosition || ['top','left']
	const caretDown = caretPosition[0]==='bottom'
	const borderWidths = [
		caretDown ? caretDimensions[1] : 0,
		caretDimensions[0]/2,
		caretDown ? 0 : caretDimensions[1],
		caretDimensions[0]/2
	]

	let caretStyles = {
		borderWidth: borderWidths.join('px ')+'px',
		[caretPosition[0]]: -1*caretDimensions[1] + caretAdjustment[1],
		[caretPosition[1]]: caretAdjustment[0]
	}
	
	return (
		<div ref={ref} className={`${classes['panel']} ${!props.hideCaret ? classes['panel-padding'] : ''} ${props.className || ''}`} style={props.style}>
			{!props.hideCaret && <div className={`${classes['absolute-caret']} ${classes['absolute-caret-border-colors-'+(caretDown ? 'down' : 'up')]}`} style={caretStyles} />}
			{props.children}
		</div>
	);
});

export default Panel;
