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
    let userAddedSubs = getSubreddits();
    this.setState({ allSubs: userAddedSubs });
  }

  changeSub(subreddit) {
    this.setState({ currentSub: subreddit });
  }

  render() {
    if (this.state.loading) {
      return <span>Loading App</span>
    } else {
      return (
        <div>
          <div className="header">
            <div className="row">
              <div>
                <h1>Snooplay: <small>Watch YouTube links on Reddit in a playlist like format.</small></h1>
              </div>
            </div>
            <div className="row">
              <div className="header-column">
                <Selectors.SwitchSubreddit switch={this.changeSub} items={this.state.allSubs} />
              </div>
              <div className="header-column">
                <Selectors.AddSubredditForm onAfterAdd={this.onSubredditAdded} />
              </div>
            </div>
          </div>
          <div className="subreddit-container">
            <SubredditContainer subreddit={this.state.currentSub} />
          </div>

          <div className="footer">
            <div className="row">
              Made with <a href="https://facebook.github.io/react/">React.</a> Full Source on <a href="https://github.com/anirudhvarma12/snooplay">GitHub</a>
            </div>
          </div>
        </div>
      )
    }
  }
}

render(<App />, document.getElementById('app'));