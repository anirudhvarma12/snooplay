import { ACTION_NEW_SUB, ACTION_ADD_DEFAULT } from './../Constants';
import { getSubreddits } from './../Api';

export default function fetchSubreddits(state = null, action) {
    switch (action.type) {
        case ACTION_NEW_SUB: {
            let newSubreddit = action.payload;
            let currentSubs = [];
            if (state != null) {
                currentSubs = state;
            }
            currentSubs.push(newSubreddit);
            return currentSubs;
        }
        case ACTION_ADD_DEFAULT: {
            let defaults = action.payload;
            let currentSubs = [];
            if (state != null) {
                currentSubs = state;
            }
            currentSubs.concat(defaults);
            return currentSubs;
        }
    }
    return state;
}