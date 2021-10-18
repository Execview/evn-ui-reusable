import React, { Component } from 'react';

//Wrap some components with this to inspect the props it recieves
class PropInspector extends Component {
	render(){
		console.log(this.props)
		const newProps = {...this.props}
        return React.cloneElement(newProps.children,
				{...newProps,
					children: newProps.children && newProps.children.props.children,
				}
			)
    }
}
export default PropInspector;