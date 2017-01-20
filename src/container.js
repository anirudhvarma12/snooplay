import React from 'react';
import { render } from 'react-dom';
import { Video, ListControls } from './video';
import PostList from './listing';
import { ps_getPosts } from './helpers';


class SubredditContainer extends React.Component {

    static get defaultProps() {
        return {
            subreddit: "Music"
        }
    }

    constructor(props) {
        super(props);
        this.itemClickHandler = this.itemClickHandler.bind(this);
        this.updateList = this.updateList.bind(this);
        this.playPrevious = this.playPrevious.bind(this);
        this.playNext = this.playNext.bind(this);
        this.state = { loading: true };
    }

    componentDidMount() {
        ps_getPosts(this.props.subreddit, function (items) {
            console.log("number of youtube videos found = " + items.length);
            this.updateList(items);
        }.bind(this));
    }

    updateList(list) {
        if (list.length > 0) {
            this.setState({ loading: false, items: list, current: list[0], currentIndex: 0 });
        }
    }

    itemClickHandler(item, index) {
        console.log("Clicked " + item.videoId());
        this.setState({ current: item, currentIndex: index });
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
                player = <div><Video title={this.state.current.title()} videoId={this.state.current.videoId()} /> <ListControls prev={this.playPrevious} next={this.playNext} /></div>
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