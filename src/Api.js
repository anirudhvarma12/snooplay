import he from 'he';
import cheerio from 'cheerio';

export const FILTER_HOT = 'hot';
export const FILTER_NEW = 'new';
export const FILTER_TOP = 'top';

const createPost = (object) => {
    if (object.secure_media_embed && object.media) {
        let post = { id: object.id, author: object.author, score: object.score, title: object.title };
        post.url = object.url;
        post.permalink = "https://reddit.com/" + object.permalink;
        let frame = cheerio.load(he.decode(object.secure_media_embed.content));
        post.frameSrc = frame('iframe').attr("src");
        return post;
    }
    return null;
}

const createListFromUrl = (url, onsuccess, onerror) => {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function (e) {
        let responseBody = request.responseText;
        let listing = JSON.parse(responseBody);
        let posts = listing.data.children;
        let items = [];
        let lastItemId = listing.data.after;
        posts.forEach(function (element) {
            let item = createPost(element.data);
            if (item != null) {
                items.push(item);
            }
        }, this);
        onsuccess(items, lastItemId);
    };
    request.onerror = function (e) {
        onerror(e);
    };
    request.send();
}

export const getPosts = (subreddit, filter, onsuccess, onerror) => {
    let url = 'https://www.reddit.com/r/' + subreddit + '/' + filter + ".json?limit=60";
    createListFromUrl(url, onsuccess, onerror);
}

export const getFollowUpPosts = (subreddit, filter, lastItem, onsuccess, onerror) => {
    let url = "https://www.reddit.com/r/" + subreddit + '/' + filter + ".json?count=30&after=" + lastItem;
    createListFromUrl(url, onsuccess, onerror);
}

export const isStorageAvailable = () => {
    //test if localstorage is available.
    try {
        var storage = window['localStorage'],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return false;
    }
}

const STORE_KEY = "snooplay2_subredditList";

export const storeSubreddits = (items) => {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(items));
}

export const storeSubreddit = (item) => {
    let current = getSubreddits();
    if (current.indexOf(item) === -1) {
        current.push(item);
        storeSubreddits(current);
    }
}

export const getSubreddits = () => {
    let stored = window.localStorage.getItem(STORE_KEY);
    if (stored != null) {
        return JSON.parse(stored);
    }
    return [];
}

export const isSetupComplete = () => {
    let subs = getSubreddits();
    return subs.length > 0;
}