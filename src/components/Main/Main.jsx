import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import AppFrame from '../AppFrame';
import Registration from '../Registration';
import Login from '../Login';
import {hashHistory} from 'react-router';


const styles = {
  tabs: {
    maxWidth: 450,
    textAlign: 'center',
    margin: '40px auto 0 auto'
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'reg'
    };
    this.handleTab = this.handleTab.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus= this.handleFocus.bind(this);
  }

  componentWillMount() {
    const user = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    if (user !== '') { hashHistory.push('/create') }
  }

  handleTab(value) {
    this.setState({
      active: value
    });
  }

  handleKeyDown(e) {
    if (e.target.getAttribute('role') !== 'tab') return;
    if (e.keyCode === 37 || e.keyCode === 38) {
      this.setState({active: 'reg'});
      document.getElementById('reg-tab').focus();
      e.preventDefault();
    } else if (e.keyCode === 39 || e.keyCode === 40) {
      this.setState({active: 'log'});
      document.getElementById('log-tab').focus();
      e.preventDefault();
    } else if (e.keyCode == 13) {
      this.setState({active: e.target.getAttribute('data-value')});
    }
  }

  handleFocus(tab) {
    if (tab.props.id === 'log-tab') {
      this.logRef.focus();
    } else if (tab.props.id === 'reg-tab') {
      this.regRef.focus();
    }
  }

  render() {
    return (
      <div>
      <AppFrame page="main" />
      <Tabs
        style={styles.tabs}
        value={this.state.active}
        onChange={this.handleTab}
        onKeyDown={this.handleKeyDown}
        role="tablist"
      >
        <Tab
          label="Registration"
          value="reg"
          data-value="reg"
          role="tab"
          id="reg-tab"
          onActive={this.handleFocus}
          aria-expanded={this.state.active === 'reg'}
          aria-selected={this.state.active === 'reg'}
          aria-controls="reg-tabpanel"
        >
          <Registration
            role="tabpanel"
            id="reg-tabpanel"
            aria-labelledby="reg-tab"
            visible={this.state.active === 'reg'}
            ref={(input) => {this.regRef = input;}}
          />
        </Tab>
        <Tab
          label="Login"
          value="log"
          data-value="log"
          role="tab"
          id="log-tab"
          onActive={this.handleFocus}
          aria-expanded={this.state.active === 'log'}
          aria-selected={this.state.active === 'log'}
          aria-controls="log-tabpanel"
        >
          <Login
            role="tabpanel"
            id="log-tabpanel"
            aria-labelledby="log-tab"
            visible={this.state.active === 'log'}
            ref={(input) => {this.logRef = input;}}
          />
        </Tab>
      </Tabs>
      </div>
    )
  }
}

export default Main;
