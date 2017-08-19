import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatchNotification, addSubreddit } from './../actions';
import { storeSubreddit } from './../Api';

class AddSubredditForm extends Component {

    constructor() {
        super();
        this.state = {
            subreddit: ''
        };
    }

    onInputChange = (event) => {
        this.setState({
            subreddit: event.target.value
        });
    }

    onSubredditAdd = () => {
        storeSubreddit(this.state.subreddit);
        this.props.actions.addSubreddit(this.state.subreddit);
    }

    render() {
        return (
            <div>
                <form>
                    /r/<input type="text" onChange={this.onInputChange} /> <a className="button" onClick={this.onSubredditAdd}>Add Subreddit</a>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            dispatchNotification: bindActionCreators(dispatchNotification, dispatch),
            addSubreddit: bindActionCreators(addSubreddit, dispatch)
        }
    }
}

export default connect(null, mapDispatchToProps)(AddSubredditForm);