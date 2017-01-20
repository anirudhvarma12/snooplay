'use strict';

import React from 'react';
import { render } from 'react-dom';

class PostList extends React.Component {

    render() {
        return (
            <div>
                <ul>
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
            <li>
                <a onClick={this.handleClick}>
                    {this.props.item.title()};
                </a>
            </li>
        )
    }
}

export default PostList;