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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the pageCount function below.
 */
function pageCount(n, p) {
    // turn from page 1 to 2 must always be one
    // pages 2 & 3 and above are one turn except last page
    let turns;
    // check if chosen page is first or last, or on the same past as the last
    if (p === 1 || p === n || (n % 2 !== 0 && p === (n - 1))) {
      turns = 0;
    // check if the back page is even-numbered
    } else if (n % 2 === 0 && p === (n - 1)) {
      turns = 1;
    } else {
      // check if we need to turn from back of book
      let distFromEnd = n - p;
      if (distFromEnd < p) {
        turns = Math.floor(distFromEnd / 2);
      } else {
        turns = Math.floor(p / 2);
      }
    }

    return turns;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const p = parseInt(readLine(), 10);

    let result = pageCount(n, p);

    ws.write(result + "\n");

    ws.end();
}
