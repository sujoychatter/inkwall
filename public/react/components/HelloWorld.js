"use strict";

var React = require('react');

module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		return React.createElement(
			"div",
			{ className: "container" },
			React.createElement("img", { src: "/images/logo.png" }),
			React.createElement(
				"h1",
				null,
				"Fodoo is under construction"
			)
		);
	}
});