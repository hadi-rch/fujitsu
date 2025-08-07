import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchTimeData } from '../../services/api';
import { fetchData, fetchDataSuccess, fetchDataFailure } from './widgetSlice';

// Worker Saga: melakukan pekerjaan fetch
function* workFetchData() {
    try {
        const response = yield call(fetchTimeData);
        yield put(fetchDataSuccess(response.data));
    } catch (error) {
        yield put(fetchDataFailure(error.message));
    }
}

// Watcher Saga: mendengarkan action dan memanggil worker
function* widgetSaga() {
    yield takeLatest(fetchData.type, workFetchData);
}

export default widgetSaga;