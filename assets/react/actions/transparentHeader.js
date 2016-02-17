import * as types from '../constants/transparentHeader';

export function setheaderTransparent(){
	return {type: types.TRANSPARENT}
}

export function setheaderOpaque(){
	return {type: types.NON_TRANSPARENT}
}