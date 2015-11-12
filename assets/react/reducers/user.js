import {SET_CURRENT_USER_ID, ADD_USER_DATA, FETCHING_USER_PROFILE, LOGGED_OUT, SET_PROFILE_ID} from '../constants/user';

const initialState = {
	users: [],
	isFetching: false,
	currentUserId: null,
	profileId: null
}
function mergeUsers(users, data){
	if(!data){
		return users
	}
	var is_present = false, arr;
	arr = users.map(function(user){
		if(user.id == data.id){
			is_present = true
			return data
		}
		return user
	})
	if(!is_present){
		arr.push(data)
	}
	return arr;
}
export default function posts(state = initialState, action = {}) {
	switch (action.type) {
		case SET_CURRENT_USER_ID:
			return Object.assign({}, state, {isFetching: false, currentUserId: action.data});

		case ADD_USER_DATA:
			return Object.assign({}, state, {isFetching: false, users: mergeUsers(state.users, action.data)});

		case FETCHING_USER_PROFILE:
			return Object.assign({}, state, {isFetching: true});

		case SET_PROFILE_ID:
			return Object.assign({}, state, {profileId: action.data});

		default:
			return state;
	}
}