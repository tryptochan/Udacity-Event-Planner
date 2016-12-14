import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {cyan400, grey600} from 'material-ui/styles/colors';
import AppFrame from '../AppFrame';

var styles = {
  eventCard: {
    maxWidth: 450,
    margin: '20px auto 40px auto'
  },
  title: {
    color: cyan400,
    fontSize: '1.4em',
    marginBottom: 5
  },
  left: {
    display: 'inline-block',
    maxWidth: '40%'
  },
  right: {
    display: 'inline-block',
    maxWidth: '60%',
    float: 'right'
  },
  label: {
    color: grey600
  },
  time: {
    marginLeft: 10,
    float: 'right'
  },
  noevent: {
    marginLeft: 22
  }
}

function EventList () {
  var events = JSON.parse(localStorage.getItem('events'));
  var eventList;
  if (events) {
    eventList = events.map((event) =>
      <Card
        style={styles.eventCard}
        initiallyExpanded={true}
        key={event.name+event.startDate}
      >
      <CardHeader
        title={event.name}
        titleStyle={styles.title}
        subtitle={event.type}
      />
      <CardText expandable={true}>
        <div style={styles.left}>
          <p><span style={styles.label}>Hosted by</span> {event.host}</p>
          <p><span style={styles.label}>@</span>{event.location}</p>
        </div>
        <div style={styles.right}>
          <p><span style={styles.label}>From: </span>
            <span style={styles.time}>{new Date(event.startDate).toDateString()} {new Date(event.startTime).toTimeString().substring(0,5)}</span>
          </p>
          <p><span style={styles.label}>To: </span>
            <span style={styles.time}>{new Date(event.endDate).toDateString()} {new Date(event.endTime).toTimeString().substring(0,5)}</span>
          </p>
        </div>
        <p><span style={styles.label}>Guests:</span> {event.guests}</p>
        <p>{event.message}</p>
      </CardText>
      </Card>
    );
  } else {
    eventList = <p style={styles.noevent}>No events are created.</p>
  }
  return (
    <div>
    <AppFrame page='list' />
    <div>{eventList}</div>
    </div>
  );
}

export default EventList;
