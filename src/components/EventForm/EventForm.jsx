import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {hashHistory} from 'react-router';
import AppFrame from '../AppFrame';


const styles = {
  paper: {
    margin: '20px auto',
    padding: 30,
    width: '100%',
    maxWidth: 450,
    display: 'block'
  },
  text: {
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  },
  pickWrapper: {
    display: 'inline-block'
  },
  picker: {
    width: 100,
    height: 72,
    MarginRight: 20
  },
  submitWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  submit: {
    marginTop: 20
  },
  timeErr: {
    position: 'relative',
    bottom: 2,
    fontSize: 12,
    lineHeight: '12px',
    color: '#f44336'
  }
};

class EventForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      type: '',
      host: document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, '$1'),
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      guests: '',
      location: '',
      message: '',
      timeErr: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleHostChange = this.handleHostChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleGuestsChange = this.handleGuestsChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const user = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    if (user === '') { hashHistory.push('/'); }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.startDate !== this.state.startDate ||
        prevState.startTime !== this.state.startTime ||
        prevState.endDate !== this.state.endDate ||
        prevState.endTime !== this.state.endTime) {
      this.validateDateTime();
    }
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleTypeChange(event) {
    this.setState({type: event.target.value});
  }

  handleHostChange(event) {
    this.setState({host: event.target.value});
  }

  handleStartDateChange(event, date) {
    this.setState({startDate: date});
    if (this.state.endDate === null) { this.setState({endDate: date}) }
  }

  handleStartTimeChange(event, date) {
    this.setState({startTime: date});
  }

  handleEndDateChange(event, date){
    this.setState({endDate: date});
  }

  handleEndTimeChange(event, date) {
    this.setState({endTime: date});
  }

  handleGuestsChange(event) {
    this.setState({guests: event.target.value});
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit() {
    var events = JSON.parse(localStorage.getItem('events'));
    events = events || [];
    var newEvent = {
      'name': this.state.name,
      'type': this.state.type,
      'host': this.state.host,
      'startDate': this.state.startDate,
      'startTime': this.state.startTime,
      'endDate': this.state.endDate,
      'endTime': this.state.endTime,
      'guests': this.state.guests,
      'location': this.state.location,
      'message': this.state.message
    }
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    hashHistory.push('/list');
  }

  validateDateTime() {
    if (!this.state.startTime || !this.state.startDate || !this.state.endTime
      || !this.state.endDate) {
      return
    }
    if (this.state.startDate.getDate() === this.state.endDate.getDate()
      && this.state.startTime - this.state.endTime > 0) {
      this.setState({timeErr: true});
    } else {
      this.setState({timeErr: false});
    }

  }

  render() {
    let ready = false;
    if (this.state.name !== '' && this.state.type !== '' && this.state.host !== ''
          && this.state.startDate !== null && this.state.startTime !== null
          && this.state.endDate !== null & this.state.endTime !== null
          && this.state.guests !== '' && this.state.location !== ''
          && !this.state.timeErr) {
      ready = true;
    }
    let timeErr;
    if (this.state.timeErr) {
      timeErr = <div style={styles.timeErr}>End time should be later than start time.</div>
    }
    return (
      <div>
        <AppFrame page='create' />
        <Paper style={styles.paper} zDepth={2}>
        <form>
          <TextField
            style={styles.text}
            fullWidth={true}
            onChange={this.handleNameChange}
            value={this.state.name}
            floatingLabelText="Event Name"
            aria-required={true}
            required
          />
          <TextField
            style={styles.text}
            fullWidth={true}
            onChange={this.handleTypeChange}
            value={this.state.type}
            floatingLabelText="Event Type"
            list="typelist"
            aria-required={true}
            required
          />
          <datalist id="typelist">
            <option value="Birthday"></option>
            <option value="Wedding"></option>
            <option value="Conference"></option>
            <option value="Sports"></option>
            <option value="Meetup"></option>
          </datalist>
          <TextField
            style={styles.text}
            fullWidth={true}
            onChange={this.handleHostChange}
            floatingLabelText="Host"
            value={this.state.host}
            aria-required={true}
            required
          />
          <DatePicker
            style={styles.pickWrapper}
            textFieldStyle={styles.picker}
            onChange={this.handleStartDateChange}
            value={this.state.startDate}
            hintText="Start Date"
            minDate={new Date()}
            aria-required={true}
            required
          />
          <TimePicker
            style={styles.pickWrapper}
            textFieldStyle={styles.picker}
            format="ampm"
            onChange={this.handleStartTimeChange}
            value={this.state.startTime}
            hintText="Start Time"
            aria-required={true}
            required
          />
          <br />
          <DatePicker
            style={styles.pickWrapper}
            textFieldStyle={styles.picker}
            onChange={this.handleEndDateChange}
            value={this.state.endDate}
            hintText="End Date"
            minDate={this.state.startDate || new Date()}
            aria-required={true}
            required
          />
          <TimePicker
            style={styles.pickWrapper}
            textFieldStyle={styles.picker}
            format="ampm"
            onChange={this.handleEndTimeChange}
            value={this.state.endTime}
            hintText="End Time"
            aria-required={true}
            required
          />
          {timeErr}
          <br />
          <TextField
            style={styles.text}
            fullWidth={true}
            onChange={this.handleGuestsChange}
            value={this.state.guests}
            floatingLabelText="Guests"
            aria-required={true}
            required
          />
          <TextField
            style={styles.text}
            fullWidth={true}
            onChange={this.handleLocationChange}
            value={this.state.location}
            floatingLabelText="Location"
            aria-required={true}
            required
          />
          <TextField
            style={styles.text}
            fullWidth={true}
            onChange={this.handleMessageChange}
            value={this.state.message}
            floatingLabelText="Messages (Optional)"
          />
          <div style={styles.submitWrapper}>
          <RaisedButton
            label="Create"
            style={styles.submit}
            primary={true}
            onTouchTap={this.handleSubmit}
            disabled={!ready}
          />
          </div>
        </form>
        </Paper>
      </div>
    )
  }
}

export default EventForm;
