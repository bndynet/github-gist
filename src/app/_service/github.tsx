import { call, put, takeLatest } from 'redux-saga/effects';

import { store } from '../../redux';
import { getState as getAuthState } from '../auth';
import { GitHub, Notification, Issue } from '../../helpers/github';

const ACTION_NOTIFICATION_REQUEST = 'github/notification/request';
const ACTION_NOTIFICATION_SUCCESS = 'github/notification/success';
const ACTION_NOTIFICATION_FAILURE = 'github/notification/failure';

const ACTION_ACTIVITY_REQUEST = 'github/events/request';
const ACTION_ACTIVITY_SUCCESS = 'github/events/success';
const ACTION_ACTIVITY_FAILURE = 'github/events/failure';

const ACTION_ISSUE_REQUEST = 'github/issues/request';
const ACTION_ISSUE_SUCCESS = 'github/issues/success';
const ACTION_ISSUE_FAILURE = 'github/issues/failure';

export interface Activity {
    created_at: string;
    repo: { id: number; name: string };
}

export interface State {
    notifications: Notification[];
    activities: Activity[];
    issues: Issue[];
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
    activityRequest: () => ({
        type: ACTION_ACTIVITY_REQUEST,
    }),
    activitySuccess: (activities: Activity[]) => ({
        type: ACTION_ACTIVITY_SUCCESS,
        payload: activities,
    }),
    activityFailure: () => ({
        type: ACTION_ACTIVITY_FAILURE,
    }),
    issueRequest: () => ({
        type: ACTION_ISSUE_REQUEST,
    }),
    issueSuccess: (issues: Issue[]) => ({
        type: ACTION_ISSUE_SUCCESS,
        payload: issues,
    }),
    issueFailure: () => ({
        type: ACTION_ISSUE_FAILURE,
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

        case ACTION_ACTIVITY_SUCCESS:
            return {...state, activities: action.payload};
        case ACTION_ISSUE_SUCCESS:
            return {...state, issues: action.payload};
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

function* getActivities() {
    try {
        const gh = yield call(() => new GitHub({accessToken: getAuthState().accessToken}));
        const activities = yield call(gh.getActivities, getAuthState().user.login, 100, 1);
        yield put(actions.activitySuccess(activities));
    } catch (e) {
        yield put(actions.activityFailure());
    }
}

function* getIssues() {
    try {
        const gh = yield call(() => new GitHub({accessToken: getAuthState().accessToken}));
        const issues = yield call(gh.getIssues);
        yield put(actions.issueSuccess(issues));
    } catch (e) {
        yield put(actions.issueFailure());
    }
}

export function* saga() {
    yield takeLatest(ACTION_NOTIFICATION_REQUEST, getNotifications);
    yield takeLatest(ACTION_ACTIVITY_REQUEST, getActivities);
    yield takeLatest(ACTION_ISSUE_REQUEST, getIssues);
}
