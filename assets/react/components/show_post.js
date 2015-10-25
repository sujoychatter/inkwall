var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

module.exports = React.createClass({
	componentDidMount: function () {
	},
	createContent: function(html_string){
		return {__html: html_string}
	},
	render: function () {
		debugger
		return (
			<div className="show-post container">
				<div className="wrapper">
					<div className="title">
						{this.props.posts[0].title}
					</div>
					<div className="content" dangerouslySetInnerHTML={this.createContent(this.props.posts[0].content)}>
					</div>
				</div>
			</div>
		)
	}
});