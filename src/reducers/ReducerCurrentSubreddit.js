import { ACTION_SET_CURRENT_SUB } from './../Constants';

export default function currentSubreddit(state = null, action) {
    switch (action.type) {
        case ACTION_SET_CURRENT_SUB: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
} 