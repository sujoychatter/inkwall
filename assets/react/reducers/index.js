import { combineReducers } from 'redux';
import posts from './posts';
import user from './user';
import loader from './loader';
import comments from './comments';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
	posts,
	user,
	visibilityFilter,
	loader,
	comments
});

export default rootReducer;