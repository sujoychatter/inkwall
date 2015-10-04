import { PUBLISH_POST, UNPUBLISH_POST, DELETE_POST} from '../constants/posts';

const initialState = {
	posts: [],
	fetched: false
};

export default function posts(state = initialState, action = {}) {
	switch (action.type) {
		case PUBLISH_POST:
			var posts = state.posts.map((post) => {return post});
			posts.push(action.text);
			return {posts: posts};

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