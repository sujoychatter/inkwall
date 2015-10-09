import React, { Component, PropTypes } from 'react';
var Router = require('react-router');
var Route = Router.Route;
var Wrapper = require('./wrapper.js');
var Home = require('./components/home.js');
var NewPost = require('./components/new_post.js');
var MyPosts = require('./components/my_posts.js');
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { connect } from 'react-redux';
import {createPosts} from './actions/posts'


//Elements generated with wrapper
function getInitialData(){
	var initialState = window.fodoo_data
	return {
		user: initialState.user,
		posts: initialState.posts
	}
}
const store = configureStore();

store.dispatch(createPosts(window.fodoo_data.posts));

function mapStateToProps(state) {
	return {
		posts: state.posts,
		user: state.user
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

class MyPostsWrapperElement extends Component{
	render() {
		return (
			<Provider store={store}>
				{() => <Wrapper child={MyPosts} cssElementId="new-post-css" stylesheetLink="/stylesheets/new-post.css"/>}
			</Provider>
		)
	}
}

var routes = (
	<Route>
		<Route name="home" path="/" handler={HomeWrapperElement}/>
		<Route name="new_post" path="new_post" handler={NewPostWrapperElement}/>
		<Route name="posts" path="my-posts" handler={MyPostsWrapperElement}/>
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('application'));
});