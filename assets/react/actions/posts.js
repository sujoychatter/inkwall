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

export function publishPost(id) {
	return function (dispatch) {
		fetch("/api/posts/" + id + '/update', {
			credentials: 'include',
			method: 'put',
			body: JSON.stringify({published: true}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		})
		.then(function(){
				return dispatch({ type: types.PUBLISH_POST, id});
			}
		)

	}
}

export function createPosts(posts) {
	return function (dispatch) {
		dispatch({type: types.CREATE_BLOGS, posts: posts});
	}
}

export function removePost(id) {
	return function (dispatch) {
		var url = "/api/posts/" + id;
		request({
			url: url,
			type: "put",
			data: {active: false}
		}).then(() =>{
			return dispatch({ type: types.REMOVE_POST, id});
		});

	}
}

export function unPublishPost(id) {
	return function (dispatch) {
		fetch("/api/posts/" + id + '/update', {
			credentials: 'include',
			method: 'put',
			body: JSON.stringify({published: false}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(function(){
			return dispatch({ type: types.UN_PUBLISH_POST, id});
		})
	}
}