import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatchNotification, addSubreddit } from './../actions';
import { storeSubreddit } from './../Api';
import { withRouter } from 'react-router-dom'
import NavigableSubmitLink from './NavigableSubmitLink';

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
        return true;
    }

    render() {
        return (
            <div className="home-content">
                <form>
                    <h1 className="">Add a Subreddit</h1>
                    <div>
                        <input placeholder="Enter Subreddit Name" type="text" onChange={this.onInputChange} />
                    </div>
                    <NavigableSubmitLink onClick={this.onSubredditAdd} label="Add Subreddit" navigateTo={() => { return "/r/" + this.state.subreddit }} />
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