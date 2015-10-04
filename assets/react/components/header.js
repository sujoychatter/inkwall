var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var DropDown = require('./common/drop_down');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
	showHideDropDown: function(){
		this.state.showDropDown = !this.state.showDropDown;
		this.setState(this.state);
	},
	getInitialState: function () {
		var data = {};
		if (this.props.user) {
			data = {user: this.props.user};
		}
		else if (ExecutionEnvironment.canUseDOM) {
			if ((typeof fodoo_data != "undefined") && fodoo_data && fodoo_data.user) {
				data = {user: fodoo_data.user};
			}
		}
		return data;
	},
	render: function () {
		if (this.state.user) {
			var userData = {
					userName: this.state.user.name,
					imageURL: this.state.user.photo,
					admin: this.state.user.admin
				},
				divStyle = {backgroundImage: 'url(' + this.state.user.photo + ')'},
				image = <div className="user-image" style={divStyle} onClick={this.showHideDropDown}></div>;
		}
		else {
			var login = <a className="login-button" href="/auth/facebook">Login</a>
		}
		var options = [{name: "New Post", frontend_route: '/new_post'}, {name: "Logout", backend_route: '/logout'}]
		return (
			<div className="header">
				<Link to="/">
				<img src="/images/logo.png" type="image/png"></img>
				</Link>
				<span className="site-details">
					<span className="site-name" itemProp="name">Fodoo</span>
					<span className="site-about" itemProp="description">Blog for engineers</span>
				</span>
				<span className="pull-right right-elements">
					{image}
					{login}
					<DropDown options={options} showDropDown={this.state.showDropDown}/>
				</span>
			</div>
		)
	}
});