import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SubredditListContainer from './SubredditListContainer';
import { connect } from 'react-redux';

const SELECTOR_VISIBLE = {
    display: 'block'
};

const SELECTOR_HIDDEN = {
    display: 'none'
};

class Header extends Component {

    constructor() {
        super();
        this.state = {
            showSelector: false
        };
    }

    toggleSubSelector = () => {
        let current = this.state.showSelector;
        this.setState({
            showSelector: !current
        });
    }

    render() {
        let style = SELECTOR_HIDDEN;
        if (this.state.showSelector) {
            style = SELECTOR_VISIBLE;
        }
        let subredditName = <span></span>
        let currentSub = this.props.subredditName;
        if (currentSub != null) {
            subredditName = <span>/r/{currentSub}</span>
        }
        return (
            <div>
                <div className="header">
                    <span className="header-title">Snooplay {subredditName}</span>
                    <div className="header-menu">
                        <a onClick={this.toggleSubSelector}>My Subreddits</a>
                        <Link to="/add">Add a Subreddit</Link>
                        <a href="https://github.com/anirudhvarma12/snooplay">Github</a>
                    </div>
                </div>
                <div className="header-subSelector" style={style}>
                    <SubredditListContainer />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        subredditName: state.currentSub
    }
}

export default connect(mapStateToProps, null)(Header);