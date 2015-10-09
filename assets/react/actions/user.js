import * as types from '../constants/user';
import fetch from 'isomorphic-fetch';

function addTodoWithoutCheck() {

	return {
		type: types.PUBLISH_POST,
		text: "My first Post"
	};
}

export function loggedOut() {
	return function (dispatch) {
		dispatch(addTodoWithoutCheck());
	}
}
export function loggedIn(id) {
	return { type: types.DELETE_POST, id };
}