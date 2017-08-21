import React, { Component } from 'react';
import './styles/app.scss';
import { Provider } from 'react-redux';
import configureAppState from './AppState';
import { BrowserRouter, Route } from 'react-router-dom';
import FeedbackPanel from './components/FeedbackPanel';
import Setup from './components/setup/SetupContainer';
import Loader from './components/Loader';
import AddSubredditForm from './components/AddSubredditForm';
import AppSection from './components/main/index';
import Home from './components/Home';
import Header from './components/main/Header';

const store = configureAppState();

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div>
            <Loader />
            <FeedbackPanel />
            <Header />
            <Route path="/r/:subreddit?" component={AppSection} />
            <Route exact path="/" component={Home} />
            <Route exact path="/setup" component={Setup} />
            <Route exact path="/add" component={AddSubredditForm} />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
