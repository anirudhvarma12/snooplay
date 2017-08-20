import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatchNotification, addSubreddit } from './../actions';
import { storeSubreddit } from './../Api';
import { withRouter } from 'react-router-dom'

class SubmitLink extends Component {

    handleClick = () => {
        if (this.props.onClick()) {
            console.log("going to " + this.props.navigateTo());
            this.props.history.push(this.props.navigateTo());
        }
    }

    render() {
        return (
            <a onClick={this.handleClick}>{this.props.label}</a>
        )
    }
}

const NavigableSubmitLink = withRouter(SubmitLink);


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

    getNavigationTarget = () => {

    }


    render() {
        return (
            <div>
                <form>
                    /r/<input type="text" onChange={this.onInputChange} />
                    <NavigableSubmitLink onClick={this.onSubredditAdd} label="Add Subreddit" navigateTo={() => { return "/r/" + this.state.subreddit }} />
                    {/* <a className="button" onClick={this.onSubredditAdd}>Add Subreddit</a> */}
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