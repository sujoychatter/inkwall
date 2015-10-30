import * as Constants from '../constants/visibilityFilters';
import fetch from 'isomorphic-fetch';

export function setVisibilityFilter(filter){
	return {
		type: Constants.SET_VISIBILITY,
		filter: filter
	}
}
