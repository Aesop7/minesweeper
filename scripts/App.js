import React, { Component } from 'react';
import _ from 'lodash';
import { generate } from './data';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gameLevel: 9,
      bombs: 10
    };
  }

  componentWillMount() {
    // get the data
    this.setState({
      board: generate(this.state.gameLevel, this.state.bombs)
    });
  }

  componentDidMount() {
  }

  doClick(e) {
    e.preventDefault();
    this.setState({
      board: generate(this.state.gameLevel, this.state.bombs)
    });
  }

  render() {
    return (
      // Add your component markup and other subcomponent references here.
      <section>
        <h1>Minesweeper!</h1>
        <button onClick={(e) => this.doClick(e)}>Start/Reset</button>
        <div>
          {_.map(this.state.board, (i, key) => {
            const css = {
              // display: 'inline-block',
              float: 'left',
              border: '1px inset #666',
              margin: '2px',
              width: '25px',
              height: '25px'
            };
            css.clear = i.column === 0 ? 'both' : '';
            return (<div key={key} style={css}>{i.column} {i.bomb}</div>);
          })}
        </div>
      </section>
    );
  }
}
