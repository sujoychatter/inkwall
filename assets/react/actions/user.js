import * as types from '../constants/user';
import {startLoading, stopLoading} from './loader'
import fetch from 'isomorphic-fetch';

function addTodoWithoutCheck() {

	return {
		type: types.PUBLISH_POST,
		text: "My first Post"
	};
}
export function setCurrentUserId(id){
	return {
		type : types.SET_CURRENT_USER_ID,
		data : id
	}
}

export function setProfileId(id){
	return {
		type : types.SET_PROFILE_USER_ID,
		data : id
	}
}

export function getUserData(users, id){
	for(var i in users){
		if(users[i].id == id){
			return users[i]
		}
	}
	return {}
}

export function updateUser(user, query){
	return function(dispatch){
		dispatch(startLoading())
		return fetch('/api/users/' + user.id, {
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify(query),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}).then(response => {
			dispatch(stopLoading())
			return response.json()
		}).then(function(json){
			dispatch(addUserData(json));
		})
	}
}

export function addUserData(user) {
	return {
		type : types.ADD_USER_DATA,
		data : user
	}
}
export function loggedIn(id) {
	return { type: types.DELETE_POST, id };
}