import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import guidesReducer from './reducers/guides';
import breadCrumbsReducer from './reducers/breadCrumbs';
import authReducer from './reducers/auth';
import commentsReducer from "./reducers/comments";

const rootReducer = combineReducers({
    guides: guidesReducer,
    breadCrumbs: breadCrumbsReducer,
    auth: authReducer,
    comments: commentsReducer
});
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];