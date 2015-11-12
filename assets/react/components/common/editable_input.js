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
		if(this.props.update_cb){
			this.props.update_cb(this.state.value)
		}
	}
	getInputClass(){
		return "ei-input " + (this.props.classes || "")
	}
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	render() {
		var value = this.state.value, elems = [];
		if(!this.state.is_editing){
			elems.push(<div className="ei-text"> {this.state.value} </div>)
			elems.push(<div onClick={this.edit.bind(this)}> Edit </div>)
		}else{
			elems.push(<input className={this.getInputClass()} onChange={this.handleChange.bind(this)} value={this.state.value}/>)
			elems.push(<div onClick={this.done.bind(this)}> Done </div>)
		}
		return (
			<div className="editable-input">
				{elems}
			</div>
		)
	}
}