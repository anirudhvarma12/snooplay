import { ACTION_SHOW_LOADER, ACTION_HIDE_LOADER } from './../Constants';

export default function updateLoadState(state = null, action) {
    switch (action.type) {
        case ACTION_SHOW_LOADER: {
           return true
        }
        case ACTION_HIDE_LOADER: {
            return false
        }
        default: {
            return state;
        }
    }
}