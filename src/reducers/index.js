import { combineReducers } from 'redux';
import ReducerCurrentPost from './ReducerCurrentPost';
import ReducerFetchPosts from './ReducerFetchPosts';
import ReducerFetchSubreddits from './ReducerFetchSubreddits';
import ReducerLoadingState from './ReducerLoadingState';
import ReducerNotification from './ReducerNotification';
import ReducerCurrentSubreddit from './ReducerCurrentSubreddit';

export default combineReducers({
    currentPost: ReducerCurrentPost,
    posts: ReducerFetchPosts,
    subs: ReducerFetchSubreddits,
    currentSub: ReducerCurrentSubreddit,
    loaderVisible: ReducerLoadingState,
    notification: ReducerNotification
});