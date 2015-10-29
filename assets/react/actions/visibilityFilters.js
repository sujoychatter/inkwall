import * as Constants from '../constants/visibilityFilters';
import fetch from 'isomorphic-fetch';

export function setVisibilityFilter(filter){
	debugger
	return {
		type: Constants.SET_VISIBILITY,
		filter: filter
	}
}


// function addTodoWithoutCheck() {

// 	return {
// 		type: types.PUBLISH_POST,
// 		text: "My first Post"
// 	};
// }

// export const VisibilityFilters = {
// 	SHOW_ALL: 'SHOW_ALL',
// 	SHOW_MY: 'SHOW_MY'
// }

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

// export function publishPost() {
// 	return function (dispatch) {
// 		dispatch(addTodoWithoutCheck());
// 	}
// }

// export function createPosts(posts) {
// 	return function (dispatch) {
// 		dispatch({type: types.CREATE_BLOGS, posts: posts});
// 	}
// }

// export function deletePost(id) {
// 	return { type: types.DELETE_POST, id };
// }

// export function unpublishPost(id, text) {
// 	return { type: types.UNPUBLISH_POST, id, tex};
// }