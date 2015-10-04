var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

module.exports = React.createClass({
	getInitialState: function(){
		var data = {};
		if(this.props.user){
			data =  {user: this.props.user};
		}
		else if(ExecutionEnvironment.canUseDOM){
			if((typeof fodoo_data != "undefined") && fodoo_data && fodoo_data.user){
				data =  {user: fodoo_data.user};
			}
		}
		return data;
	},
	render: function() {
		if(this.state.user){
			var userData = {userName: this.state.user.name, imageURL: this.state.user.photo, admin: this.state.user.admin},
			divStyle = {backgroundImage: 'url('+ this.state.user.photo +')'},
			image = <div className="user-image" style={divStyle}></div>;
			var logout = <a className="login-button" href="/logout">Logout</a>
		}
		else{
			var login = <a className="login-button" href="/auth/facebook">Login</a>
		}
		return (
			<div className="header">
				<img src="/images/logo.png" type="image/png"></img>
				<span className="site-details">
					<span className="site-name" itemProp="name">Fodoo</span>
					<span className="site-about" itemProp="description">Blog for engineers</span>
				</span>
				<span className="pull-right right-elements">
					{image}
					{login}
					{logout}
				</span>
			</div>
	    )    
	}
});