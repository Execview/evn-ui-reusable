import { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

class OCO extends Component {
	handleClickOutside() {
		this.props.OCO()
	}
    render() {
        return (
            this.props.children
        );
    }
}
export default onClickOutside(OCO)