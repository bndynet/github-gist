import { AuthState, ACTION_LOGOUT_REQUEST, ACTION_GETUSER_SUCCESS, ACTION_AUTH_SUCCESS } from '.';

export function auth(state: AuthState = {}, action): AuthState {
    switch (action.type) {
        case ACTION_AUTH_SUCCESS:
            return {
                ...state,
                accessToken: action.payload,
            };
        case ACTION_GETUSER_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case ACTION_LOGOUT_REQUEST:
            return { ...state, user: null };
        default:
            return state;
    }
}
