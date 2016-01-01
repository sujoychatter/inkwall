import * as types from '../constants/comments';

const initialState = {
	article_id: undefined,
	items: []
}

function mergeComemnts(items, comments){
	var merged_contents = [].concat(comments);
	items.forEach(function(item){
		if(!merged_contents.some(function(c){return c.id == item.id})){
			merged_contents.push(item)
		}
	})
	return merged_contents;
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