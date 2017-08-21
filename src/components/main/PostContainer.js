import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentPost } from './../../actions/';
import { bindActionCreators } from 'redux';

class PostContainer extends Component {

    closePlayer = () => {
        this.props.actions.closePlayer(null);
    }

    render() {
        let post = this.props.post;
        if (post != null) {
            return (
                <div className="player">
                    <div className="player-header">
                        <h1 className="player-title">{post.title}</h1>
                        <span>By: {post.author} </span>
                        <span>Score: {post.score} </span>
                    </div>
                    <iframe src={post.frameSrc} title={post.title} width="100%" height="600px" />
                    <div className="player-metadata">
                        <a className="button" href={post.url}>Original Link</a>
                        <a className="button" href={post.permalink}>Reddit Discussion</a>
                        <a className="button" title="Close" onClick={this.closePlayer}>Close Player</a>
                    </div>
                </div>
            )
        }
        return (<span></span>)
    }
}

function mapStateToProps(state) {
    return {
        post: state.currentPost
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            closePlayer: bindActionCreators(setCurrentPost, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);