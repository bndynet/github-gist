import { all } from 'redux-saga/effects';

import authSaga from '../app/auth/saga';
import homeSaga from '../app/home/saga';
import adminGistSaga from '../app/admin/gist/saga';
import { saga as githubSaga } from '../app/_service/github';

export default function* rootSaga() {
    yield all([ authSaga(), homeSaga(), adminGistSaga(), githubSaga() ]);
}
