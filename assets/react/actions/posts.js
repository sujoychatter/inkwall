import * as types from '../constants/posts';
import {setVisibilityFilter} from './visibilityFilters'
import fetch from 'isomorphic-fetch';

function addTodoWithoutCheck() {

	return {
		type: types.PUBLISH_POST,
		text: "My first Post"
	};
}

function receivePosts(json){
	return {
		type: types.RECEIVE_POSTS,
		posts: json.posts,
		receivedAt: Date.now()
	}
}

export function setSelectedPost(post){
	return {
		type: types.SET_SELECTED_POST,
		post: post
	}
}

//function fetchPosts(text) {
//	return function (dispat
// ch) {
//		dispatch(addTodoWithoutCheck());
//		fetch("https://buy.housing.com/api/v0/search/suggest/?&string=powa&cursor=4&source=web&source=web").then(
//			(result) =>  dispatch(addTodoWithoutCheck()),
//			(error) =>  dispatch(addTodoWithoutCheck())
//		);
//	}
//}

function requestPost(){
	return {
		type: types.REQUEST_POSTS
	}
}

export function fetchAllPosts(){
	return function(dispatch){
		dispatch(requestPost());
		return fetch('/api/posts').then(response => response.json()).then(json => 
			dispatch(receivePosts(json))
		)
	}
}

export function setSelectedPostByName(postName){
	return function(dispatch){
		dispatch(requestPost());
		return fetch('/api/posts/by_name?name=' + postName).then(
			response => response.json()
		).then(function(json){
			dispatch(setSelectedPost(json.posts[0]));
			dispatch(receivePosts(json));
			dispatch(setVisibilityFilter("SHOW_ONE"));
		})
	}
}

export function savePost(post){
	console.log(post)
	return function(dispatch){
		return fetch('/api/posts/' + post.id + '/update?' + 'post=' + JSON.stringify(post), {
			credentials: 'include',
			method: 'PUT'
		}).then(
			response => response.json()
		).then(function(json){
			dispatch(receivePosts(json));
		})
	}
}

export function setSelectedPostById(id){
	return function(dispatch){
		dispatch(requestPost());
		return fetch('/api/posts/' + id + '?for_edit=true').then(
			response => response.json()
		).then(function(json){
			dispatch(setSelectedPost(json.posts[0]));
			dispatch(receivePosts(json));
			dispatch(setVisibilityFilter("SHOW_ONE"));
		})
	}
}

export function createPosts(posts) {
	return function (dispatch) {
		dispatch({type: types.CREATE_BLOGS, posts: posts});
	}
}

export function deletePost(id) {
	return { type: types.DELETE_POST, id };
}

export function unpublishPost(id, text) {
	return { type: types.UNPUBLISH_POST, id, tex};
}