import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import newGuideReducer from './reducers/newGuide';
import guidesReducer from './reducers/guides';
import breadCrumbsReducer from './reducers/breadCrumbs';

const rootReducer = combineReducers({
    newGuide: newGuideReducer,
    guides: guidesReducer,
    breadCrumbs: breadCrumbsReducer,
});
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];