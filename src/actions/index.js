import { ACTION_NOTIFICATION, ACTION_NEW_SUB, ACTION_ADD_DEFAULT } from './../Constants';

export const dispatchNotification = (message) => {
    return {
        type: ACTION_NOTIFICATION,
        payload: message
    };
}

export const addDefaultSubreddits = (defaults) => {
    return {
        type: ACTION_ADD_DEFAULT,
        payload: defaults
    }
}

export const addSubreddit = (subreddit) => {
    return {
        type: ACTION_NEW_SUB,
        payload: subreddit
    }
}