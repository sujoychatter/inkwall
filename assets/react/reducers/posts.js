import { PUBLISH_POST, UN_PUBLISH_POST, REMOVE_POST, CREATE_BLOGS, REQUEST_POSTS, RECEIVE_POSTS, SET_SELECTED_POST} from '../constants/posts';

const initialState = {
	items: [],
	isFetching: false
}

export default function posts(state = initialState, action = {}) {
	switch (action.type) {
		case PUBLISH_POST:
			var items = state.items.map((post) => {
				if(post.id == action.id){
					post.published = true;
				}
				return post
			});
			return Object.assign({}, state, {isFetching: false, items: items});

		case UN_PUBLISH_POST:
			var items = state.items.map((post) => {
				if(post.id == action.id){
					post.published = false;
				}
				return post
			});
			return Object.assign({}, state, {isFetching: false, items: items});

		case REMOVE_POST:
			var items = state.items.filter((post) => post.id != action.id)
			return Object.assign({}, state, {isFetching: false, items: items});

		case CREATE_BLOGS:
			return Object.assign({},state,  {isFetching: false, items: action.posts} );

		case REQUEST_POSTS:
			return Object.assign({}, state, {isFetching: true});
		
		case RECEIVE_POSTS:
			var posts =  action.posts,
				items =  state.items,
				new_items, is_present;
			
			new_items = posts || [];
			for(var i in items){
				is_present = false;
				for(var j in posts){
					if(posts[j].id == items[i].id){
						is_present = true;
						break;
					}
				}
				if(!is_present){
					new_items.push(items[i])
				}
			}
			return Object.assign({}, state, {
				isFetching: false,
				items: new_items,
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