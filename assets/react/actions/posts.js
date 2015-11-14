import * as types from '../constants/posts';
import {setVisibilityFilter} from './visibilityFilters'
import {addUserData, setProfileId} from './user'
import fetch from 'isomorphic-fetch';

var TINYMCE_LINE_PREVIEW = 10;
var TINYMCE_CHAR_PREVIEW = 700;

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

export function requestPost(){
	return {
		type: types.REQUEST_POSTS
	}
}

export function fetchProfile(id){
	return function(dispatch){
		dispatch(setProfileId(id))
		fetch('/api/profile/'+id,{credentials: 'include'})
		.then(response => response.json())
		.then(function(json){
			dispatch(addUserData(json.user[0]))
			return dispatch(receivePosts(json.posts))
		})
	}
}

export function fetchPosts(query){
	if(!query){
		query = {}
	}
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
	preview = preview.slice(0,TINYMCE_LINE_PREVIEW).join('\n').substring(0,TINYMCE_CHAR_PREVIEW);
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
