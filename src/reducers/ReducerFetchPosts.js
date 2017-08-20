import { ACTION_SET_POSTS, ACTION_SET_FOLLOWUP } from './../Constants';

export default function fetchPosts(state = null, action) {
    switch (action.type) {
        case ACTION_SET_POSTS: {
            return action.payload;
        }
        case ACTION_SET_FOLLOWUP: {
            let newState = state;
            if (newState == null) {
                newState = []
            }
            newState = newState.concat(action.payload);
            console.log("follow up length " + newState.length);
            return newState;
        }
        default: {
            return state;
        }
    }
}