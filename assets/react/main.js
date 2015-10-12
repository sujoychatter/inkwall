import React, { Component, PropTypes } from 'react';
var Router = require('react-router');
var Route = Router.Route;
var Wrapper = require('./wrapper.js');
var Home = require('./components/home.js');
var MyPosts = require('./components/my_posts.js');
var EditPost = require('./components/edit_post.js');
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { connect } from 'react-redux';
import {createPosts } from './actions/posts';
import * as VisibilityConstants from './constants/visibilityFilters'
import {setUserData} from './actions/user'
import {setVisibilityFilter} from './actions/visibilityFilters'


//Elements generated with wrapper
// function getInitialData(){
// 	var initialState = window.fodoo_data
// 	return {
// 		user: initialState.user,
// 		posts: initialState.posts
// 	}
// }
const store = configureStore();

store.dispatch(createPosts(window.fodoo_data.posts));
store.dispatch(setUserData(window.fodoo_data.user));
store.dispatch(setVisibilityFilter(VisibilityConstants.Filters.SHOW_ALL));

function selectPosts(posts, filter, my_id){
	switch(filter){
		case VisibilityConstants.Filters.SHOW_ALL:
			return posts;
		case VisibilityConstants.Filters.SHOW_MY:
			return posts.filter(post => post.user_id == my_id);
	}
}

function mapStateToProps(state) {
	debugger
	return {
		posts: selectPosts(state.posts, state.visibilityFilter, state.user.id),
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

class EditPostWrapperElement extends Component{
	render() {
		var data = {post_id: this.props.params.postId};
		return (
			<Provider store={store}>
				{() => <Wrapper child={EditPost} data={data} cssElementId="edit-post-css" stylesheetLink="/stylesheets/edit-post.css"/>}
			</Provider>
		)
	}
}

class MyPostsWrapperElement extends Component{
	render() {
		return (
			<Provider store={store}>
				{() => <Wrapper child={MyPosts}  cssElementId="new-post-css" stylesheetLink="/stylesheets/new-post.css"/>}
			</Provider>
		)
	}
}

var routes = (
	<Route>
		<Route name="home" path="/" handler={HomeWrapperElement}/>
		<Route name="posts" path="my-posts" handler={MyPostsWrapperElement}/>
		<Route name="edit_post" path="/posts/:postId/edit" handler={EditPostWrapperElement}/>
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('application'));
});