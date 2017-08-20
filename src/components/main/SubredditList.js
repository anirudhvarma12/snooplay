import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SubredditList extends Component {

    render() {
        return (
            <div>
                <ul>
                    {this.props.subreddits.map(sub => {
                        return <li key={sub}><Link to={"/r/" + sub}>/r/{sub}</Link> </li>
                    })}
                </ul>
            </div>
        )
    }
}