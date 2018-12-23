import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ACTION_LOGOUT_REQUEST, ACTION_GETUSER_REQUEST, UserInfo, ACTION_AUTH_SUCCESS, ACTION_AUTH_REQUEST } from '.';
import globalActions from '../global/actions';
import authActions from './actions';
import authService from './service';

function* auth() {
    yield put(globalActions.showLoading('Redirecting to authorize...'));
}

function* authSuccess(action) {
    yield put(authActions.getUserInfo());
}

function* logout(action) {
    try {
        yield put(globalActions.showLoading('Logging out...'));
        // request backend to terminate session
        yield call(authService.logout);
        yield put(authActions.logoutSuccess());
        yield put(globalActions.hideLoading());
        yield put(push('/logout'));
    } catch (e) {
        yield put(globalActions.hideLoading());
    }
}

function* getUser(action) {
    try {
        yield put(globalActions.showLoading('Fetching user info...'));
        const response = yield call(authService.getUser);
        yield put(authActions.getUserInfoSuccess(response as UserInfo));
        yield put(globalActions.hideLoading());
        yield put(push('/admin'));
    } catch (e) {
        yield put(globalActions.hideLoading());
    }
}

function* authSaga() {
    yield takeLatest(ACTION_AUTH_REQUEST, auth);
    yield takeLatest(ACTION_AUTH_SUCCESS, authSuccess);
    yield takeLatest(ACTION_LOGOUT_REQUEST, logout);
    yield takeLatest(ACTION_GETUSER_REQUEST, getUser);
}

export default authSaga;
