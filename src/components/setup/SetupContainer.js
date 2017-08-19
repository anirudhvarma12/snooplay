import React, { Component } from 'react';
import RecommendedSubList from './RecommendedSubList';
import AddSubredditForm from './../AddSubredditForm';


export default class Setup extends Component {
    render() {
        return (
            <div>
                <h2>Hi, Welcome to Snooplay. To get started add a subreddit your choice below.</h2>
                <AddSubredditForm />
                <h2>Or, Get started with some awesome defaults</h2>
                <RecommendedSubList />
            </div>
        )
    }
}