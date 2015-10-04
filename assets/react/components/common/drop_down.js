var React = require('react');

module.exports = React.createClass({
	clicked: function (event) {
		if (this.props.onclicking) {
			this.props.onclicking(event);
		}
	},
	render: function () {
		var _this = this;
		function createOptions(){
			return _this.props.options.map(function(option, index){
				if(option.action){
					var action = <a href={option.action}>{option.name}</a>
				}
				return (
					<div className="drop-option" key={index}>
						{action}
					</div>
				)
			})
		};
		return (
			<div className="drop-down-container">
				<div className="drop-down">
					{createOptions()}
				</div>
				<div className="up-pick"></div>
			</div>
		)
	}
});