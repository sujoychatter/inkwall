var React = require('react');

module.exports = React.createClass({
	render: function() {
		if(this.props.user){
			var userData = {userName: this.props.user.name, imageURL: this.props.user.photo, admin: this.props.user.admin},
			userDataDiv = <div class="hidden" data-user={JSON.stringify(userData)}></div>,
			divStyle = {backgroundImage: 'url('+ this.props.user.photo +')'},
			image = <div className="user-image" style={divStyle}></div>;
			var logout = <a className="login-button" href="/logout">Logout</a>
		}
		else{
			var login = <a className="login-button" href="/auth/facebook">Login</a>
		}
		return (
			<div className="header">
				{userDataDiv}
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