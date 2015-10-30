import { combineReducers } from 'redux';
import posts from './posts';
import user from './user';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
	posts,
	user,
	visibilityFilter
});

export default rootReducer;