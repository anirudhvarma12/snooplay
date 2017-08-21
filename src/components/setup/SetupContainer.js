import React, { Component } from 'react';
import RecommendedSubList from './RecommendedSubList';
import AddSubredditForm from './../AddSubredditForm';
import { isSetupComplete } from './../../Api';
import { Link } from 'react-router-dom';


export default class Setup extends Component {
    render() {
        if (isSetupComplete()) {
            return (
                <div>
                    <h3>Setup is already complete</h3>
                    <Link to="/">Home</Link>
                </div>
            )
        }

        return (
            <div className="setupContainer">
                <h2>Hi, Welcome to Snooplay. The Reddit Media Player <br />To get started add a subreddit your choice below.</h2>
                <AddSubredditForm />
                <h2>Or, Get started with some awesome defaults</h2>
                <RecommendedSubList />
            </div>
        )
    }
}