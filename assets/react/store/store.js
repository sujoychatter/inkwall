import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
	const createStoreWithMiddleware = applyMiddleware(
		thunk
	)(createStore);
	const store = createStoreWithMiddleware(rootReducer, initialState);

	//if (module.hot) {
	//	// Enable Webpack hot module replacement for reducers
	//	module.hot.accept('../reducers', () => {
	//		const nextReducer = require('../reducers');
	//		store.replaceReducer(nextReducer);
	//	});
	//}
	return store;
}