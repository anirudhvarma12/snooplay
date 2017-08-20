import React, { Component } from 'react';
import { connect } from 'react-redux';


class PostContainer extends Component {

    render() {
        let post = this.props.post;
        if (post != null) {
            return (
                <div>
                    <h1>{post.title}</h1>
                    <iframe src={post.frameSrc} title={post.title} />
                </div>
            )
        }
        return (<span>Select a post</span>)
    }
}

function mapStateToProps(state) {
    return {
        post: state.currentPost
    }
}

export default connect(mapStateToProps, null)(PostContainer);