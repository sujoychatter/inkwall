import * as types from '../constants/posts';
import {setVisibilityFilter} from './visibilityFilters'
import fetch from 'isomorphic-fetch';

export function receivePosts(posts){
	return {
		type: types.RECEIVE_POSTS,
		posts: posts,
		receivedAt: Date.now()
	}
}

export function removePost(id){
	return { type: types.REMOVE_POST, id}
}

export function setSelectedPost(post){
	return {
		type: types.SET_SELECTED_POST,
		post: post
	}
}

function encodeQueryParams(query){
	var str = "?"
	if(!query){return ""}
	for (var key in query) {
		if (query.hasOwnProperty(key)){
			str += (key + '=' + query[key] + '&')
		}
	}
	return str.slice(0,-1)
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

export function requestPost(){
	return {
		type: types.REQUEST_POSTS
	}
}

export function fetchAllPosts(){
	return function(dispatch){
		dispatch(requestPost());
		return fetch('/api/posts').then(response => response.json()).then(json => 
			dispatch(receivePosts(json.posts))
		)
	}
}

export function fetchMyPosts(){
	return function(dispatch){
		fetch('/api/posts/my',{credentials: 'include'})
		.then(response => response.json())
		.then(function(json){
			return dispatch(receivePosts(json.posts))
		})
	}
}

export function fetchPosts(query){
	return function(dispatch){
		fetch('/api/posts'.concat(encodeQueryParams(query)))
		.then(response => response.json())
		.then(function(json){
			return dispatch(receivePosts(json.posts))
		})
	}
}

export function setSelectedPostByName(postName){
	return function(dispatch){
		dispatch(requestPost());
		return fetch('/api/posts/by_name?name=' + postName).then(
			response => response.json()
		).then(function(json){
			dispatch(setSelectedPost(json.posts[0]));
			dispatch(receivePosts(json.posts));
			dispatch(setVisibilityFilter("SHOW_ONE"));
		})
	}
}

function getPostPreview(){
	var preview = tinyMCE.activeEditor.getContent({format : 'text'}).split('\n');
	preview = preview.slice(0,4).join('\n').substring(0,300);
	return preview
}

export function savePost(post){
	post.preview = getPostPreview(post.content)
	return function(dispatch){
		return fetch('/api/posts/' + post.id + '/update', {
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify(post),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}).then(
			response => response.json()
		).then(function(json){
			dispatch(receivePosts(json.posts));
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
			dispatch(receivePosts(json.posts));
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

export function updatePost(id, query) {
	var url = "/api/posts/" + id + '/update';
	return fetch(url, {
		credentials: 'include',
		method: 'PUT',
		body: JSON.stringify(query),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	})
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
export function approvePost(id) {
	return function (dispatch) {
		fetch("/api/posts/" + id + '/update', {
			credentials: 'include',
			method: 'put',
			body: JSON.stringify({approved: true}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		})
		.then(
			response => response.json()
		).then(function(json){
			dispatch(receivePosts(json.posts));
		})

	}
}
export function unApprovePost(id) {
	return function (dispatch) {
		fetch("/api/posts/" + id + '/update', {
			credentials: 'include',
			method: 'put',
			body: JSON.stringify({approved: false}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(
			response => response.json()
		).then(function(json){
			dispatch(receivePosts(json.posts));
		})
	}
}
