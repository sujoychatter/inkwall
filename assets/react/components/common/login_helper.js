import React, { Component, PropTypes } from 'react';

export default class LoginHelper extends Component{
	render(){
		return <div className="login-buttons">
			<a className="google" href="/auth/google" onClick={this.startLoading}>
				<div className="image" style={{backgroundImage : "url('/images/google_logo.png')"}}></div>
			</a>
			<a className="facebook" href="/auth/facebook" onClick={this.startLoading}>
				<div className="image" style={{backgroundImage : "url('/images/FB_logo.png')"}}></div>
			</a>
		</div>
	}
}