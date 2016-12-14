import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {hashHistory} from 'react-router';

class AppFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    switch (props.page) {
      case 'create':
        this.title = 'Create Event';
        break;
      case 'list':
        this.title = 'Event List';
        break;
      case 'main':
        this.title = 'Event Planner'
    }
    this.styles = {
      'menuItem': {WebkitAppearance: 'initial'} //https://github.com/callemall/material-ui/issues/5193
    }
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleLogOut() {
    document.cookie = 'user=;';
    hashHistory.push('/');
  }

  render() {
    let menuCreate;
    const user = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    const isLogin = user !== '';
    if (this.props.page == 'create' || !isLogin) {
      menuCreate = <MenuItem
          style={this.styles.menuItem}
          disabled={true}
          tabIndex={this.state.open-1}
        >Create</MenuItem>
    } else {
      menuCreate = <MenuItem
          style={this.styles.menuItem}
          onTouchTap={() => hashHistory.push('/create')}
          tabIndex={this.state.open-1}
        >Create</MenuItem>
    }

    let menuList;
    if (this.props.page == 'list') {
      menuList = <MenuItem
          style={this.styles.menuItem}
          disabled={true}
          tabIndex={this.state.open-1}
        >List</MenuItem>
    } else {
      menuList = <MenuItem
          style={this.styles.menuItem}
          onTouchTap={() => hashHistory.push('/list')}
          tabIndex={this.state.open-1}
        >List</MenuItem>
    }

    let logOut;
    if (isLogin) {
      logOut = <MenuItem
          style={this.styles.menuItem}
          onTouchTap={this.handleLogOut}
          tabIndex={this.state.open-1}
        >Log out</MenuItem>
    }

    return (
      <div>
      <AppBar title={this.title} onLeftIconButtonTouchTap={this.handleToggle} />
      <Drawer
        open={this.state.open}
        docked={false}
        onRequestChange={(open) => this.setState({open: open})}
      >
        <Menu aria-hidden={!this.state.open} disableAutoFocus={true}>
        {menuCreate}
        {menuList}
        {logOut}
        </Menu>
      </Drawer>
      </div>
    )
  }
}

export default AppFrame;
