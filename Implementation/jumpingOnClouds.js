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

// Complete the jumpingOnClouds function below.
function jumpingOnClouds(c, k) {
    /** Numbered sequence of clouds
     * Start from c[0]
     * Use 1 unit of energy to make a jump of size k to cloud c[(i+k) % n]
     * If she lands on c[i] = 1, e decreases by 2 units
     * Game ends when she lands on cloud 0
     * Determine value of e after the game ends
     */

     // Energy level
     let e = 100, reachedEnd = false, currentIndex = 0, n = c.length;

    // Keep jumping until we've reached the end
    while (!reachedEnd) {
        currentIndex = (currentIndex + k) % n;
        e -= 1;
        // Detract 2 more energy points if we land on a thundercloud
        if (c[currentIndex] === 1) {
            e -= 2;
        }
        if (currentIndex === 0) {
            reachedEnd = true;
        }
    }

    return e;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = jumpingOnClouds(c, k);

    ws.write(result + "\n");

    ws.end();
}
