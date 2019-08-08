import React, { useState } from 'react';
import { GenericDropdown, OCO } from '@execview/reusable';

const GenericAssign = (props) => {
	const data = props.items || [];
	const allItems = props.allItems || {};

	const [leftSearchString, setLeftSearchString] = useState('');
	const [rightSearchString, setRightSearchString] = useState('');

	const isEditable = props.isEditable;

	const unassignGeneric = (itemId) => {
		props.onValidateSave(data.filter(el => el !== itemId));
	};

	const assignGeneric = (newItem) => {
		props.onValidateSave([...data, newItem]);
	};	

	
	const getSearchField = props.getSearchField || (() => { console.log('cant search'); return ''; });
	const getOption = props.getOption || (() => { console.log('cant generate options'); return {}; });

	const generateOptions = (ids) => {
		return ids.reduce((t, id) => {
			const option = getOption(id);
			return { ...t,
				[id]: option
			};
		}, {});
	};


	const leftOptions = generateOptions(data);
	const rightOptions = generateOptions(Object.keys(allItems).filter(i => !data.includes(i)));
		

	const filteredLeftOptions = Object.keys(leftOptions).filter(k => getSearchField(k).toLowerCase().includes(leftSearchString)).reduce((t, k) => { return { ...t, [k]: leftOptions[k] }; }, {});

	const filteredRightOptions = Object.keys(rightOptions).filter(k => getSearchField(k).toLowerCase().includes(rightSearchString)).reduce((t, k) => { return { ...t, [k]: rightOptions[k] }; }, {});
	const style = { width: '300px' };
	return (
		<OCO OCO={() => props.closeMenu()}>
			<div className="generic-menu">
				<div className="absolute-caret" />
				<div>
					{props.leftTitle}
					<GenericDropdown
						submit={(key) => { if (isEditable) { unassignGeneric(key); } }}
						canSearch={true}
						autoFocus={true}
						onSearchChange={v => setLeftSearchString(v)}
						searchString={leftSearchString}
						options={filteredLeftOptions}
						style={style}
					/>
				</div>
				{isEditable && (
					<div>
						{props.rightTitle}
						<GenericDropdown
							submit={(key) => { if (isEditable) { assignGeneric(key); } }}
							canSearch={true}
							autoFocus={true}
							onSearchChange={v => setRightSearchString(v)}
							searchString={rightSearchString}
							options={filteredRightOptions}
							style={style}
						/>
					</div>
				)}
			</div>
		</OCO>
	);
};

export default GenericAssign;