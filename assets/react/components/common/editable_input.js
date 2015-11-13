import React, { Component, PropTypes } from 'react';

export default class EditableField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.text,
			is_editing: false
		};
	}
	edit(event) {
		this.setState({is_editing: true})
	}
	done(event){
		if(event.keyCode == 13) {
			if(this.props.update_cb){
				this.setState({is_editing: false})
				this.props.update_cb(this.state.value, event)
			}
		}
	}
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	render() {
		var value = this.state.value, elems = [], elem;
		if(!this.state.is_editing){
			elem = (<div className="ei-text-container" onClick={this.edit.bind(this)}>
						<div className="ei-text">{this.state.value}</div>
						<div className="ei-action">Edit</div>
					</div>)
		}else{
			elem = (<div className="ei-edit-container">
						<input autoFocus={true} className="ei-input" onChange={this.handleChange.bind(this)} value={this.state.value} onKeyDown={this.done.bind(this)}/>
					</div>)
		}
		elems.push(elem)
		return (
			<div className="editable-input">
				{elems}
			</div>
		)
	}
}