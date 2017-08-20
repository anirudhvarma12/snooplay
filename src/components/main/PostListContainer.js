import React, { Component } from 'react';
import PostsList from './PostsList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts, setCurrentPost } from './../../actions';
import LoadMoreLink from './LoadFollowUp';


class PostListContainer extends Component {
    static defaultProps: {
        posts: []
    }


    componentDidMount() {
        this.props.actions.loadPosts(this.props.selectedSub)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSub !== this.props.selectedSub) {
            this.props.actions.loadPosts(nextProps.selectedSub)
        }
    }

    onPostChanged = (post) => {
        this.props.actions.setCurrentPost(post);
    }

    render() {
        return (
            <div>
                <PostsList posts={this.props.posts} onPostChanged={this.onPostChanged} />
                <LoadMoreLink />
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        selectedSub: state.currentSub
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadPosts: bindActionCreators(fetchPosts, dispatch),
            setCurrentPost: bindActionCreators(setCurrentPost, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);