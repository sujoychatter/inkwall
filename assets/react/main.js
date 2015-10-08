import React, { Component, PropTypes } from 'react';
var Router = require('react-router');
var Route = Router.Route;
var Wrapper = require('./wrapper.js');
var Home = require('./components/home.js');
var EditPost = require('./components/edit_post.js');
var Blogs = require('./components/blogs.js');
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

class EditPostWrapperElement extends Component{
	render() {
		var data = {post_id: this.props.params.postId}
		return (
			<Provider store={store}>
				{() => <Wrapper child={EditPost} data={data} cssElementId="edit-post-css" stylesheetLink="/stylesheets/edit-post.css"/>}
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
		<Route name="edit_post" path="/posts/:postId/edit" handler={EditPostWrapperElement}/>
		<Route name="blogs" path="blogs" handler={BlogsWrapperElement}/>
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('application'));
});