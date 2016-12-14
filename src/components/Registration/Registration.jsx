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

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      organization: '',
      title: '',
      emailErr: '',
      passwordErr: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleNameChange(event) {
    this.setState({
      name: event.target.value,
      nameErr: ''
    });
  }

  handleEmailChange(event) {
    const emailPtn = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let email = event.target.value;
    if (email !== '' && !emailPtn.test(email)) {
      this.setState({emailErr: 'Email is not valid.'});
    } else {
      this.setState({emailErr: ''});
    }
    this.setState({email: email});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
    const length = event.target.value.length >= 8;
    const letter = /[a-zA-Z]/.test(event.target.value);
    const number = /\d/.test(event.target.value);
    const symbol = /[`~!@#$%^&*()\-_=\+\[\]{}|\\;:'",<.>\/?]/.test(event.target.value);
    if (length && letter && number && symbol) {
      this.setState({passwordErr: ''});
      return;
    }
    let msg = 'Password '
    if (!length) {
      msg += 'is too short';
    }
    if (!letter || !number || !symbol) {
      if (!length) { msg += ' and' }
      let first = true;
      if (!letter) {
        msg += ' needs a letter';
        first = false;
      }
      if (!number) {
        if (first) {
          msg += ' needs a number';
          first = false;
        } else {
          msg += ' and a number';
        }
      }
      if (!symbol) {
        if (first) {
          msg += ' needs a symbol';
        } else {
          msg += ' and a symbol';
        }
      }
    }
    msg += '.';
    this.setState({passwordErr: msg})
  }

  handleOrganizationChange(event) {
    this.setState({organization: event.target.value});
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleSubmit() {
    let users = JSON.parse(localStorage.getItem('users'));
    users = users || [];
    let newUser = {
      'name': this.state.name,
      'email': this.state.email,
      'password': this.state.password,
      'organization': this.state.organization,
      'title': this.state.title
    }
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    document.cookie = `user=${this.state.name}`;
    hashHistory.push('/create');
  }

  render() {
    let {visible, ...others} = this.props
    let ready = false;
    if (this.state.name !== '' && this.state.email !== '' && this.state.password !== ''
          && this.state.emailErr === '' && this.state.passwordErr === '') {
      ready = true;
    }
    return (
      <div {...others} aria-hidden={!visible}>
        <Paper style={styles.paper} zDepth={2}>
        <form>
          <TextField
            style={styles.text}
            fullWidth={true}
            onChange={this.handleNameChange}
            floatingLabelText="Name"
            hintText="John Smith"
            autoComplete="name"
            autoFocus
            aria-required={true}
            tabIndex={visible-1}
            required
          />
          <TextField
            style={styles.text}
            fullWidth={true}
            onChange={this.handleEmailChange}
            floatingLabelText="E-mail"
            hintText="email@example.com"
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
            floatingLabelText="Password"
            hintText="At least 8 characters with letter, number and symbol."
            errorText={this.state.passwordErr}
            type="password"
            aria-required={true}
            tabIndex={visible-1}
            required
          />
          <TextField
            style={styles.text}
            fullWidth={true}
            onChange={this.handleOrganizationChange}
            floatingLabelText="Organization (Optional)"
            hintText="Udacity"
            autoComplete="organization"
            tabIndex={visible-1}
          />
          <TextField
            style={styles.text}
            fullWidth={true}
            onChange={this.handleTitleChange}
            floatingLabelText="Title (Optional)"
            hintText="Student"
            autoComplete="organization-title"
            tabIndex={visible-1}
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

export default Registration;
