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
			data = {user: this.props.user};
		}
		return data;
	},
	myPosts: function(){
		this.transitionTo('/my-posts');
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
	render: function () {
		if (this.state.user && this.state.user.name) {
			var userData = {
					userName: this.state.user.name,
					imageURL: this.state.user.photo,
					admin: this.state.user.admin
				},
				divStyle = {backgroundImage: 'url(' + this.state.user.photo + ')'},
				image = <div className="user-image" style={divStyle} onClick={this.showHideDropDown}></div>;
				var newPost = <a className="new-post pull-right" onClick={this.newPost}>Write a Post</a>
		}
		else {
			var login = <a className="login-button" href="/auth/facebook">Login</a>
			var newPost = <a className="new-post pull-right">Write a Post</a>
		}
		var logo_link
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
			{name: "My Posts", callback: this.myPosts},
			{name: "Logout", backend_route: '/logout'}
		]
		return (
			<div className="header">
				{logo_link}
				<span className="site-details">
					<span className="site-name" itemProp="name">Fodoo</span>
					<span className="site-about" itemProp="description">Blogs for everyone</span>
				</span>
				<span className="pull-right right-elements">
					{image}
					{login}
					<DropDown options={options} showDropDown={this.state.showDropDown}/>
				</span>
				{newPost}
			</div>
		)
	}
});