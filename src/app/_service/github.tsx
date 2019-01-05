import { call, put, takeLatest } from 'redux-saga/effects';

import { store } from '../../redux';
import { getState as getAuthState } from '../auth';
import { GitHub, Notification } from '../../helpers/github';

const ACTION_NOTIFICATION_REQUEST = 'github/notification/request';
const ACTION_NOTIFICATION_SUCCESS = 'github/notification/success';
const ACTION_NOTIFICATION_FAILURE = 'github/notification/failure';

export interface State {
    notifications: Notification[];
}

export const getState = (): State => (store && store.getState().github) || {};

export const actions = {
    notificationRequest: () => ({
        type: ACTION_NOTIFICATION_REQUEST,
    }),
    notificationSuccess: (notifications: Notification[]) => ({
        type: ACTION_NOTIFICATION_SUCCESS,
        payload: notifications,
    }),
    notificationFailure: () => ({
        type: ACTION_NOTIFICATION_FAILURE,
        payload: [],
    }),
};

export const reducer = (state: State, action) => {
    switch (action.type) {
        case ACTION_NOTIFICATION_REQUEST:
            return {...state};
        case ACTION_NOTIFICATION_SUCCESS:
            return {...state, notifications: action.payload};
        case ACTION_NOTIFICATION_FAILURE:
            return {...state};
        default:
            return {...state};
    }
};


function* getNotifications() {
    try {
        const gh = yield call(() => new GitHub({accessToken: getAuthState().accessToken}));
        const notifications = yield call(gh.getNotifications);
        yield put(actions.notificationSuccess(notifications));
    } catch (e) {
        yield put(actions.notificationFailure());
    }
}

export function* saga() {
    yield takeLatest(ACTION_NOTIFICATION_REQUEST, getNotifications);
}
