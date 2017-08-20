import {
    ACTION_NOTIFICATION, ACTION_NEW_SUB, ACTION_ADD_DEFAULT, ACTION_SET_CURRENT_SUB, ACTION_SET_POSTS, ACTION_CURRENT_POST,
    ACTION_SHOW_LOADER, ACTION_HIDE_LOADER, ACTION_SET_LAST_POST, ACTION_SET_FOLLOWUP
} from './../Constants';
import { getPosts, getFollowUpPosts } from './../Api';

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

export const setCurrentSub = (subreddit) => {
    return {
        type: ACTION_SET_CURRENT_SUB,
        payload: subreddit
    }
}

export const fetchPosts = (subreddit) => {
    return dispatch => {
        dispatch(showLoader())
        getPosts(subreddit, "hot", (posts, lastId) => {
            dispatch(setPostsInState(posts));
            dispatch(setLastPost(lastId));
            dispatch(hideLoader());
        }, (error) => {
            dispatchNotification(error);
            dispatch(hideLoader());
        });
    }
}

export const setPostsInState = (posts) => {
    return {
        type: ACTION_SET_POSTS,
        payload: posts
    };
}

export const setCurrentPost = (post) => {
    return {
        type: ACTION_CURRENT_POST,
        payload: post
    }
}

export const showLoader = () => {
    return {
        type: ACTION_SHOW_LOADER
    }
}

export const hideLoader = () => {
    return {
        type: ACTION_HIDE_LOADER
    }
}

export const setLastPost = (lastPostId) => {
    return {
        type: ACTION_SET_LAST_POST,
        payload: lastPostId
    }
}

export const loadFollowUp = (subreddit, lastPostId) => {
    return dispatch => {
        dispatch(showLoader())
        getFollowUpPosts(subreddit, "hot", lastPostId, (posts, lastId) => {
            dispatch(setFollowUpPosts(posts));
            dispatch(setLastPost(lastId));
            dispatch(hideLoader());
        }, (error) => {
            dispatchNotification(error);
            dispatch(hideLoader());
        });
    }
}

export const setFollowUpPosts = (posts) => {
    return {
        type: ACTION_SET_FOLLOWUP,
        payload: posts
    }
}