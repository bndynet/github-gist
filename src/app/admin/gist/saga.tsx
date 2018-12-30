import { call, put, takeLatest } from 'redux-saga/effects';
import globalActions from '../../global/actions';
import actions, { ACTION_LIST_GISTS_REQUEST, ACTION_GIST_CREATE_REQUEST, ACTION_GIST_UPDATE_REQUEST, ACTION_GIST_GET_DETAIL_REQUEST } from './actions';
import { getState as getAuthState } from '../../auth';
import { GitHub, Gist } from '../../../helpers/github';

function* listGists() {
    try {
        yield put(globalActions.showLoading('Fetching gists...'));
        const gh = yield call(() => new GitHub({accessToken: getAuthState().accessToken}));
        const gists = yield call(gh.getGists);
        yield put(actions.listGistsSuccess(gists as Gist[]));
        yield put(globalActions.hideLoading());
    } catch (e) {
        yield put(globalActions.hideLoading());
    }
}

function* createGist(action) {
    try {
        yield put(globalActions.showLoading('Committing gist to GitHub...'));
        const gh = yield call(() => new GitHub({accessToken: getAuthState().accessToken}));
        const gist = yield call(gh.createGist,
            action.payload.title,
            { 'default.md': {content: action.payload.content} },
            action.payload.isPrivate);
        yield put(actions.createGistSuccess(gist));
        yield put(globalActions.hideLoading());
    } catch (e) {
        yield put(globalActions.hideLoading());
    }
}

function* updateGist(action) {
    try {
        yield put(globalActions.showLoading('Updatting your gist...'));
        const gh = yield call(() => new GitHub({accessToken: getAuthState().accessToken}));
        const gist = yield call(gh.updateGist,
            action.payload.id,
            action.payload.title,
            { 'default.md': {content: action.payload.content} },
            action.payload.isPrivate);
        yield put(actions.updateGistSuccess(gist));
        yield put(globalActions.hideLoading());
    } catch (e) {
        yield put(globalActions.hideLoading());
    }
}

function* getGistDetail(action) {
    try {
        yield put(globalActions.showLoading('Getting gist detail...'));
        const gh = yield call(() => new GitHub({accessToken: getAuthState().accessToken}));
        const gist = yield call(gh.getGistDetail, action.payload);
        yield put(actions.getGistDetailSuccess(gist));
        yield put(globalActions.hideLoading());
    } catch (e) {
        yield put(globalActions.hideLoading());
    }
}

function* adminGistSaga() {
    yield takeLatest(ACTION_LIST_GISTS_REQUEST, listGists);
    yield takeLatest(ACTION_GIST_CREATE_REQUEST, createGist);
    yield takeLatest(ACTION_GIST_UPDATE_REQUEST, updateGist);
    yield takeLatest(ACTION_GIST_GET_DETAIL_REQUEST, getGistDetail);
}

export default adminGistSaga;
