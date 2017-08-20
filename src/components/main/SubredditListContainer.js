import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubredditList from './SubredditList';

class SubredditListContainer extends Component {
    static defaultProps: {
        subreddits: []
    }

    render() {
        return (
            <SubredditList subreddits={this.props.subreddits} />
        )
    }
}

function mapStateToProps(state) {
    return {
        subreddits: state.subs
    }
}

export default connect(mapStateToProps, null)(SubredditListContainer);