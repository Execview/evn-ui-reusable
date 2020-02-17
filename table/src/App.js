import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Button, RightClickMenuWrapper } from '@execview/reusable';
import TableWrapper from './tableWrapper/TableWrapper';
import * as actionTypes from './store/actionTypes';
import { cellTypes, dataSort, rowValidation, rules, columnsInfo } from './store/configSwitch';
import cats from './store/ElCatso';
import InPlaceCell from './cells/InPlaceCell/InPlaceCell';
import ColorCell from './cells/colorCell/ColorCell';
import DateCell from './cells/dateCell/DateCell';
import DropdownCell from './cells/dropdownCell/DropdownCell';
import GenericAssignCell from './cells/genericAssignCell/GenericAssignCell';
import ImageDisplay from './cells/imageDisplay/ImageDisplay';
import { useThemeApplier, defaultTheme } from '@execview/themedesigner'
import classes from './App.module.css';

const crypto = require('crypto');
const hash = crypto.createHash('sha256');

const App = (props) => {
	useThemeApplier(defaultTheme)
	const [data, setData] = useState({})
	const [config, setConfig] = useState({depth:0,columns:{}})
	const setFilterMeta = (col,newMeta) => {
		setConfig({
			...config,
			columns: {
				...config.columns,
				[col]: {
					...config.columns[col],
					filters: newMeta
				}
			}
		})
	}

	useEffect(() => {
		setData(props.data);
	}, [props]);


	// const t1 = {};
	// for (let i = 0; i < 5; i++) {
	//   t1[Object.keys(data)[i]] = data[Object.keys(data)[i]];
	// }
	const dataKeys = Object.keys(data);
	const t2 = {};
	for (let i = 0; i < dataKeys.length; i++) {
		t2[dataKeys[i]] = data[dataKeys[i]];
	}
	const allData = t2

	let filteredData = allData
	Object.keys(config.columns).forEach((col)=>{
		const meta = config.columns[col] && config.columns[col].filters
		if(columnsInfo[col].filterFunction){
			// console.log(col)
			// console.log(meta)
			filteredData = columnsInfo[col].filterFunction(filteredData,col,meta)
		} else { /*console.log(`filter function does not exist for: ${col}`)*/ }
	})

	const randomNumber = Math.floor((Math.random() * cats.length));




	const InPlaceCellPropsText = { data: '', onValidateSave: ((x) => { console.log(x); }) };
	const InPlaceCellPropsTextarea = {...InPlaceCellPropsText, wrap:true, classes:{text:classes['black-text'], textareaPlaceholder:classes['red-text']}}
	const InPlaceCellPropsColour = { data: 'green', type: <ColorCell />, onValidateSave: ((x) => { console.log(x); }) };
	const InPlaceCellPropsDate = useMemo(() => { return { data: new Date('2019-12-25'), type: <DateCell />, onValidateSave: ((x) => { console.log(x); }) }}, []);
	const InPlaceCellPropsDropdown = { data: 'apple', type: <DropdownCell options={['apple', 'banana', 'cat']} />, onValidateSave: ((x) => { console.log(x); }) };

	const gaais = { a: { name: 'apple', image: 'https://i.imgur.com/ruSaBxM.jpg' }, b: { name: 'banana', image: 'https://i.imgur.com/6lreFDw.jpg' }, c: { name: 'cat', image: 'https://i.imgur.com/OYBnpPT.jpg' } };
	const Display = (props) => {
		const items = props.items || [];
		const imageDisplayData = gaais && (items.map(u => gaais[u].image) || []);
		return <ImageDisplay data={imageDisplayData} style={props.style} />;
	};
	const InPlaceCellPropsGenericAssign = { data: ['b', 'c'], type: <GenericAssignCell items={gaais} getOption={id => <div>{gaais[id].name}</div>} getSearchField={id => gaais[id].name} display={<Display />} />, onValidateSave: ((x) => { console.log(x); }), style:{width: '70px'} };

	const addRow = () => {
		console.log('adding new row')
		const newId = '_' + hash.update(Date.now() + Math.random().toString()).digest('hex').substring(0, 5);
		props.onSave(newId, {}, Object.keys(columnsInfo));
	}
	const getContextMenu = (col) => {
		const filterComponent = columnsInfo[col] && columnsInfo[col].filter
		if (!filterComponent) { return null; }
		return (
			<RightClickMenuWrapper>
				<div className={classes['rcm']}>

				{filterComponent && React.cloneElement(filterComponent, {
					...filterComponent.props,
					meta: config.columns[col] && config.columns[col].filters,
					setMeta: ((newMeta)=>setFilterMeta(col,newMeta)),
					className: classes['context-filter']
				})}
				</div>
			</RightClickMenuWrapper>
		)
	}

	return (
		<div className={`${classes["App"]}`}>
			
			<div>
				<Button style={{margin:'10px', padding: '30px', paddingTop:'15px', paddingBottom:'15px'}} onClick={addRow}>Add row</Button>
				<TableWrapper
					columnsInfo={columnsInfo}
					editableCells={props.editableCells}
					data={filteredData}
					cellTypes={cellTypes}
					onSave={props.onSave}
					rules={rules}
					dataSort={dataSort}
					tableWidth={1200}
					selectedRow={'_2'}
					getContextMenu={getContextMenu}
				/>
			</div>
			<div style={{ margin: 'auto', marginTop: '30px', maxWidth: '400px' }}>
				<img style={{ marginTop: '30px', maxWidth: '100%' }} src={cats[randomNumber]} alt="xd" />
			</div>
			<div className={classes["inplacecells"]}>
				<InPlaceCell {...InPlaceCellPropsText} />
				<InPlaceCell {...InPlaceCellPropsTextarea} />
				<InPlaceCell {...InPlaceCellPropsColour} />
				<InPlaceCell {...InPlaceCellPropsDate} />
				<InPlaceCell {...InPlaceCellPropsDropdown} />
				<InPlaceCell {...InPlaceCellPropsGenericAssign} />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		data: state.data,
		editableCells: state.editableCells,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSave: (rowId, rowValues, editableValues) => dispatch({ type: actionTypes.SAVE, rowId, rowValues, editableValues }),
		onAddRow: () => dispatch({ type: actionTypes.ADD_ROW })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
