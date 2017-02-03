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
      bombs: 10,
      visibleCells: [0, 2, 8, 12]
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
      board: generate(this.state.gameLevel, this.state.bombs),
      visibleCells: []
    });
  };

  cellClick = (cell, key) => {
    console.log(cell.row, cell.col); // not really used...
    const results = scanCell(key, this.state.board);
    console.log(results);
    this.setState({
      visibleCells: this.state.visibleCells.concat(results)
    });
    console.log(this.state.visibleCells);
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
              <Cell
                key={key}
                data={i}
                visible={_.includes(this.state.visibleCells, key)}
                handler={this.cellClick.bind(null, i, key)}
              />
            );
          })}
        </div>
      </section>
    );
  }
}
