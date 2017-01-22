import React from 'react';
import { render } from 'react-dom';
import { Video, ListControls } from './video';
import PostList from './listing';
import { getPosts, getFollowUpPosts } from './helpers';


class SubredditContainer extends React.Component {

    constructor(props) {
        super(props);
        this.itemClickHandler = this.itemClickHandler.bind(this);
        this.resetList = this.resetList.bind(this);
        this.updateListOnly = this.updateListOnly.bind(this);
        this.playPrevious = this.playPrevious.bind(this);
        this.playNext = this.playNext.bind(this);
        this.loadMoreItems = this.loadMoreItems.bind(this);
        this.onLoadError = this.onLoadError.bind(this);
        this.state = { loading: true, autoplay: false, subreddit: this.props.subreddit, lastItemId: "" };
    }

    onLoadError() {
        this.setState({ current: null, loading: false, items: [] });
    }

    componentDidMount() {
        getPosts(this.state.subreddit, function (items, lastItemId) {
            console.log("number of youtube videos found = " + items.length);
            this.resetList(items, lastItemId);
        }.bind(this), this.onLoadError);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.subreddit != this.props.subreddit) {
            console.log("Updating SR " + nextProps.subreddit + " current " + this.props.subreddit);
            this.setState({ loading: true, subreddit: nextProps.subreddit });
            getPosts(nextProps.subreddit, function (items, lastItem) {
                console.log("number of youtube videos found for updated= " + items.length);
                this.resetList(items, lastItem);
            }.bind(this), this.onLoadError);
        }
    }

    resetList(list, lastItem) {
        if (list.length > 0) {
            this.setState({ loading: false, items: list, current: list[0], currentIndex: 0, lastItemId: lastItem });
        }else{
            this.onLoadError();
        }
    }

    updateListOnly(list, lastItem) {
        this.setState({ loading: false, items: list, lastItemId: lastItem });
    }


    itemClickHandler(item, index) {
        console.log("Clicked " + item.videoId());
        this.setState({ current: item, currentIndex: index, autoplay: true });
    }

    playPrevious() {
        let currentIndex = this.state.currentIndex;
        let newIndex = 0;
        if (currentIndex == 0 && this.state.items.length > 0) {
            newIndex = this.state.items.length - 1;
        } else {
            newIndex = currentIndex - 1;
        }
        this.itemClickHandler(this.state.items[newIndex], newIndex);
    }

    playNext() {
        let currentIndex = this.state.currentIndex;
        let newIndex = 0;
        if (currentIndex != (this.state.items.length - 1)) {
            newIndex = currentIndex + 1;
        }
        this.itemClickHandler(this.state.items[newIndex], newIndex);
    }

    loadMoreItems() {
        let count = this.state.items.length;
        if (count > 0) {
            let lastItem = this.state.items[count - 1];
            getFollowUpPosts(this.state.subreddit, this.state.lastItemId, function (elements, lastItem) {
                let current = this.state.items;
                current = current.concat(elements);
                this.updateListOnly(current, lastItem);
            }.bind(this), this.onLoadError);
        }
    }

    render() {
        if (this.state.loading) {
            return <span className="loading"></span>
        } else {
            let player = <div className="error">No Video Found<br />If you are sure that the subreddit you have seleced has videos, 
            then check the name of the Subreddit for spelling mistakes.</div>
            if (this.state.current != null) {
                player = <div>
                    <Video title={this.state.current.title()} videoId={this.state.current.videoId()} autoplay={this.state.autoplay} />
                    <ListControls prev={this.playPrevious} next={this.playNext} permalink={this.state.current.permalink()} />
                </div>
            }
            return (
                <div>
                    <div>
                        {player}
                    </div>
                    <PostList items={this.state.items} onItemClick={this.itemClickHandler} />
                    <div className="row">
                        <div className="postItem loadMoreLink">
                            <a className="postItem-playLink" onClick={this.loadMoreItems}>Load More</a>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default SubredditContainer;