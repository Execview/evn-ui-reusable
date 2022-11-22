import React, {useState} from 'react';
import Button from './Components/Button/Button.js'
import CircleUser from './Components/CircleUser/CircleUser.js'
import GenericDropdown from './Components/GenericDropdown/GenericDropdown.js'
import TripleFill from './Components/TripleFill/TripleFill.js'
import injectObjectInObject from './Functions/injectObjectInObject.js'
import objectCopierWithStringToDate from './Functions/objectCopierWithStringToDate.js'
import orderedObjectAssign from './Functions/orderedObjectAssign.js'
import recursiveDeepAssign from './Functions/recursiveDeepAssign.js'
import recursiveDeepCopy from './Functions/recursiveDeepCopy.js'
import recursiveDeepDiffs from './Functions/recursiveDeepDiffs.js'
import recursiveDeepDiffsREACT from './Functions/recursiveDeepDiffsREACT.js'
import RightClickMenuWrapper from './Components/RightClickMenu/RightClickMenuWrapper.js';
import { useThemeApplier, defaultTheme } from '@execview/themedesigner'

import classes from './App.module.css';

const App = (props) => {
	useThemeApplier(defaultTheme)
	const RCM = <div style={{width:'500px', height: '200px'}}>Testing very very very very very long</div>
	const ButtonProps = {onClick:(() => console.log('xd'))}
	const CircleUserProps = {size: 50, url: 'https://i.imgur.com/OYBnpPT.jpg'}

	const [genericDropdownPropsSearchString, setGenericDropdownPropsSearchString] = useState('')
	const GenericDropdownPropsAllOptions = {
		a: {name: 'apple', comp: <div>apple</div>},
		b: {name: 'banana', comp: <div>banana</div>},
		c: {name: 'cat', comp: <img style={{width: '200px'}} src='https://i.imgur.com/VqZOPIw.jpg' alt='cat'/>},
		d: {name: 'long', comp: <div>looooooooooooong</div>},
		e: {name: 'five', comp: <div>2.23606797749978</div>},

		f: {name: 'apple', comp: <div>apple</div>},
		g: {name: 'banana', comp: <div>banana</div>},
		h: {name: 'cat', comp: <img style={{width: '200px'}} src='https://i.imgur.com/VqZOPIw.jpg' alt='cat'/>},
		i: {name: 'long', comp: <div>looooooooooooong</div>},
		j: {name: 'five', comp: <div>2.23606797749978</div>},
		k: {name: 'apple', comp: <div>apple</div>},
		l: {name: 'banana', comp: <div>banana</div>},
		m: {name: 'cat', comp: <img style={{width: '200px'}} src='https://i.imgur.com/VqZOPIw.jpg' alt='cat'/>},
		n: {name: 'long', comp: <div>looooooooooooong</div>},
		o: {name: 'five', comp: <div>2.23606797749978</div>},
	}
	const GenericDropdownPropsOptions = Object.keys(GenericDropdownPropsAllOptions).filter(id=>GenericDropdownPropsAllOptions[id].name.includes(genericDropdownPropsSearchString)).reduce((t,i)=>({...t,[i]:GenericDropdownPropsAllOptions[i].comp}),{})
	const GenericDropdownProps = {
		submit: ((optionid)=>console.log(optionid)),
		options: GenericDropdownPropsOptions,
		canSearch: true,
		searchString: genericDropdownPropsSearchString,
		onSearchChange: (v=>setGenericDropdownPropsSearchString(v)),
		autoscroll: {id:'g',smooth: 'easeInOutQuart'}
	}

	return (
		<div className={`${classes["App"]} ${classes['color-scheme']}`}>
			<div>================== start ==================</div>
			<div style={{width:'500px', height: '200px', border: '1px solid white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<RightClickMenuWrapper rightClickMenuClassName={classes['rcm']}>{<GenericDropdown {...GenericDropdownProps} genericDropdownClasses={{dropdown: classes['dropdown'], dropdownMenu: classes['dropdown-menu']}}/>}</RightClickMenuWrapper>
				Right-click me!
			</div>
			<Button {...ButtonProps}>test button</Button>
			<TripleFill left={<div>left</div>} center={<div>middle</div>} right={<div>right</div>}/>
			<CircleUser {...CircleUserProps}/>
			<GenericDropdown {...GenericDropdownProps}/>
			<div>================== end ==================</div>
		</div>
	);
}

export default App;

	//FUNCTIONS
	//injectObjectInObject
		// const ioioa = {a:3,b:4,c:[5,4,7],d:{test:1}}
		// const ioiob = {z:4}
		// console.log(injectObjectInObject(ioioa,ioiob,0))
		// console.log(injectObjectInObject(ioioa,ioiob,1))
		// console.log(injectObjectInObject(ioioa,ioiob,4))
		// console.log(injectObjectInObject(ioioa,ioiob,5))
		// console.log(injectObjectInObject(ioioa,ioiob,8))
		// console.log(injectObjectInObject(ioioa,ioiob,-1))
		// console.log(injectObjectInObject(ioioa,ioiob,-2))
		// console.log(injectObjectInObject(ioioa,ioiob,-4))
		// console.log(injectObjectInObject(ioioa,ioiob,-5))
		// console.log(injectObjectInObject(ioioa,ioiob,-6))
		// console.log(injectObjectInObject(ioioa,ioiob,'start'))
		// console.log(injectObjectInObject(ioioa,ioiob,'end'))
	
	//objectCopierWithStringToDate
		// const ocwstda = {a: 'oompa loompa', b: [1,2,'three'], c: null, d: (new Date()).toISOString()}
		// console.log(objectCopierWithStringToDate(ocwstda))

	//orderedObjectAssign
		// const ooaa = {a: 'oompa loompa', b: [1,2,'three'], c: null, d: (new Date()).toISOString()}
		// console.log(orderedObjectAssign(ooaa,'b','ok'))

	//recursiveDeepAssign
		// const rdaa = {a: 'oompa loompa', b: [1,2,{thr:'thr'}], c: null, d: (new Date()).toISOString()}
		// const rdab = {b: [1,2,{ee:'ee'}], c: 'altered', d: (new Date()).toISOString()}
		// console.log(recursiveDeepAssign(rdaa,rdab))

		// const rdac = {}
		// const rdad = {}
		// console.log(recursiveDeepAssign(rdac,rdad))

	//recursiveDeepCopy
		// const rdc = {a: 'oompa loompa', b: [1,2,'three'], c: null, d: (new Date()).toISOString()}
		// console.log(recursiveDeepCopy(rdc))

	//recursiveDeepDiffs
		// const rdda = {a: 'oompa loompa', b: [1,2,{thr:'thr'}], c: null, d: (new Date()).toISOString()}
		// const rddb = {a: 'oompa loompa', b: [1,4,{thr:'thr'}], c: 'test', d: (new Date()).toISOString()}
		// console.log(recursiveDeepDiffs(rdda,rddb))

	//recursiveDeepDiffsREACT
		// const rdda = {a: 'oompa loompa', b: [1,2,{thr:'thr'}], c: null, d: (new Date()).toISOString(), e: <Button/>}
		// const rddb = {a: 'oompa loompa', b: [1,4,{thr:'thr'}], c: 'test', d: (new Date()).toISOString()}
		// console.log(recursiveDeepDiffsREACT(rdda,rddb))

// BENCHMARK TEST
// const size = 50000
// const find = 'test'
// let arr = []
// let obj = {}
// let start = null;

// const getCurrentTime = () => (new Date()).getTime()
// start = getCurrentTime()
// for(let i=0; i<size; i++){
//   arr.push({row:i, col:'test', content:'hello'+i})

// }
// console.log(getCurrentTime()-start)
// start = getCurrentTime()
// for(let i=0; i<size; i++){

//   obj[i] = {['test']:{content: 'hello'+i}}
// }
// console.log(getCurrentTime()-start)
// start = getCurrentTime()
// const arranswer = arr.filter(el=>el.col===find).map(cell=>cell.content)
// console.log(getCurrentTime()-start)
// start = getCurrentTime()
// const objanswer = Object.keys(obj).map(rowId=>obj[rowId]['test'].content)
// console.log(getCurrentTime()-start)

