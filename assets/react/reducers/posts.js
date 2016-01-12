import { PUBLISH_POST, UN_PUBLISH_POST, REMOVE_POST, CREATE_BLOGS, REQUEST_POSTS, RECEIVE_POSTS, SET_SELECTED_POST} from '../constants/posts';

const initialState = {
	items: [],
}

function mergePosts(items, posts){
	var new_items, is_present;
	new_items = posts || [];
	for(var i in items){
		is_present = false;
		for(var j in posts){
			if(parseInt(posts[j].id) == parseInt(items[i].id)){
				is_present = true;
				break;
			}
		}
		if(!is_present){
			new_items.push(items[i])
		}
	}
	return new_items;
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
			return Object.assign({}, state, {items: items});

		case UN_PUBLISH_POST:
			var items = state.items.map((post) => {
				if(post.id == action.id){
					post.published = false;
				}
				return post
			});
			return Object.assign({}, state, {items: items});

		case REMOVE_POST:
			var items = state.items.filter((post) => post.id != action.id)
			return Object.assign({}, state, {items: items});

		case CREATE_BLOGS:
			return Object.assign({},state,  {items: action.posts} );
		
		case RECEIVE_POSTS:
			var items = mergePosts(state.items, action.posts)
			return Object.assign({}, state, {
				items: items,
				lastUpdate: action.receivedAt
			});
		
		case SET_SELECTED_POST:
			if(action.post.id){
				return Object.assign({}, state, {
					selected_post_id: action.post.id
				})
			}
			else{
				return state;
			}
			
		default:
			return state;
	}
}