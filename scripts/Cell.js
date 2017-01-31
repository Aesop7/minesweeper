import React, { Component } from 'react';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   elapsed: 0
    // };
  }

  render() {
    const css = {
      // display: 'inline-block',
      float: 'left',
      border: '1px inset #666',
      margin: '2px',
      width: '25px',
      height: '25px'
    };
    css.clear = this.props.data.column === 0 ? 'both' : '';
    return (
      <div
        key={this.props.key}
        style={css}
        onClick={this.props.handler}
      >
        {this.props.children}
      </div>
    );
  }
}
