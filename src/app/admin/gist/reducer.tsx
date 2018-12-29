import { ACTION_LIST_GISTS_SUCCESS, ACTION_GIST_CREATE_SUCCESS } from './actions';
import { AdminGistState } from '.';

export default function adminGist(state: AdminGistState = {gists: []}, action): AdminGistState {
    switch (action.type) {
        case ACTION_LIST_GISTS_SUCCESS:
            return {
                ...state,
                gists: action.payload,
            };

        case ACTION_GIST_CREATE_SUCCESS:
            const gists = state.gists;
            gists.push(action.payload);
            return {
                ...state,
                gists,
            };


        default:
            return state;
    }
}
