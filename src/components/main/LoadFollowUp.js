import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadFollowUp } from './../../actions';


class LoadFollowUp extends Component {

    onClick = () => {
        this.props.actions.loadFollowUp(this.props.selectedSub, this.props.lastId);
    }

    render() {
        return (
            <a onClick={this.onClick}>Load More</a>
        )
    }
}

function mapStateToProps(state) {
    return {
        lastId: state.lastPostId,
        selectedSub: state.currentSub
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadFollowUp: bindActionCreators(loadFollowUp, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadFollowUp);