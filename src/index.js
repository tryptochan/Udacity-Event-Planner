require('normalize.css/normalize.css');
require('./style.css');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/Main';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

injectTapEventPlugin();
// Render the main component into the dom
ReactDOM.render(
  <MuiThemeProvider>
  <div>
  <Router history={hashHistory}>
    <Route path="/" component={Main} />
    <Route path="create" component={EventForm} />
    <Route path="list" component={EventList} />
  </Router>
  </div>
  </MuiThemeProvider>
  , document.getElementById('app'));
