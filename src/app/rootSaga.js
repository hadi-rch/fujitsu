import { all } from 'redux-saga/effects';
import widgetSaga from '../features/widget/widgetSaga';

export default function* rootSaga() {
    yield all([
        widgetSaga(),
    ]);
}