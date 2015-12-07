import React, { Component, PropTypes } from 'react';
var Router = require('react-router');
var Route = Router.Route;
var Wrapper = require('./wrapper.js');
var Home = require('./components/home.js');
var Profile = require('./components/profile.js');
var EditPost = require('./components/edit_post.js');
var ShowPost = require('./components/show_post.js');
import {Filters} from './constants/visibilityFilters';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { connect } from 'react-redux';
import {createPosts, setSelectedPost, setSelectedPostByName, setSelectedPostById ,fetchProfile, fetchPosts} from './actions/posts';
import * as VisibilityConstants from './constants/visibilityFilters'
import {addUserData, setCurrentUserId, getUserData, setProfileId} from './actions/user'
import {setVisibilityFilter} from './actions/visibilityFilters'
import Base64 from './helpers/base64'


const store = configureStore();

store.dispatch(createPosts(window.inkwall_data.posts));
store.dispatch(setCurrentUserId(window.inkwall_data.user && window.inkwall_data.user.id));
store.dispatch(addUserData(window.inkwall_data.user));
store.dispatch(addUserData(window.inkwall_data.profile_user));
store.dispatch(setProfileId(window.inkwall_data.profile_user_id));
store.dispatch(setSelectedPost(window.inkwall_data.selected_post || {}));
store.dispatch(setVisibilityFilter(window.inkwall_data.posts_visibility));
window.inkwall_data = null

function selectPosts(posts, filter, state){
	switch(filter){
		case VisibilityConstants.Filters.SHOW_ALL:
			return posts.filter(post => post.active === true);
		case VisibilityConstants.Filters.SHOW_ALL_APPROVED:
			return posts.filter(post => (post.approved === true && post.published === true && post.active === true));
		case VisibilityConstants.Filters.SHOW_PROFILE:
			var profile_user = getUserData(state.user.users, state.user.profileUserId);
			if(profile_user.admin && state.user.profileUserId == state.user.currentUserId){
				return posts.filter(post => (post.active === true && post.published === true));
			}else if(state.user.profileUserId == state.user.currentUserId){
				return posts.filter(post => (post.user_id == profile_user.id && post.active === true));
			}else{
				return posts.filter(post => (post.user_id == profile_user.id && post.approved === true && post.published === true));
			}
		case VisibilityConstants.Filters.SHOW_ONE:
			return posts.filter(post => (post.id == state.posts.selected_post_id && post.active === true));
	}
}
function selectProfileUser(state, filter){
	if(VisibilityConstants.Filters.SHOW_PROFILE == filter && state.user.profileUserId)
		return {profile_user: getUserData(state.user.users, state.user.profileUserId)}
	return {}
}

function mapStateToProps(state) {
	var new_state = {
		posts: selectPosts(state.posts.items, state.visibilityFilter, state),
		user: getUserData(state.user.users, state.user.currentUserId),
		isLoading: state.loader.loading
	}
	return Object.assign({}, new_state, selectProfileUser(state, state.visibilityFilter));
}

Wrapper = connect(mapStateToProps)(Wrapper);

class HomeWrapperElement extends Component{
	render() {
		store.dispatch(setVisibilityFilter(Filters.SHOW_ALL_APPROVED));
		store.dispatch(fetchPosts({approved: true, published: true}))
		return (
			<Provider store={store}>
				{() => <Wrapper child={Home} cssElementId="home-css" stylesheetLink="home.css"/>}
			</Provider>
		)
	}
}

class EditPostWrapperElement extends Component{
	render() {
		store.dispatch(setVisibilityFilter("SHOW_ONE"));
		store.dispatch(setSelectedPostById(Base64.decode(this.props.params.postId)));
		return (
			<Provider store={store}>
				{() => <Wrapper child={EditPost} hideFooter={true} cssElementId="edit-post-css" stylesheetLink="edit-post.css"/>}
			</Provider>
		)
	}
}

class ShowPostWrapperElement extends Component{
	render() {
		store.dispatch(setVisibilityFilter("SHOW_ONE"));
		var preview = false
		if(this.props.params.postName){
			store.dispatch(setSelectedPostByName(this.props.params.postName));
			
		}
		else{
			store.dispatch(setSelectedPostById(Base64.decode(this.props.params.postId)));
			preview = true
		}
		return (
			<Provider store={store}>
				{() => <Wrapper child={ShowPost} preview={preview} cssElementId="show-post-css" stylesheetLink="show-post.css"/>}
			</Provider>
		)
	}
}

class ProfileWrapperElement extends Component{
	render() {
		store.dispatch(fetchProfile(parseInt(this.props.params.profileUserId) || null))
		store.dispatch(setVisibilityFilter(Filters.SHOW_PROFILE))
		return (
			<Provider store={store}>
				{() => <Wrapper child={Profile}  cssElementId="profile-css" stylesheetLink="profile.css"/>}
			</Provider>
		)
	}
}

var routes = (
	<Route>
		<Route name="home" path="/" handler={HomeWrapperElement}/>
		<Route name="posts" path="/profile/:profileUserId" handler={ProfileWrapperElement}/>
		<Route name="edit_post" path="/posts/:postId/edit" handler={EditPostWrapperElement}/>
		<Route name="show_post" path="/posts/:postName" handler={ShowPostWrapperElement}/>
		<Route name="preview_post" path="/posts/:postId/preview" handler={ShowPostWrapperElement}/>
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('application'));
});