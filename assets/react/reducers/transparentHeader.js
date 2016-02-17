import {TRANSPARENT, NON_TRANSPARENT} from '../constants/transparentHeader';

const initialState = {
	transparent: false
}

export default function loader(state = initialState, action = {}) {
	switch (action.type) {
		case TRANSPARENT:
			return {transparent : true}
		case NON_TRANSPARENT:
			return {transparent : false}
		default:
			return state
	}
}