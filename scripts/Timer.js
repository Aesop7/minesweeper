import React, { Component } from 'react';
import moment from 'moment';

export default class Timer extends Component {
  constructor() {
    super();
    this.state = {
      elapsed: 0
    };
  }

  componentDidMount() {
    // set the interval for the timer
    this.timer = setInterval(this.poll, 50);
  }

  componentWillUnmount() {
    // clear the interval whenever the component unmounts
    clearInterval(this.timer);
  }

  poll = () => {
    this.setState({
      elapsed: moment().diff(this.props.start)
    });
  };

  render() {
    return (
      <div>{moment.utc(this.state.elapsed).format("HH:mm:ss")}</div>
    );
  }
}
