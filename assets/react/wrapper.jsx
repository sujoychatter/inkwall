var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

module.exports = React.createClass({
	handleScroll: function(e){
		if(e.target.scrollTop > 10){
			document.body.className = "shrunk-header"
		}
		else if(e.target.scrollTop < 10){
			document.body.className = ""
		}
	},
	componentDidMount: function(){
		if (ExecutionEnvironment.canUseDOM) {
			document.getElementById('main-content').addEventListener('scroll', this.handleScroll);
		}
	},
	componentWillUnmount: function(){
		if (ExecutionEnvironment.canUseDOM) {
			document.getElementById('main-content').removeEventListener('scroll', this.handleScroll);
		}
	},
	render: function() {
		var Child = this.props.child;
		return (
			<Child />
		)
	}
});