import { LOGGED_IN, LOGGED_OUT} from '../constants/user';

export default function posts(state = {}, action = {}) {
	switch (action.type) {
		case LOGGED_IN:
			return state;

		case LOGGED_OUT:
			return {};

		default:
			return state;
	}
}