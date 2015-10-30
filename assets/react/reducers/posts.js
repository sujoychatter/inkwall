import { PUBLISH_POST, UNPUBLISH_POST, DELETE_POST, CREATE_BLOGS, REQUEST_POSTS, RECEIVE_POSTS, SET_SELECTED_POST} from '../constants/posts';

const initialState = {
	items: [],
	isFetching: false
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
			return Object.assign({},state,  {isFetching: false, items: action.posts} );

		case REQUEST_POSTS:
			return Object.assign({}, state, {isFetching: true});
		case RECEIVE_POSTS:
			return Object.assign({}, state, {
				isFetching: false,
				items: action.posts,
				lastUpdate: action.receivedAt
			});
		case SET_SELECTED_POST:
			return Object.assign({}, state, {
				selected_post_id: action.post.id
			})
		default:
			return state;
	}
}