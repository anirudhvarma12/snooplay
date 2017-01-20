'use strict';

import React from 'react';
import { render } from 'react-dom';

class Video extends React.Component {

    getEmbedUrl(vid) {
        return 'https://www.youtube.com/embed/' + vid;
    }

    render() {
        let embedUrl = this.getEmbedUrl(this.props.videoId);
        if (embedUrl != null) {
            return (
                <div>
                    <h1>{this.props.title}</h1>
                    <iframe src={embedUrl}></iframe>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>{this.props.title}</h1>
                    <span>:( Could not find video id for URL <a href={this.props.vid}>{this.props.vid}</a></span>
                </div>
            )
        }

    }
}

class ListControls extends React.Component {

    constructor(props) {
        super(props);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    onPreviousClick() {
        this.props.prev();
    }

    onNextClick() {
        this.props.next();
    }

    render() {
        return (
            <div>
                <a onClick={this.onPreviousClick}>Previous</a>
                <a onClick={this.onNextClick}>Next</a>
            </div>
        )
    }
}

export { Video, ListControls };