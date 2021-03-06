// tslint:disable-next-line
import { History } from 'history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './history';
import { auth } from '../app/auth/reducers';
import { home } from '../app/home/reducers';
import { global } from '../app/global/actions';
import { adminGistState } from '../app/admin/gist';

import { reducer as github } from '../app/_service/github';

const createRootReducer = (his: History) => (combineReducers({
    router: connectRouter(his),
    global,
    auth,
    home,
    adminGistState,
    github,
}));

const rootReducer = createRootReducer(history);

export default rootReducer;
