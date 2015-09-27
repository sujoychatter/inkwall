var React = require('react');
var Router = require('react-router');
var Index = require('./components/index.jsx');
var Wrapper = require('./wrapper.jsx');

var Route = Router.Route;


//Elements generated with wrapper
var IndexWrapperElement = React.createClass({
	render: function(){
		return (
			<Wrapper child={Index} />
		)
	}
});
//


var routes = (
	<Route name="index" path="/" handler={IndexWrapperElement}></Route>
);



Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('main-content'));
});