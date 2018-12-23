import {
    ACTION_AUTH_REQUEST,
    ACTION_AUTH_SUCCESS,
    ACTION_LOGOUT_REQUEST,
    ACTION_LOGOUT_SUCCESS,
    ACTION_GETUSER_REQUEST,
    ACTION_GETUSER_SUCCESS,
    UserInfo,
    service,
} from '.';

const authActions = {
    auth: () => {
        service.auth();
        return {
            type: ACTION_AUTH_REQUEST,
        };
    },
    authSuccess: (token: string) => ({
        type: ACTION_AUTH_SUCCESS,
        payload: token,
    }),
    getUserInfo: () => ({
        type: ACTION_GETUSER_REQUEST,
    }),
    getUserInfoSuccess: (userInfo: UserInfo) => ({
        type: ACTION_GETUSER_SUCCESS,
        payload: userInfo,
    }),
    logout: () => ({
        type: ACTION_LOGOUT_REQUEST,
    }),
    logoutSuccess: () => ({
        type: ACTION_LOGOUT_SUCCESS,
    }),
};

export default authActions;
