'use strict'

export function getPosts(subreddit, afterload) {
    let url = 'https://www.reddit.com/r/' + subreddit + ".json";
    createListFromUrl(afterload, url);
}

export function getFollowUpPosts(subreddit, lastItem, afterload) {
    let url = "https://www.reddit.com/r/" + subreddit + ".json?count=30&after=" + lastItem;
    createListFromUrl(afterload, url);
}

function createListFromUrl(afterload, url) {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function (e) {
        let responseBody = request.responseText;
        let listing = JSON.parse(responseBody);
        let posts = listing.data.children;
        let items = [];
        let lastItemId = listing.data.after;
        posts.forEach(function (element) {
            let item = createItem(element.data);
            if (item != null) {
                items.push(item);
            }
        }, this);
        afterload(items, lastItemId);
    };
    request.send();
}

function createItem(element) {
    let videoId = element.url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoId != null) {
        return new RedditPostItem(videoId[1], element.title, element.permalink, element.id);
    }
}

export class RedditPostItem {

    constructor(videoId, title, permalink, redditId) {
        this._videoId = videoId;
        this._title = title;
        this._permalink = permalink;
        this._redditId = redditId;
    }

    videoId() {
        return this._videoId;
    }

    title() {
        return this._title;
    }

    permalink() {
        return "https://www.reddit.com/" + this._permalink;
    }

    redditId() {
        return this._redditId;
    }

}

export function isStorageAvailable() {
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

const STORE_KEY = "snooplay_subredditList";

export function storeSubreddits(items) {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(items));
}

export function getSubreddits() {
    let stored = window.localStorage.getItem(STORE_KEY);
    if (stored != null) {
        return JSON.parse(stored);
    }
}