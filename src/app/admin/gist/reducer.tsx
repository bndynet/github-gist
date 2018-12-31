import { ACTION_LIST_GISTS_SUCCESS, ACTION_GIST_CREATE_SUCCESS, ACTION_GIST_EDIT, ACTION_GIST_GET_DETAIL_SUCCESS } from './actions';
import { AdminGistState } from '.';
import { Gist } from '../../../helpers/github';

export default function adminGist(state: AdminGistState = {gists: [], currentGist: null}, action): AdminGistState {
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
                currentGist: action.payload,
                gists,
            };

        case ACTION_GIST_EDIT:
            return {
                ...state,
                currentGist: action.payload as Gist,
            };

        case ACTION_GIST_GET_DETAIL_SUCCESS:
            return {
                ...state,
                currentGist: action.payload as Gist,
            };

        default:
            return state;
    }
}
