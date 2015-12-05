import React, { Component } from 'react';
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

export default class Footer extends Component{
	render(){
		return <div className="footer">
			<div className="text-desc">
				<p>Inkwall is a free blogging site</p><p>Read - Write - Publish</p>
			</div>
			<div className="options">
				<a href="https://github.com/sujoychatter/inkwall" target="_blank" className="option-icons">Github</a>
			</div>
		</div>
	}
}