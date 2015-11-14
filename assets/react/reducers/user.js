import {SET_CURRENT_USER_ID, ADD_USER_DATA, FETCHING_USER_PROFILE, LOGGED_OUT, SET_PROFILE_USER_ID} from '../constants/user';

const initialState = {
	users: [],
	currentUserId: null,
	profileUserId: null
}
function mergeUsers(users, data){
	debugger
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
			return Object.assign({}, state, {currentUserId: action.data});

		case ADD_USER_DATA:
			return Object.assign({}, state, {users: mergeUsers(state.users, action.data)});

		case SET_PROFILE_USER_ID:
			return Object.assign({}, state, {profileUserId: action.data});

		default:
			return state;
	}
}