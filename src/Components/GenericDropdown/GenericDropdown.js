import React, { useEffect, useMemo } from 'react';
import OCO from '../OCO/OCO'
import {Element, scroller} from 'react-scroll'
import classes from './GenericDropdown.module.css';

const GenericDropDown = (props) => {
	const randomContainerId = useMemo(()=>Math.random().toString(),[])
	const autoscroll = props.autoscroll || {}

	useEffect(()=>{
		const isId = typeof(autoscroll) === 'string'
		const scrollId = isId ? autoscroll : autoscroll.id
		let scrollSettings = {containerId: randomContainerId}
		if(!isId) {scrollSettings = {...scrollSettings, ...autoscroll}}
		try{
			scrollId && scroller.scrollTo(scrollId,scrollSettings)
		} catch (e) {}
	},[JSON.stringify(autoscroll)])

	const handleClickOutside = props.onBlur || (() => { });

	const style = props.style
	const dropdownClasses = props.genericDropdownClasses || {};
	const submit = props.submit || (() => { });
	const options = props.options || {}

	const searchBar = <input className={`${classes['dropdown-input']} ${dropdownClasses.dropdownInput || ''}`} autoFocus={props.autoFocus} type="text" value={props.searchString} onChange={e => props.onSearchChange(e.target.value)} placeholder={props.placeholder || 'Search..'} />

	return (
		<OCO OCO={handleClickOutside}>
			<div className={`${classes['dropdown']} ${dropdownClasses.dropdown || ''}`} style={style}>
				{props.canSearch && searchBar}
				<Element name={randomContainerId} id={randomContainerId} className={`${classes['dropdown-menu']} ${dropdownClasses.dropdownMenu || ''}`}>
					{Object.keys(options).map(v => (
						<Element name={v} key={v} className={`${classes['dropdown-item']} ${dropdownClasses.dropdownItem || ''}`} onClick={e => submit(v)}>
							{options[v]}
						</Element>
					))}
				</Element>
			</div>
		</OCO>
	);
}

export default GenericDropDown;
