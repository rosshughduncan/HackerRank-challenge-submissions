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

// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
    // array for each single sock found
    let found = [], counter = 0, flag;
    // loop through each element of the array
    ar.forEach((item) => {
      flag = false;
      // if found array is empty, this must be the first element so it's added as found
      if (found.length === 0) {
        found.push(item);
      } else {
        for (let i = 0; i < found.length; i++) {
          if (found[i] === item) {
            counter++;
            found.splice(i, 1);
            flag = true;
            break;
          }
        }
        if (flag != true) {
          found.push(item);
        }
      }
    });

    return counter;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

    let result = sockMerchant(n, ar);

    ws.write(result + "\n");

    ws.end();
}
