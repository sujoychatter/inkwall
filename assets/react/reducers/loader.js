import {IS_LOADING, FINISHED_LOADING} from '../constants/loader';

const initialState = {
	loading: false
}

export default function loader(state = initialState, action = {}) {
	switch (action.type) {
		case IS_LOADING:
			return {loading : true}
		case FINISHED_LOADING:
			return {loading : false}
		default:
			return state
	}
}