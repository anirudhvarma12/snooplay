import { ACTION_SET_LAST_POST } from './../Constants';

export default function lastPostReducer(state = null, action) {
    switch (action.type) {
        case ACTION_SET_LAST_POST: {
            return action.payload
        } default: {
            return state;
        }
    }
}