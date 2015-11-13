import React, { Component, PropTypes } from 'react';
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var Header = require('./components/header.js');
import { bindActionCreators } from 'redux';
import * as postsActions from './actions/posts';

export default class Wrapper extends Component{
	constructor(props){
		super(props);
	}
	// handleScroll(e) {
	// 	if (e.target.scrollTop > 10) {
	// 		document.body.className = "shrunk-header"
	// 	}
	// 	else if (e.target.scrollTop < 10) {
	// 		document.body.className = ""
	// 	}
	// }
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
		if(typeof ga != "undefined"){
			ga('set', 'page', window.location.pathname);
			ga('send', 'pageview');
		}
	}
	componentWillUnmount() {
		// if (ExecutionEnvironment.canUseDOM) {
		// 	document.getElementsByClassName('wrapper')[0].removeEventListener('scroll', this.handleScroll);
		// }
	}
	render() {
		const { dispatch } = this.props;
		this.props.actions = bindActionCreators(postsActions, dispatch);
		var Child = this.props.child;
		return (
			<div className="main-content">
				<Header user={this.props.user}/>
				<Child {...this.props}/>
			</div>
		)
	}
};