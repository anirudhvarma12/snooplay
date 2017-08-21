import { ACTION_NEW_SUB } from './../Constants';

export default function fetchSubreddits(state = null, action) {
    switch (action.type) {
        case ACTION_NEW_SUB: {
            let newSubreddit = action.payload;
            let currentSubs = [];
            if (state != null) {
                currentSubs = currentSubs.concat(state);
            }
            currentSubs.push(newSubreddit);
            return currentSubs;
        }
        default: {
            return state;
        }
    }
}