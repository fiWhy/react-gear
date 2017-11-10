import { ReducerCombiner } from '../utils/reducer/reducer.combiner';
import { createStore, applyMiddleware } from 'redux';
import { registerReducers } from "../config/bootstrap";
import { async } from '../middlewares/async.middleware';
import { logger } from '../middlewares/logger.middleware';
import thunk from 'redux-thunk';

registerReducers();

let combinedReducers = ReducerCombiner.combinedReducers;
const AppStore = createStore(
    applyMiddleware(
        thunk,
        // async as Redux.Middleware,
        // logger as Redux.Middleware
    )
);

export default AppStore;