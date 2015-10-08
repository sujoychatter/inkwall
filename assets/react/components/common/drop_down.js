var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

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
				if(option.backend_route){
					var action = <a href={option.backend_route}>{option.name}</a>
				}
				else if(option.frontend_route && ExecutionEnvironment.canUseDOM){
					var action = <Link to={option.frontend_route}>{option.name}</Link>
				}
				else if(option.callback){
					var action = <a href="#" onClick={option.callback}>{option.name}</a>
				}
				return (
					<div className="drop-option" key={index}>
						{action}
					</div>
				)
			})
		};
		var className = "drop-down-container";
		if(this.props.showDropDown){
			className = className + " visible";
		}
		return (
			<div className={className}>
				<div className="drop-down">
					{createOptions()}
				</div>
				<div className="up-pick"></div>
			</div>
		)
	}
});