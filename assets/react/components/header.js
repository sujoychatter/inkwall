var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var DropDown = require('./common/drop_down');
import Router, { Navigation, Link } from 'react-router';

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
	myProfile: function(){
		var user_id = this.state.user.id;
		if(user_id){
			this.transitionTo('/profile/' + user_id);
		}else{
			return null
		}
	},
	newPost: function(){
		var _this = this;
		function handleNewPost(){
			if(xhr.readyState == 4){
				if(xhr.status == 201){
					_this.transitionTo('/posts/' + JSON.parse(xhr.responseText).id + '/edit');
				}
			}
		};
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/posts/create', true);
		xhr.onreadystatechange = handleNewPost;
		xhr.send();
	},
	showLoginOptions: function(){
		this.setState(Object.assign({}, this.state, {showOptions : true}))
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
				<div className="login-options">
					<a className="google" href="/auth/google">
						<div className="image" style={{backgroundImage : "url('/images/google_logo.png')"}}></div>
						<div className="text">Login with Google</div>
					</a>
					<a className="facebook" href="/auth/facebook">
						<div className="image" style={{backgroundImage : "url('/images/FB_logo.png')"}}></div>
						<div className="text">Login with Facebook</div>
					</a>
				</div>
			var login = <a className="login-button" onClick={this.showLoginOptions}>Login</a>
			var newPost = <a className="new-post" onClick={this.showLoginOptions}>Write a Post</a>
		}
		var logo_link;
		if (ExecutionEnvironment.canUseDOM) {
			logo_link = <Link to="/">
								<img src="/images/logo.png" type="image/png"></img>
							</Link>
		}
		else{
			logo_link = <a href="/"><img src="/images/logo.png" type="image/png"></img></a>
		}
		var options = [
			{name: "New Post", callback: this.newPost},
			{name: "Profile", callback: this.myProfile},
			{name: "Logout", backend_route: '/logout'}
		]
		return (
			<div className="header">
				{logo_link}
				<span className="site-details">
					<span className="site-name" itemProp="name">Fodoo</span>
					<span className="site-about" itemProp="description">Blogs for everyone</span>
				</span>
				{newPost}
				{login}
				{image}
				<DropDown options={options} showDropDown={this.state.showDropDown}/>
				<span className={"pull-right right-elements" + (this.state.showOptions ? " show" : "")}>
					{login_options}
				</span>
			</div>
		)
	}
});