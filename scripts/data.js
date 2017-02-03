import _ from 'lodash';

export const findBomb = (bombArray, x, y) => {
  return _.find(bombArray, { row: y, col: x, bomb: 'boom' }) || null;
};

/**
 * generate bomb data based on the size (size = x-axis = y-axis)
 * @param size (integer)
 * @param bombs (integer)
 * @returns {Array}
 */
export const generate = (size, bombs) => {
  const data = [];
  // iterate through the x axis for each row that we iterate on the y axis
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      data.push({
        row: y,
        col: x
      });
    }
  }

  // for all bombs we're adding to the set, add them randomly
  while (bombs > 0) {
    const randomInt = Math.floor(Math.random() * (size ** 2));
    const cell = data[randomInt];
    if (!('bomb' in cell)) {
      cell.bomb = 'boom';
      bombs--;
    }
  }

  // traverse all of the cells to get adjacent bomb counts
  // @NOTE this could be cleaned up if performance becomes an issue
  _.map(data, (o, i) => {
    const nearbyBombs = [];
    _.map([o.row - 1, o.row, o.row + 1], (y) => {
      _.map([o.col - 1, o.col, o.col + 1], (x) => {
        const bombLocation = findBomb(data, x, y);
        if (bombLocation) {
          nearbyBombs.push(bombLocation);
        }
      });
    });
    data[i].count = nearbyBombs.length;
  });

  return data;
};

export const scanCell = (key, data) => {
  const cell = data[key];

  if (cell.bomb) {
    alert('You blew up!!');
    return key;
  }

  if (cell.count === 0) {
    const visibleCells = [key];
    const y = cell.row;
    const x = cell.col;
    // iterate through from this cell to find any others that might be empty
    _.map([y - 1, y, y + 1], (j) => {
      _.map([x - 1, x, x + 1], (i) => {
        let neighbor = _.findIndex(data, { row: j, col: i });
        let hasZero = _.findIndex(data, { row: j, col: i, count: 0 });
        if (neighbor) {
          visibleCells.push(neighbor);
        }
        // @TODO oh god... there's got to be a simpler way... (also, this doesn't take care of negative traversal yet)
        /*
        if (hasZero) {
          while (_.findIndex(data, {row: j, col: i, count: 0})) {
            console.log('hasZero');
            i++;
            let neighbor = _.findIndex(data, {row: j, col: i});
            if (neighbor) {
              visibleCells.push(neighbor);
            } else {
              j++;
              let neighbor = _.findIndex(data, {row: j, col: i});
              if (neighbor) {
                visibleCells.push(neighbor);
              }
            }
          }
        }
        */
      });
    });
    return visibleCells;
  }

  return key;
};
