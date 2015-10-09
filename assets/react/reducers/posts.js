import { PUBLISH_POST, UNPUBLISH_POST, DELETE_POST, CREATE_BLOGS} from '../constants/posts';

const initialState = {
	posts: []
}

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

		case CREATE_BLOGS:
			return state.posts.concat(action.posts);

		default:
			return state;
	}
}