'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the countingValleys function below.
function countingValleys(n, s) {
    // Initialise height at sea level
    let height = 0, valleys = 0, inValley = false;
    // Loop through path
    [...s].forEach((item) => {
      // Subtract height for downhill, increase height for uphill
      item === 'D' ? height -= 1 : height += 1;
      // Check if we're in a valley
      if (inValley) {
        // Check if we've come out of a valley
        if (height > -1) {
          valleys++;
          inValley = false;
        }
      } else {
        // If we've just entered a valley, mark the flag
        if (height < 0) {
          inValley = true;
        }
      }
    });
    return valleys;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    let result = countingValleys(n, s);

    ws.write(result + "\n");

    ws.end();
}
