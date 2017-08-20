import React, { Component } from 'react';
import { addDefaultSubreddits } from './../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { storeSubreddits } from './../../Api';

class RecommededSubList extends Component {
    getRecommendedSubs = () => {
        return [
            'music', 'movies', 'videos', 'Documentaries', 'soccer'
        ]
    }

    getDefaultSubItem = (sub) => {
        return <li key={sub}>/r/{sub}</li>
    }

    onAccepted = () => {
        storeSubreddits(this.getRecommendedSubs());
        this.props.actions.addDefaults(this.getRecommendedSubs());
    }

    render() {
        return (
            <div>
                <span>
                    Use our recommended defaults
                </span>
                <ul>
                    {this.getRecommendedSubs().map(sub => {
                        return (this.getDefaultSubItem(sub))
                    })}
                </ul>
                <a onClick={this.onAccepted}>Get started with Defaults</a>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            addDefaults: bindActionCreators(addDefaultSubreddits, dispatch)
        }
    }
}

export default connect(null, mapDispatchToProps)(RecommededSubList);