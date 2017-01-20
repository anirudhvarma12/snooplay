'use strict'

export function ps_getPosts(subreddit, afterload) {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://www.reddit.com/r/' + subreddit +".json");
    request.onload = function (e) {
        let responseBody = request.responseText;
        let listing = JSON.parse(responseBody);
        let posts = listing.data.children;
        let items = [];
        posts.forEach(function (element) {
            let item = createItem(element.data);
            if (item != null) {
                items.push(item);
            }
        }, this);
        afterload(items);
    };
    request.send();
}

function createItem(element) {
    let videoId = element.url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoId != null) {
        return new RedditPostItem(videoId[1], element.title, element.permalink);
    }
}

class RedditPostItem {

    constructor(videoId, title, permalink) {
        this._videoId = videoId;
        this._title = title;
        this._permalink = permalink;
    }

    videoId() {
        return this._videoId;
    }

    title() {
        return this._title;
    }

    permalink() {
        return this._permalink;
    }

}

export default RedditPostItem;