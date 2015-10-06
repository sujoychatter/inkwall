import * as types from '../constants/posts';
import fetch from 'isomorphic-fetch';

function addTodoWithoutCheck() {

	return {
		type: types.PUBLISH_POST,
		text: "My first Post"
	};
}

function fetchPosts(text) {
	//return (dispatch) => {
	//	dispatch({ type: types.PUBLISH_POST, text });
	//
	//	return fetch(`http://www.reddit.com/r/${reddit}.json`).then(
	//		(result) =>  dispatch({ type: types.PUBLISH_POST, text }),
	//		(error) =>  dispatch({ type: types.PUBLISH_POST, text })
	//	);
	//};
	return function (dispatch) {
		dispatch(addTodoWithoutCheck());
		fetch("https://buy.housing.com/api/v0/search/suggest/?&string=powa&cursor=4&source=web&source=web").then(
			(result) =>  dispatch(addTodoWithoutCheck()),
			(error) =>  dispatch(addTodoWithoutCheck())
		);
	}
}


export function publishPost() {
	return function (dispatch) {
		dispatch(addTodoWithoutCheck());
		//fetch("https://buy.housing.com/api/v0/search/suggest/?&string=powa&cursor=4&source=web&source=web").then(
		//	(result) =>  dispatch(addTodoWithoutCheck()),
		//	(error) =>  dispatch(addTodoWithoutCheck())
		//);
		setTimeout(function(){dispatch(addTodoWithoutCheck())} , 5000)
	}
}
export function deletePost(id) {
	return { type: types.DELETE_POST, id };
}

export function unpublishPost(id, text) {
	return { type: types.UNPUBLISH_POST, id, tex};
}