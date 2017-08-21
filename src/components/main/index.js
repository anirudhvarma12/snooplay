import React, { Component } from 'react';
import PostListContainer from './PostListContainer';
import PostContainer from './PostContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentSub, fetchPosts } from './../../actions/';
import { withRouter } from 'react-router-dom';

class AppSection extends Component {

    componentWillMount() {
        let currentSub = this.props.match.params.subreddit;
        // let currentFilter = this.props.match.params.filter;
        this.props.actions.setCurrentSub(currentSub);
    }

    componentWillReceiveProps(nextProps) {
        let currentSub = nextProps.match.params.subreddit;
        this.props.actions.setCurrentSub(currentSub);
    }

    render() {
        return (
            <div>
                <PostContainer />
                <PostListContainer />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            setCurrentSub: bindActionCreators(setCurrentSub, dispatch),
            loadPosts: bindActionCreators(fetchPosts, dispatch)
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(AppSection));