'use strict';

import React from 'react';
import { render } from 'react-dom';

class PostList extends React.Component {

    render() {
        return (
            <div className="row">
                <ul className="postList">
                    {
                        this.props.items.map((item, index) => {
                            return <PostItem item={item} key={index} onClick={this.props.onItemClick} />
                        })
                    }
                </ul>
            </div>
        )
    }

}

class PostItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.item);
    }

    render() {
        return (
            <li className="postItem">
                <a onClick={this.handleClick} className="postItem-playLink  icon-play">
                    {this.props.item.title()};
                </a>
                <a className="postItem-permalink" href={this.props.item.permalink()}>{this.props.item.permalink()}</a>
            </li>
        )
    }
}

export default PostList;