import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {hashHistory} from 'react-router';


const styles = {
  paper: {
    margin: 'auto',
    padding: 30,
    width: '100%',
    maxWidth: 450,
    textAlign: 'center',
    display: 'block'
  },
  text: {
    display: 'block',
    margin: 'auto'
  },
  submitWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  submit: {
    marginTop: 20
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailErr: '',
      passwordErr: ''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
      emailErr: ''
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
      passwordErr: ''
    });
  }

  handleSubmit() {
    let users = JSON.parse(localStorage.getItem('users'));
    users = users || [];
    let user = users.find(item => item.email === this.state.email);
    if (user === undefined) {
      this.setState({emailErr: 'User does not exist.'});
      return;
    }
    if (user.password !== this.state.password) {
      this.setState({passwordErr: 'Password does not match.'});
      return;
    }
    document.cookie = `user=${user.name}`;
    hashHistory.push('/create');
  }

  render() {
    let {visible, ...others} = this.props;
    let ready = false;
    if (this.state.email !== '' && this.state.password !== '') {
      ready = true;
    }
    return (
      <div {...others} aria-hidden={!visible}>
        <Paper style={styles.paper} zDepth={2}>
        <form>
          <TextField
            style={styles.text}
            fullWidth={true}
            onChange={this.handleEmailChange}
            value={this.state.email}
            floatingLabelText="E-mail"
            errorText={this.state.emailErr}
            type="email"
            autoComplete="email"
            aria-required={true}
            tabIndex={visible-1}
            required
          />
          <TextField
            style={styles.text}
            fullWidth={true}
            onChange={this.handlePasswordChange}
            value={this.state.password}
            floatingLabelText="Password"
            errorText={this.state.passwordErr}
            type="password"
            aria-required={true}
            tabIndex={visible-1}
            required
          />
          <div style={styles.submitWrapper}>
          <RaisedButton
            label="Submit"
            style={styles.submit}
            primary={true}
            tabIndex={visible-1}
            onClick={this.handleSubmit}
            disabled={!ready}
          />
          </div>
        </form>
        </Paper>
      </div>
    )
  }
}

export default Login;
