import { combineReducers } from 'redux';
import posts from './posts';
import user from './user';
import loader from './loader';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
	posts,
	user,
	visibilityFilter,
	loader
});

export default rootReducer;