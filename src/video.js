'use strict';

import React from 'react';
import { render } from 'react-dom';

class Video extends React.Component {

    getEmbedUrl(vid) {
        let autoplay = this.props.autoplay;
        if (autoplay) {
            autoplay = 1;
        } else {
            autoplay = 0;
        }
        return 'https://www.youtube.com/embed/' + vid + "?autoplay=" + autoplay;
    }

    render() {
        let embedUrl = this.getEmbedUrl(this.props.videoId);
        if (embedUrl != null) {
            return (
                <div className="player">
                    <div className="row">
                        <h1 className="player-title">{this.props.title}</h1>
                        <iframe width="100%" height="450px" src={embedUrl}></iframe>
                    </div>
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
            <div className="row">
                <div className="playerControls">
                    <a className="playerControls-item icon-reddit" title="Open on Reddit" href={this.props.permalink}></a>
                    <div className="playerControls-listControls">
                        <a className="playerControls-item icon-prev" title="Previous" onClick={this.onPreviousClick}></a>
                        <a className="playerControls-item icon-next" title="Next" onClick={this.onNextClick}></a>
                    </div>
                </div>
            </div>
        )
    }
}

export { Video, ListControls };