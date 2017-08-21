import React, { Component } from 'react';
import { connect } from 'react-redux';

class FeedbackPanel extends Component {

    static defaultProps : {
        message: ''
    }

    render() {
        return (
            <span></span>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.message) {
            alert(nextProps.message);
        }
    }
}

function mapStateToProps(state) {
    return {
        message: state.notification
    };
}

export default connect(mapStateToProps, null)(FeedbackPanel);