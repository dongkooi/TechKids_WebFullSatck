'use strict'

function sort(input) {
  for (let firtIndex = 0; firtIndex <= input.length; firtIndex++)
    for (let secondIndex = firtIndex + 1; secondIndex <= input.length - 1; secondIndex++) {
      if (input[firtIndex] > input[secondIndex]) {
        let numb = input[secondIndex];
        input[secondIndex] = input[firtIndex];
        input[firtIndex] = numb;
      }
    }
  return input;
}

module.exports = sort
