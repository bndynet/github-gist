import { call, put, takeLatest } from 'redux-saga/effects';
import globalActions from '../../global/actions';
import actions, { ACTION_LIST_GISTS_REQUEST, ACTION_GIST_CREATE_REQUEST, ACTION_GIST_UPDATE_REQUEST, ACTION_GIST_GET_DETAIL_REQUEST, ACTION_GIST_REMOVE } from './actions';
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
        if (action.resolve) {
            yield call(action.resolve);
        }
        yield put(globalActions.hideLoading());
        yield put(globalActions.notifySuccess('Your gist has been created successfully.'));
    } catch (e) {
        yield put(globalActions.hideLoading());
        yield put(globalActions.notifyError('Failed to create your gist!'));
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
        if (action.resolve) {
            yield call(action.resolve);
        }
        yield put(globalActions.hideLoading());
        yield put(globalActions.notifySuccess('Your gist has been updated successfully.'));
    } catch (e) {
        yield put(globalActions.hideLoading());
        yield put(globalActions.notifyError('Failed to update your gist!'));
    }
}

function* getGistDetail(action) {
    try {
        yield put(globalActions.showLoading('Getting gist detail...'));
        const gh = yield call(() => new GitHub({accessToken: getAuthState().accessToken}));
        const gist = yield call(gh.getGistDetail, action.payload);
        yield put(actions.getGistDetailSuccess(gist));
        if (action.resolve) {
            yield call(action.resolve);
        }
        yield put(globalActions.hideLoading());
    } catch (e) {
        yield put(globalActions.hideLoading());
    }
}

function* removeGist(action) {
    try {
        yield put(globalActions.showLoading('Deleting...'));
        const gh = yield call(() => new GitHub({accessToken: getAuthState().accessToken}));
        yield call(gh.removeGist, action.payload.id);
        yield put(globalActions.hideLoading());
        if (action.meta && action.meta.callback) {
            action.meta.callback();
        }
    } catch (e) {
        yield put(globalActions.hideLoading());
    }
}

function* adminGistSaga() {
    yield takeLatest(ACTION_LIST_GISTS_REQUEST, listGists);
    yield takeLatest(ACTION_GIST_CREATE_REQUEST, createGist);
    yield takeLatest(ACTION_GIST_UPDATE_REQUEST, updateGist);
    yield takeLatest(ACTION_GIST_GET_DETAIL_REQUEST, getGistDetail);
    yield takeLatest(ACTION_GIST_REMOVE, removeGist);
}

export default adminGistSaga;
