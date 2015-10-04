import React, { Component, PropTypes } from 'react';
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var Header = require('./components/header.js');

export default class Wrapper extends Component{
	handleScroll(e) {
		if (e.target.scrollTop > 10) {
			document.body.className = "shrunk-header"
		}
		else if (e.target.scrollTop < 10) {
			document.body.className = ""
		}
	}
	componentWillMount(){
		if (ExecutionEnvironment.canUseDOM && this.props.cssElementId && !document.getElementById(this.props.cssElementId)) {
			var linkElement = document.createElement('link');
			linkElement.setAttribute('rel', 'stylesheet');
			linkElement.setAttribute('href', this.props.stylesheetLink);
			linkElement.setAttribute('id', this.props.cssElementId);
			document.body.appendChild(linkElement);
		}
	}
	componentDidMount(){
		if (ExecutionEnvironment.canUseDOM) {
			document.getElementsByClassName('main-content')[0].addEventListener('scroll', this.handleScroll);
		}
	}
	componentWillUnmount() {
		if (ExecutionEnvironment.canUseDOM) {
			document.getElementsByClassName('main-content')[0].removeEventListener('scroll', this.handleScroll);
		}
	}
	render() {
		var Child = this.props.child;
		return (
			<div className="main-content">
				<Header user={this.props.user}/>
				<Child />
			</div>
		)
	}
};