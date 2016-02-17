import { combineReducers } from 'redux';
import posts from './posts';
import user from './user';
import loader from './loader';
import comments from './comments';
import visibilityFilter from './visibilityFilter';
import transparentHeader from './transparentHeader';

const rootReducer = combineReducers({
	posts,
	user,
	visibilityFilter,
	loader,
	comments,
	transparentHeader
});

export default rootReducer;