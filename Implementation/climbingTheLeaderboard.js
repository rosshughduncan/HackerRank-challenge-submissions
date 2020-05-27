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

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {
    let aliceRanks = [], scoresSize = scores.length, currentPos = 1;

    // Loop through leaderboard
    for (let i = 0; i < scoresSize; i++) {
        // Compare the current and previous score to test if they need
        // the same index
        console.log(`currentPos: ${currentPos}`);
        if (i > 0) {
          if (scores[i] !== scores[i - 1]) {
            // Only increment the index if the next score is different
            currentPos++;
          }
        }
        // Loop through Alice's scores
        for (let j = 0; j < alice.length; j++) {
            if (alice[j] >= scores[i]) {
                scores.splice(i, 1, alice.splice(j, 1));
                aliceRanks.push(currentPos);
                scoresSize++;
                j--;
                continue;
            }
        }
    }

    return aliceRanks;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const scoresCount = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const aliceCount = parseInt(readLine(), 10);

    const alice = readLine().split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

    let result = climbingLeaderboard(scores, alice);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
