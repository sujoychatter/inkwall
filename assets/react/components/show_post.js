var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

module.exports = React.createClass({
	componentDidMount: function () {
	},
	createContent: function(html_string){
		return {__html: html_string}
	},
	render: function () {
		if(ExecutionEnvironment.canUseDOM){
			var title = "Fodoo : " + this.props.posts[0].title
			if(document.title != title){
				document.title = title;
			}
		}
		return (
			<div className="show-post container" itemScope itemType="http://schema.org/BlogPosting">
				<div className="wrapper">
					<div className="title" itemProp="name headline">
						{this.props.posts[0].title}
					</div>
					<div className="user-details" itemScope itemType="http://schema.org/Person">
						<img itemProp="image" className="user-image" src={this.props.posts[0].user_photo}/>
						<span className="user-name" itemProp="name">
							{this.props.posts[0].user_name}
						</span>
					</div>
					<div itemProp="articleBody" className="content" dangerouslySetInnerHTML={this.createContent(this.props.posts[0].content)}>
					</div>
				</div>
			</div>
		)
	}
});