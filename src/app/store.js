import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootSaga from './rootSaga';
import tasksReducer from '../features/tasks/tasksSlice';
import filtersReducer from '../features/filters/filterSlice';
import widgetReducer from '../features/widget/widgetSlice';
import categoriesReducer from '../features/categories/categoriesSlice';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    filters: filtersReducer,
    widget: widgetReducer,
    categories: categoriesReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['tasks']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);