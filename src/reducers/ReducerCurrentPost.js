import { ACTION_CURRENT_POST } from './../Constants';

export default function currentPostReducer(state = null, action) {
    switch (action.type) {
        case ACTION_CURRENT_POST: {
            return action.payload
        }
        default: {
            return state;
        }
    } 
}