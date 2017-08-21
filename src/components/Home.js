import React, { Component } from 'react';
import SubredditListContainer from './main/SubredditListContainer';
import { Redirect } from 'react-router-dom';
import { isSetupComplete } from './../Api';

export default class Home extends Component {
    render() {
        if (!isSetupComplete()) {
            return <Redirect to="/setup" />
        }
        return (
            <div>
                <div className="home-content">
                    <h1>Welcome Back!<br />Select a sub reddit to get started</h1>
                    <SubredditListContainer />
                </div>
            </div>
        )
    }
}