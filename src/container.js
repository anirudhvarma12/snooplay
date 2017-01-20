import React from 'react';
import { render } from 'react-dom';
import { Video, ListControls } from './video';
import PostList from './listing';
import { ps_getPosts } from './helpers';


class SubredditContainer extends React.Component {

    constructor(props) {
        super(props);
        this.itemClickHandler = this.itemClickHandler.bind(this);
        this.updateList = this.updateList.bind(this);
        this.playPrevious = this.playPrevious.bind(this);
        this.playNext = this.playNext.bind(this);
        this.state = { loading: true, autoplay: false, subreddit: this.props.subreddit };
    }

    componentDidMount() {
        ps_getPosts(this.state.subreddit, function (items) {
            console.log("number of youtube videos found = " + items.length);
            this.updateList(items);
        }.bind(this));
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.subreddit != this.props.subreddit) {
            console.log("Updating SR " + nextProps.subreddit + " current " + this.props.subreddit);
            this.setState({ loading: true, subreddit: nextProps.subreddit });
            ps_getPosts(nextProps.subreddit, function (items) {
                console.log("number of youtube videos found for updated= " + items.length);
                this.updateList(items);
            }.bind(this));
        }
    }

    updateList(list) {
        if (list.length > 0) {
            this.setState({ loading: false, items: list, current: list[0], currentIndex: 0 });
        }
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

    render() {
        if (this.state.loading) {
            return <span>Loading</span>
        } else {
            let player = <span>No Video Found</span>
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
                </div>
            )
        }
    }
}

export default SubredditContainer;