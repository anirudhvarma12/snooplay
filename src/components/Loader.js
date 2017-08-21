import React, { Component } from 'react';
import { connect } from 'react-redux';


class Loader extends Component {
    render() {
        let component = <span>{this.props.isLoading}</span>
        if (this.props.isLoading) {
            component = <div className="loader"></div>
        }
        return (
            component
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.loaderVisible
    };
}

export default connect(mapStateToProps, null)(Loader);