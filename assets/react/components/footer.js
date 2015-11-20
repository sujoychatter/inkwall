import React, { Component } from 'react';
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

export default class Footer extends Component{
	render(){
		return <div className="footer">
			<div className="text-desc">
				<p>Inkwall is a free blogging site</p><p>sign in, write, publish and get your thoughts across</p>
			</div>
			<div className="options">
				<a className="option-icons">About Us</a> | <a href="https://github.com/sujoychatter/inkwall" target="_blank" className="option-icons">Github</a>
			</div>
		</div>
	}
}