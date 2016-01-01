import * as types from '../constants/comments';

const initialState = {
	article_id: undefined,
	items: []
}

function mergeComemnts(items, comments){
	var new_items, is_present;
	new_items = comments || [];
	for(var i in items){
		is_present = false;
		for(var j in comments){
			if(parseInt(comments[j].id) == parseInt(items[i].id)){
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

export default function comments(state = initialState, action = {}){
	switch (action.type) {
		case types.ADD_COMMENTS:
			if(action.comments)
				return Object.assign({}, state, {items: mergeComemnts(state.items, action.comments)});
			else
				return state;
		default:
			return state
	}
}