import { PUBLISH_POST, UN_PUBLISH_POST, REMOVE_POST, CREATE_BLOGS} from '../constants/posts';

export default function posts(state = [], action = {}) {
	switch (action.type) {
		case PUBLISH_POST:
			return state.map((post) => {
				if(post.id == action.id){
					post.published = true;
				}
				return post
			});

		case UN_PUBLISH_POST:
			return state.map((post) => {
				if(post.id == action.id){
					post.published = false;
				}
				return post
			});

		case REMOVE_POST:
			return state.filter((post) => map.id != action.id);

		case CREATE_BLOGS:
			return state.concat(action.posts);

		default:
			return state;
	}
}