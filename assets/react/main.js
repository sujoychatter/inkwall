import React, { Component, PropTypes } from 'react';
var Router = require('react-router');
var Route = Router.Route;
var Wrapper = require('./wrapper.js');
var Home = require('./components/home.js');
var NewPost = require('./components/new_post.js');
var Blogs = require('./components/blogs.js');
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { connect } from 'react-redux';


//Elements generated with wrapper

const store = configureStore();

function mapStateToProps(state) {
	return {
		posts: state.blogs.posts
	}
}

Wrapper = connect(mapStateToProps)(Wrapper);

class HomeWrapperElement extends Component{
	render() {
		return (
			<Provider store={store}>
				{() => <Wrapper child={Home} cssElementId="home-css" stylesheetLink="/stylesheets/home.css"/>}
			</Provider>
		)
	}
}

class NewPostWrapperElement extends Component{
	render() {
		return (
			<Provider store={store}>
				{() => <Wrapper child={NewPost} cssElementId="new-post-css" stylesheetLink="/stylesheets/new-post.css"/>}
			</Provider>
		)
	}
}

class BlogsWrapperElement extends Component{
	render() {
		return (
			<Provider store={store}>
				{() => <Wrapper child={Blogs} cssElementId="new-post-css" stylesheetLink="/stylesheets/new-post.css"/>}
			</Provider>
		)
	}
}

var routes = (
	<Route>
		<Route name="home" path="/" handler={HomeWrapperElement}/>
		<Route name="new_post" path="new_post" handler={NewPostWrapperElement}/>
		<Route name="blogs" path="blogs" handler={BlogsWrapperElement}/>
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('application'));
});