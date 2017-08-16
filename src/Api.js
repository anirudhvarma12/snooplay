import he from 'he';
import cheerio from 'cheerio';

export const FILTER_HOT = 'hot';
export const FILTER_NEW = 'new';
export const FILTER_TOP = 'top';

const createPost = (object) => {
    if (object.secure_media_embed && object.media) {
        console.log(object.title, object.url, object.author_flair_text);
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
                console.log(item);
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