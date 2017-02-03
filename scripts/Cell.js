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

    // ideally this would be done in external CSS using "n-th child"
    css.clear = this.props.data.col === 0 ? 'both' : '';

    const content = this.props.data.bomb ? '*' : this.props.data.count === 0 ? '' : this.props.data.count;

    return (
      <div
        key={this.props.key}
        style={css}
        onClick={this.props.handler}
      >
        {this.props.visible ? content : ''}
        {/*{this.props.children}*/}
      </div>
    );
  }
}
