import { ACTION_NOTIFICATION } from './../Constants';


export default function changeNotificationState(state = null, action) {
    switch (action.type) {
        case ACTION_NOTIFICATION: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}