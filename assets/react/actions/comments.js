import * as types from '../constants/comments';
import fetch from 'isomorphic-fetch';

export function addComments(comments){
	return {type: types.ADD_COMMENTS, comments: comments}
}

export function postComment(data){
	return function(dispatch){
		fetch('/api/comments', {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({comment: data}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			return response.json()
		}).then(function(json){
			return dispatch(addComments(json.comments))
		})
	}
}
