import { NotifierOptions } from '../../ui';
import { LocaleType } from '../../locales';
import { KEY_LOCALE, KEY_THEME } from '.';
import { ClientTheme } from '../../theme';
import storage from '../../storage';

export const ACTION_LOADING_SHOW = 'G_LOADING_SHOW';
export const ACTION_LOADING_HIDE = 'G_LOADING_HIDE';
export const ACTION_NOTIFIER_SHOW = 'G_NOTIFIER_SHOW';
export const ACTION_NOTIFIER_HIDE = 'G_NOTIFIER_HIDE';
export const ACTION_REQUESTING_SHOW = 'G_REQUESTING_SHOW';
export const ACTION_REQUESTING_HIDE = 'G_REQUESTING_HIDE';
export const ACTION_THEME_CHANGE = 'G_THEME_CHANGE';
export const ACTION_LOCALE_CHANGE = 'G_LOCALE_CHANGE';

export const global = (state = { loading: false }, action) => {
    switch (action.type) {
        case ACTION_LOADING_SHOW:
            const { loadingText } = action.payload;
            return { ...state, loading: true, loadingText };
        case ACTION_LOADING_HIDE:
            return { ...state, loading: false };

        case ACTION_REQUESTING_SHOW:
            return { ...state, requesting: true };
        case ACTION_REQUESTING_HIDE:
            return { ...state, requesting: false};

        case ACTION_NOTIFIER_SHOW:
            const notifierOptions = action.notifierOptions;
            return { ...state, showNotifier: true, notifierOptions };
        case ACTION_NOTIFIER_HIDE:
            return { ...state, showNotifier: false };

        case ACTION_THEME_CHANGE:
            storage.set(KEY_THEME, action.theme);
            return {...state, theme: action.theme };

        case ACTION_LOCALE_CHANGE:
            storage.set(KEY_LOCALE, action.locale);
            return {...state, locale: action.locale };

        default:
            return state;
    }
};

export const globalActions = {
    showLoading: (text?: string) => ({
        type: ACTION_LOADING_SHOW,
        payload: {
            loadingText: text || 'Loading...',
        },
    }),
    hideLoading: () => ({
        type: ACTION_LOADING_HIDE,
    }),

    showRequesting: () => ({
        type: ACTION_REQUESTING_SHOW,
    }),
    hideRequesting: () => ({
        type: ACTION_REQUESTING_HIDE,
    }),

    notify: (notifierOptions: NotifierOptions) => ({
        type: ACTION_NOTIFIER_SHOW,
        notifierOptions,
    }),
    notifyInfo: (message: string) => ({
        type: ACTION_NOTIFIER_SHOW,
        notifierOptions: {
            message,
            variant: 'info',
        },
    }),
    notifySuccess: (message: string) => ({
        type: ACTION_NOTIFIER_SHOW,
        notifierOptions: {
            message,
            variant: 'success',
        },
    }),
    notifyWarning: (message: string) => ({
        type: ACTION_NOTIFIER_SHOW,
        notifierOptions: {
            message,
            variant: 'warning',
        },
    }),
    notifyError: (message: string) => ({
        type: ACTION_NOTIFIER_SHOW,
        notifierOptions: {
            message,
            variant: 'error',
        },
    }),
    unnotify: () => ({
        type: ACTION_NOTIFIER_HIDE,
    }),

    changeTheme: (theme: ClientTheme) => ({
        type: ACTION_THEME_CHANGE,
        theme,
    }),

    changeLocale: (locale: LocaleType) => ({
        type: ACTION_LOCALE_CHANGE,
        locale,
    }),
};

export default globalActions;
