import { LOGGED_OUT, SET_USER} from '../constants/user';

export default function posts(state = {}, action = {}) {
	switch (action.type) {
		case SET_USER:
			return action.data || {};

		case LOGGED_OUT:
			return {};

		default:
			return state;
	}
}