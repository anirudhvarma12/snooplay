import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getSubreddits } from './Api';

const initialState = () => {
    let subs = getSubreddits();
    return {
        subs: subs,
        posts: []
    }
}

export default function configureStore() {
    return createStore(rootReducer, initialState(), applyMiddleware(thunk));
};