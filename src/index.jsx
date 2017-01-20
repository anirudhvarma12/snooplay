import React from 'react';
import { render } from 'react-dom';
import SubredditContainer from './container';
import { isStorageAvailable, getSubreddits } from './helpers';
import * as Selectors from './selectors';

const DEFAULT_SUB = "Music";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.onSubredditAdded = this.onSubredditAdded.bind(this);
    this.changeSub = this.changeSub.bind(this);
    this.state = {
      currentSub: DEFAULT_SUB,
      allSubs: [DEFAULT_SUB],
      loading: true
    }
  }


  componentDidMount() {
    let userAddedSubs = getSubreddits();
    if (userAddedSubs != null) {
      this.setState({ allSubs: userAddedSubs, currentSub: userAddedSubs[0], loading: false });
    } else {
      this.setState({ loading: false });
    }
  }

  onSubredditAdded() {
    alert("Added");
  }

  changeSub(subreddit) {
    this.setState({ selectedSub: subreddit });
  }

  render() {
    if (this.state.loading) {
      return <span>Loading App</span>
    } else {
      return (
        <div>
          <Selectors.SwitchSubreddit switch={this.changeSub} items={this.state.allSubs} current={this.state.selectedSub} />
          <Selectors.AddSubredditForm onAfterAdd={this.onSubredditAdded} />
          <SubredditContainer subreddit={this.state.currentSub} />
        </div>
      )
    }
  }
}

render(<App />, document.getElementById('app'));