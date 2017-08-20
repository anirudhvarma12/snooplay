import React, { Component } from 'react';


export default class PostsList extends Component {

    static defaultProps: {
        posts: []
    }

    render() {
        return (
            <ul>
                {this.props.posts.map(post => {
                    return <li key={post.id}>
                        <a onClick={()=>{this.props.onPostChanged(post)}}>
                            {post.title}
                        </a>
                    </li>
                })}
            </ul>
        )
    }
}