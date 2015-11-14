import * as types from '../constants/loader';

export function startLoading(){
	return {type: types.IS_LOADING}
}

export function stopLoading(){
	return {type: types.FINISHED_LOADING}
}