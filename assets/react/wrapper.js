import React, { Component, PropTypes } from 'react';
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var Header = require('./components/header.js');
var Footer = require('./components/footer.js');
import { bindActionCreators } from 'redux';
import * as postsActions from './actions/posts';
import ajax from './helpers/ajax';

export default class Wrapper extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading: true
		}
	}
	setCss(id, responseText, data){
		var styleElement = document.createElement('style');
		styleElement.setAttribute('id', id);
		styleElement.innerHTML = data.response;
		document.body.appendChild(styleElement);
		this.setState(Object.assign({}, this.state, {loading: false}))
	}
	componentWillMount(){
		if (ExecutionEnvironment.canUseDOM && this.props.cssElementId && !document.getElementById(this.props.cssElementId)) {
			ajax('/stylesheets/' + window.manifest[this.props.stylesheetLink],'text/css',this.setCss.bind(this, this.props.cssElementId))
		}
		else{
			this.setState({loading: false})
		}
	}
	componentDidMount(){
		if(typeof ga != "undefined"){
			ga('set', 'page', window.location.pathname);
			ga('set', 'location', window.location.href);
			ga('send', 'pageview');
		}
	}
	getFooter(){
		if(this.props.hideFooter !== true){
			return <Footer />
		}
	}
	render() {
		const { dispatch } = this.props;
		var Child = this.props.child,
			retDiv;
		if(!this.state.loading){
			retDiv = (
				<div className="main-content">
						<Header user={this.props.user} isLoading={this.props.isLoading} dispatch={dispatch} transparent={this.props.transparentHeader}/>
						<Child {...this.props}/>
						{this.getFooter()}
				</div>
			)
		}
		else{
			retDiv = <div></div>
		}
		return retDiv;
	}
};