import * as types from '../constants/posts';

export function publishPost(text) {
	return { type: types.PUBLISH_POST, text };
}

export function deletePost(id) {
	return { type: types.DELETE_POST, id };
}

export function unpublishPost(id, text) {
	return { type: types.UNPUBLISH_POST, id, tex};
}