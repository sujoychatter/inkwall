import * as types from '../constants/posts';

export function publishPost(text) {
	return { type: types.ADD_TODO, text };
}

export function deletePost(id) {
	return { type: types.DELETE_TODO, id };
}

export function unpublishPost(id, text) {
	return { type: types.EDIT_TODO, id, text };
}