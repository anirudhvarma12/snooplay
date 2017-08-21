import React, { Component } from 'react';


export default class PostsList extends Component {

    static defaultProps: {
        posts: []
    }

    render() {
        return (
            <ul className="post-list">
                {this.props.posts.map(post => {
                    return <li key={post.id}>
                        <div className="post-container">
                            <a onClick={() => { this.props.onPostChanged(post) }} className="postContainer-title">
                                {post.title}
                            </a>
                            <br />
                            <div className="postContainer-metadata">
                                <span>By: {post.author} </span>
                                <span>Score: {post.score} </span><br />
                                <span><a href={post.url}>Original Link</a></span>
                                <span><a href={post.permalink}>Reddit Discussion</a></span>
                            </div>
                        </div>
                    </li>
                })}
            </ul>
        )
    }
}