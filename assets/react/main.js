var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var Wrapper = require('./wrapper.js');
var Index = require('./components/index.js');
var Home = require('./components/home.js');
var NewPost = require('./components/new_post.js');


//Elements generated with wrapper
var IndexWrapperElement = React.createClass({
	render: function () {
		return (
			<Wrapper child={Index}/>
		)
	}
});
var HomeWrapperElement = React.createClass({
	render: function () {
		return (
			<Wrapper child={Home} cssElementId="home-css" stylesheetLink="/stylesheets/home.css"/>
		)
	}
});
var NewPostWrapperElement = React.createClass({
	render: function () {
		return (
			<Wrapper child={NewPost} cssElementId="new-post-css" stylesheetLink="/stylesheets/new-post.css"/>
		)
	}
})
//


var routes = (
	<Route>
		<Route name="home" path="/" handler={HomeWrapperElement}/>
		<Route name="new_post" path="new_post" handler={NewPostWrapperElement}/>
	</Route>
);


Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('application'));
});