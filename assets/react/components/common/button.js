var React = require('react');

module.exports = React.createClass({
	clicked: function(event){
		if(this.props.onclicking){
			this.props.onclicking(event);
		}
	},
	render: function() {
		return (
			<button className={this.props.classes} onClick={this.clicked}>{this.props.content}</button>
		)
	}
});