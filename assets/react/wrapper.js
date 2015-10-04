var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var Header = require('./components/header.js');

module.exports = React.createClass({
	handleScroll: function (e) {
		if (e.target.scrollTop > 10) {
			document.body.className = "shrunk-header"
		}
		else if (e.target.scrollTop < 10) {
			document.body.className = ""
		}
	},
	componentDidMount: function () {
		if (ExecutionEnvironment.canUseDOM) {
			document.getElementsByClassName('main-content')[0].addEventListener('scroll', this.handleScroll);
		}
	},
	componentWillUnmount: function () {
		if (ExecutionEnvironment.canUseDOM) {
			document.getElementsByClassName('main-content')[0].removeEventListener('scroll', this.handleScroll);
		}
	},
	render: function () {
		var Child = this.props.child;
		return (
			<div className="main-content">
				<Header user={this.props.user}/>
				<Child />
			</div>
		)
	}
});