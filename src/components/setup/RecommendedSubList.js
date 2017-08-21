import React, { Component } from 'react';
import SubredditList from './../main/SubredditList';

export default class RecommededSubList extends Component {
    getRecommendedSubs = () => {
        return [
            'music', 'movies', 'videos', 'Documentaries', 'soccer'
        ]
    }

    render() {
        return (
            <div>
                <SubredditList subreddits={this.getRecommendedSubs()} />
            </div>
        )
    }
}
