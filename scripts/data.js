import _ from 'lodash';

/**
 * generate bomb data based on the size (size = x-axis = y-axis)
 * @param size (integer)
 * @param bombs (integer)
 * @returns {Array}
 */
export const generate = (size = 3, bombs = 1) => {
  const bombArray = [];
  // iterate through the x axis for each row that we iterate on the y axis
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      bombArray.push({
        row: y,
        column: x
      });
    }
  }

  // for all bombs we're adding to the set, add them randomly
  while (bombs > 0) {
    const randomInt = Math.floor(Math.random() * (size ** 2));
    const box = bombArray[randomInt];
    if (!('bomb' in box)) {
      box.bomb = 'boom';
      bombs--;
    }
  }
  return bombArray;
};
