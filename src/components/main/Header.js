import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SubredditListContainer from './SubredditListContainer';

export default class Header extends Component {
    render() {
        return (
            <div>
                Snooplay
                <SubredditListContainer />
                <Link to="/add">Add a Subreddit</Link>
                <a href="https://github.com/anirudhvarma12/snooplay">Github</a>
            </div>
        )
    }
}