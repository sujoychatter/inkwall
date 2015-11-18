var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var DropDown = require('./common/drop_down');
import Router, { Navigation, Link } from 'react-router';
import {startLoading} from '../actions/loader'

module.exports = React.createClass({
	mixins: [Navigation],
	showHideDropDown: function(){
		this.state.showDropDown = !this.state.showDropDown;
		this.setState(this.state);
	},
	getInitialState: function () {
		var data = {};
		if (this.props.user) {
			data = {user: this.props.user, showOptions: false};
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
						window.location.pathname = '/posts/' + JSON.parse(xhr.responseText).id + '/edit';
					}
					else{
						_this.transitionTo('/posts/' + JSON.parse(xhr.responseText).id + '/edit');
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
		this.setState(Object.assign({}, this.state, {showOptions : !this.state.showOptions}))
	},
	render: function () {
		if (this.state.user && this.state.user.name) {
			var userData = {
					userName: this.state.user.name,
					imageURL: this.state.user.photo,
					admin: this.state.user.admin
				},
				divStyle = {backgroundImage: 'url(' + this.state.user.photo + ')'},
				image = <div className="user-image" style={divStyle} onClick={this.showHideDropDown}></div>;
				var newPost = <a className="new-post" onClick={this.newPost}>Write a Post</a>
		}
		else {
			if(this.state.showOptions){}else{}
			var login_options = 
				<div className="login-options layer-1">
					<a className="google" href="/auth/google" onClick={this.startLoading}>
						<div className="image" style={{backgroundImage : "url('/images/google_logo.png')"}}></div>
					</a>
					<a className="facebook" href="/auth/facebook" onClick={this.startLoading}>
						<div className="image" style={{backgroundImage : "url('/images/FB_logo.png')"}}></div>
					</a>
				</div>
			var login = <a className="login-button layer-2" onClick={this.showLoginOptions}><i className="icon icon-login"></i></a>
			var newPost = <a className="new-post" onClick={this.showLoginOptions}>Write a Post</a>
		}
		var logo_link;
		if (ExecutionEnvironment.canUseDOM) {
			logo_link = (<Link to="/" className="site-details">
							<div className="site-name" itemProp="name">Inkwall</div>
						</Link>)
		}
		else{
			logo_link = <a href="/" className="site-details"><div className="site-name" itemProp="name">Inkwall</div></a>
		}
		var options = [
			{name: "New Post", callback: this.newPost, icon: "icon icon-doc"},
			{name: "Profile", callback: this.myProfile, icon: "icon icon-user"},
			{name: "Logout", backend_route: '/logout', icon: "icon icon-off"}
		]
		var loadingClass = this.props.isLoading ? "loader loading" : "loader"
		return (
			<div className="header">
				{logo_link}
				{newPost}
				{login}
				{image}
				<DropDown options={options} showDropDown={this.state.showDropDown}/>
				<span className={"pull-right right-elements" + (this.state.showOptions ? " show" : "")}>
					{login_options}
				</span>
				<div className={loadingClass}></div>
			</div>
		)
	}
});