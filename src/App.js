import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/app.scss';
import { Provider } from 'react-redux';
import configureAppState from './AppState';
// import { BrowserRouter, Route } from 'react-router-dom';
import FeedbackPanel from './components/FeedbackPanel';
import Setup from './components/setup/SetupContainer';
import { isSetupComplete } from './Api';

const store = configureAppState();

class App extends Component {

  render() {

    let component = <span>Main Here</span>
    if (!isSetupComplete()) {
      component = <Setup />
    }

    return (
      <Provider store={store}>
        <div>
          <FeedbackPanel />
          {component}
        </div>
      </Provider>
    );
  }
}

export default App;
