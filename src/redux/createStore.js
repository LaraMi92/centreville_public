import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
export const middlewares = [thunk, sagaMiddleware, logger];
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default {
    store,
    persistor
};