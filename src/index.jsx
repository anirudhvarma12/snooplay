import React from 'react';
import { render } from 'react-dom';
import SubredditContainer from './container';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <SubredditContainer subreddit="NMmusicIndia" />
      </div>
    )
  }
}

render(<App />, document.getElementById('app'));