import * as types from '../constants/comments';
import fetch from 'isomorphic-fetch';

export function postComment(post_id, data){
	return function(dispatch){
		post('/api/comments/posts/'+post_id,{credentials: 'include'})
		.then(response => {
			return response.json()
		}).then(function(json){
			return dispatch(receiveComments(json.comments))
		})
	}
}
