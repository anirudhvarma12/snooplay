import React, {Component} from 'react';
import Header from './main/Header';
import SubredditListContainer from './main/SubredditListContainer';

export default class Home extends Component {
    render(){
        return (
            <div>
                <Header />
                <SubredditListContainer />
            </div>
        )
    }
}