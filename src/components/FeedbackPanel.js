import React, { Component } from 'react';
import { connect } from 'react-redux';

class FeedbackPanel extends Component {

    static defaultProps : {
        message: ''
    }

    render() {
        return (
            <div className="feedback-panel">
                {this.props.message}
                <a>Hide</a>
            </div>
        )
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.message) {
    //         console.log("Received new message to show", message);
    //     }
    // }
}

function mapStateToProps(state) {
    return {
        message: state.notification
    };
}

export default connect(mapStateToProps, null)(FeedbackPanel);