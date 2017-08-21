import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class SubmitLink extends Component {

    handleClick = () => {
        if (this.props.onClick()) {
            setTimeout(() => {
                this.props.history.push(this.props.navigateTo());
            }, 2000);
        }
    }

    render() {
        return (
            <a onClick={this.handleClick} className="button">{this.props.label}</a>
        )
    }
}

const NavigableSubmitLink = withRouter(SubmitLink);

export default NavigableSubmitLink;