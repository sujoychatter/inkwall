import * as types from '../constants/posts';
require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

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