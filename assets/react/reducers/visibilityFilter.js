import * as Constants from '../constants/visibilityFilters';

export default function posts(state = "ALL_POSTS", action = {}) {
	switch (action.type) {
		case Constants.SET_VISIBILITY:
			if(action.filter)
				return action.filter;
			else
				return state
		default:
			return state;
	}
}