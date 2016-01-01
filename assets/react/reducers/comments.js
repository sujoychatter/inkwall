import * as types from '../constants/comments';

const initialState = {
	article_id: undefined,
	items: []
}

export default function comments(state = initialState, action = {}) {
	switch (action.type) {
		case types.POST_COMMENT:
			return {
				article_id: undefined,
				items: []
			}
		default:
			return state
	}
}