import React, { Component, PropTypes } from 'react';
var Router = require('react-router');
var Route = Router.Route;
var Wrapper = require('./wrapper.js');
var Home = require('./components/home.js');
var MyPosts = require('./components/my_posts.js');
var EditPost = require('./components/edit_post.js');
var ShowPost = require('./components/show_post.js');
import {Filters} from './constants/visibilityFilters';
import {fetchAllPosts} from './actions/posts';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { connect } from 'react-redux';
import {createPosts, setSelectedPost, setSelectedPostByName, setSelectedPostById , requestPost, fetchMyPosts} from './actions/posts';
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
store.dispatch(setSelectedPost(window.fodoo_data.selected_post || {}));
store.dispatch(setVisibilityFilter(window.fodoo_data.posts_visibility));

function selectPosts(posts, filter, my_id, state){
	switch(filter){
		case VisibilityConstants.Filters.SHOW_ALL:
			return posts.filter(post => post.active === true);
		case VisibilityConstants.Filters.SHOW_ALL_APPROVED:
			return posts.filter(post => (post.approved === true && post.published === true && post.active === true));
		case VisibilityConstants.Filters.SHOW_MY:
			if(state.user.admin)
				return posts.filter(post => post.active === true);;
			return posts.filter(post => (post.user_id == my_id && post.active === true));
		case VisibilityConstants.Filters.SHOW_ONE:
			return posts.filter(post => (post.id == state.posts.selected_post_id && post.active === true));
	}
}

function mapStateToProps(state) {
	return {
		posts: selectPosts(state.posts.items, state.visibilityFilter, state.user.id, state),
		user: state.user
	}
}

Wrapper = connect(mapStateToProps)(Wrapper);

class HomeWrapperElement extends Component{
	render() {
		store.dispatch(setVisibilityFilter(Filters.SHOW_ALL_APPROVED));
		store.dispatch(fetchAllPosts())
		return (
			<Provider store={store}>
				{() => <Wrapper child={Home} cssElementId="home-css" stylesheetLink="/stylesheets/home.css"/>}
			</Provider>
		)
	}
}

class EditPostWrapperElement extends Component{
	render() {
		store.dispatch(setSelectedPostById(this.props.params.postId));
		return (
			<Provider store={store}>
				{() => <Wrapper child={EditPost} cssElementId="edit-post-css" stylesheetLink="/stylesheets/edit-post.css"/>}
			</Provider>
		)
	}
}

class ShowPostWrapperElement extends Component{
	render() {
		if(this.props.params.postName){
			store.dispatch(setSelectedPostByName(this.props.params.postName));
		}
		else{
			store.dispatch(setSelectedPostById(this.props.params.postId));
		}
		return (
			<Provider store={store}>
				{() => <Wrapper child={ShowPost} cssElementId="show-post-css" stylesheetLink="/stylesheets/show-post.css"/>}
			</Provider>
		)
	}
}

class MyPostsWrapperElement extends Component{
	render() {
		store.dispatch(fetchMyPosts())
		store.dispatch(setVisibilityFilter(Filters.SHOW_MY))
		return (
			<Provider store={store}>
				{() => <Wrapper child={MyPosts}  cssElementId="my-post-css" stylesheetLink="/stylesheets/my-posts.css"/>}
			</Provider>
		)
	}
}

var routes = (
	<Route>
		<Route name="home" path="/" handler={HomeWrapperElement}/>
		<Route name="posts" path="my-posts" handler={MyPostsWrapperElement}/>
		<Route name="edit_post" path="/posts/:postId/edit" handler={EditPostWrapperElement}/>
		<Route name="show_post" path="/posts/:postName" handler={ShowPostWrapperElement}/>
		<Route name="preview_post" path="/posts/:postId/preview" handler={ShowPostWrapperElement}/>
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('application'));
});