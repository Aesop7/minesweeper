import React, { Component } from 'react';
import _ from 'lodash';
import { generate, scanCell } from './data';
import moment from 'moment';
import Timer from './Timer';
import Cell from './Cell'

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

  doClick = (e) => {
    e.preventDefault();
    this.setState({
      board: generate(this.state.gameLevel, this.state.bombs)
    });
  };

  cellClick = (x, y) => {
    console.log(x, y);
    scanCell(this.state.board, x, y);
  };

  render() {
    return (
      // Add your component markup and other subcomponent references here.
      <section>
        <h1>Minesweeper!</h1>
        <button onClick={this.doClick}>Start/Reset</button>
        <Timer start={moment()} />
        <div>
          {_.map(this.state.board, (i, key) => {
            return (
              <Cell key={key} data={i} handler={this.cellClick.bind(null, i.column, i.row)}>
                {i.bomb}
              </Cell>
            );
          })}
        </div>
      </section>
    );
  }
}
