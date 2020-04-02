import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import requestMiddleware from './reducers/request/middleware';
import streamsMiddleware from './reducers/streams/middleware';
import mainReducer from './reducers';

const store = createStore(mainReducer, applyMiddleware(thunk, streamsMiddleware, requestMiddleware));

export default store;
