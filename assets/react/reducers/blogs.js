import { PUBLISH_POST, UNPUBLISH_POST, DELETE_POST} from '../constants/posts';

const initialState = [{
	posts: [],
	fetched: false
}];

export default function posts(state = initialState, action = {}) {
	switch (action.type) {
		case PUBLISH_POST:
			return [{
				id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
				completed: false,
				text: action.text
			}, ...state];

		case UNPUBLISH_POST:
			return state.filter(todo =>
				todo.id !== action.id
			);

		case DELETE_POST:
			return state.filter(todo =>
				todo.id !== action.id
			);

		default:
			return state;
	}
}