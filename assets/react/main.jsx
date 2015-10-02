var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var Wrapper = require('./wrapper.jsx');
var Index = require('./components/index.jsx');
var NewPost = require('./components/new_post.jsx');


//Elements generated with wrapper
var IndexWrapperElement = React.createClass({
	render: function(){
		return (
			<Wrapper child={Index} />
		)
	}
});
var NewPostWrapperElement= React.createClass({
	render: function(){
		return (
			<Wrapper child={NewPost} />
		)
	}
})
//


var routes = (
	<Route name="index" path="/" handler={IndexWrapperElement}>
		<Route name="new_post" path="/new_post" handler={NewPostWrapperElement} />
	</Route>
);



Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('main-content'));
});