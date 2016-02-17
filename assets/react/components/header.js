var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var DropDown = require('./common/drop_down');
import Router, { Navigation, Link } from 'react-router';
import {startLoading} from '../actions/loader'
import Base64 from '../helpers/base64';
import LoginHelper from './common/login_helper';

module.exports = React.createClass({
	mixins: [Navigation],
	showHideDropDown: function(){
		this.state.showDropDown = !this.state.showDropDown;
		this.setState(this.state);
	},
	getInitialState: function () {
		var data = {};
		if (this.props.user) {
			data = {user: this.props.user, showOptions: false, highlightLogin: false};
		}
		return data;
	},
	myProfile: function(event){
		this.supress(event)
		var user_id = this.state.user.id;
		if(user_id){
			this.transitionTo('/profile/' + user_id);
		}else{
			return null
		}
	},
	supress: function(event){
		event.preventDefault()
		event.stopPropagation()
	},
	startLoading: function(){
		this.props.dispatch(startLoading())
	},
	newPost: function(){
		var _this = this;
		function handleNewPost(){
			if(xhr.readyState == 4){
				if(xhr.status == 201){
					if(window.location.pathname.match(/\/posts\/\d+\/edit/)){
						window.location.pathname = '/posts/' +  Base64.encode(JSON.parse(xhr.responseText).id.toString()) + '/edit';
					}
					else{
						_this.transitionTo('/posts/' + Base64.encode(JSON.parse(xhr.responseText).id.toString()) + '/edit');
					}
				}
			}
		};
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/posts/create', true);
		xhr.onreadystatechange = handleNewPost;
		xhr.send();
	},
	showLoginOptions: function(){
		if(!this.state.showOptions){
			this.setState(Object.assign({}, this.state, {showOptions : true}))
		}
		else{
			console.log('highlight')
			this.setState(Object.assign({}, this.state, {highlightLogin : true}));
			var self = this;
			setTimeout(function(){
				self.setState(Object.assign({}, this.state, {highlightLogin : false}))
				console.log('highlight off')
			}, 300)
		}
	},
	getHeaderInfo: function(){
		var newPost, header_info;
		if (this.state.user && this.state.user.name) {
			var divStyle = {backgroundImage: 'url(' + this.state.user.photo + ')'},
			header_info = 
				<span className="pull-right">
					<a className="header-link" onClick={this.newPost}><i className='icon-pencil'></i>Write |</a>
					<div className="user-image" style={divStyle} onClick={this.showHideDropDown}></div>
				</span>
		}
		else {
			header_info =
				<span className={"pull-right right-elements"}>
					<a className="header-link" onClick={this.showLoginOptions}><i className='icon-pencil'></i>Write |</a>
					<LoginHelper extClasses={this.state.highlightLogin ? 'bigger' : ''}/>
				</span>
		}
		return header_info
	},
	getLoginButton: function(){
		var login;
		if (! (this.state.user && this.state.user.name) ) {
			login = <a className="pull-right header-link signin" onClick={this.showLoginOptions}><i className="icon-login"></i>SignIn</a>
		}
		return login
	},
	render: function () {
		var logo_link;
		if (ExecutionEnvironment.canUseDOM) {
			logo_link = (<Link to="/" className="site-details">
							INKWALL
						</Link>)
		}
		else{
			logo_link = <a href="/" className="site-details">INKWALL</a>
		}
		
		var options = [
			{name: "New Post", callback: this.newPost, icon: "icon icon-doc"},
			{name: "Profile", callback: this.myProfile, icon: "icon icon-user"},
			{name: "Logout", backend_route: '/logout', icon: "icon icon-off"}
		]
		var loadingClass = this.props.isLoading ? "loader loading" : "loader"
		return (
			<div className={"header " + (this.props.transparent ? 'transparent ' : '') + (this.state.showOptions ? "show-login" : "")}>
				{logo_link}
				<DropDown options={options} showDropDown={this.state.showDropDown}/>
				{this.getLoginButton()}
				{this.getHeaderInfo()}
				<div className={loadingClass}></div>
			</div>
		)
	}
});