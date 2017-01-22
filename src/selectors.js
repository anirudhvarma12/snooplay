'use strict';

import React from 'react';
import { render } from 'react-dom';
import * as DbUtils from './helpers';

export class AddSubredditForm extends React.Component {

    static get defaultProps() {
        return {
            onAfterAdd: function () {

            }
        }
    }

    constructor(props) {
        super(props);
        this.valueChanged = this.valueChanged.bind(this);
        this.submit = this.submit.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.state = { subredditName: '' };
    }

    valueChanged(event) {
        this.setState({ subredditName: event.target.value });
    }

    submit(event) {
        console.log("Submitted" + this.state.subredditName);
        let subreddit = this.state.subredditName;
        if (!this.validateInput(subreddit)) {
            alert("Enter a valid input.");
        } else {
            let existingSubs = DbUtils.getSubreddits();
            if (existingSubs) {
                for (let i = 0; i < existingSubs.length; i++) {
                    if (existingSubs[i] == subreddit) {
                        alert("Already Added");
                        return;
                    }
                }
            } else {
                existingSubs = [];
            }
            existingSubs.push(subreddit);
            DbUtils.storeSubreddits(existingSubs);
            this.props.onAfterAdd();
        }
        event.preventDefault();
    }

    validateInput(subredditName) {
        let noWhiteSpace = subredditName.replace(/\s/g, "");
        console.log("validation: " + noWhiteSpace.length);
        if(noWhiteSpace.length>0){
            return true;
        }

        return false;
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <input type="text" placeholder="Subreddit Name eg (Music, Movies) " value={this.state.value} onChange={this.valueChanged} required />
                <button>Add Subreddit</button>
            </form>
        )
    }
}

export class SwitchSubreddit extends React.Component {
    static get defaultProps() {
        return {
            items: []
        }
    }

    constructor(props) {
        super(props)
        this.selectionChange = this.selectionChange.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            selected: ''
        }
    }

    selectionChange(event) {
        console.log("updating state " + event.target.value);
        this.setState({ selected: event.target.value });
    }

    submit(event) {
        this.props.switch(this.state.selected);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <select value={this.state.selected} onChange={this.selectionChange}>
                    {
                        this.props.items.map((item, index) => {
                            return <option key={index}>{item}</option>
                        })
                    }
                </select>
                <button>
                    Change
                </button>
            </form>
        )
    }

}