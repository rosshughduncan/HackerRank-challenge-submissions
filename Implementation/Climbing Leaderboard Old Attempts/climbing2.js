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
    let aliceRanks = [], maxIndex = scores.length - 1, currentPos = 1,
        lastIndexFound = false;

    // Sort Alice's scores into ascending order
    const aliceSorted = alice.sort((a, b) => { return a - b });

    // Determine Alice's highest score
    const highestScore = aliceSorted[aliceSorted.length - 1];

    // Loop through Alice scores
    aliceSorted.forEach(currentScore => {
        /**
         * If we have not found the last index
         * we are running the search for the first time
         * loop forward in the scores array
         */
        if (!lastIndexFound) {
            for (let i = 0; i <= maxIndex; i++) {
                // Determine the current leaderboard position
                if (i > 0) {
                    if (scores[i] !== scores[i - 1]) {
                        currentPos++;
                    }
                }

                // Only run other checks if it's within the bounds of Alice's scores
                if (!(highestScore < scores[i])) {
                    // Find where Alice's score fits in the leaderboard
                    if (currentScore >= scores[i]) {
                        aliceRanks.push(currentPos);
                        maxIndex = i;
                        lastIndexFound = true;
                        break;
                    } else {
                        if (i !== maxIndex) {
                            if (currentScore >= scores[i + 1]) {
                                aliceRanks.push(currentPos + 1);
                                maxIndex = i;
                                lastIndexFound = true;
                                break;
                            }
                        } else {
                            aliceRanks.push(currentPos + 1);
                            lastIndexFound = true;
                            break;
                        }
                    }
                }
            }
        } else {
            /**
             * If we have found the last index
             * loop backwards to find the other positions
             */
             //for (let i = maxIndex; i >= 0; i--) {
             for (let i = maxIndex; i >= 0; i--) {
                 if (i < maxIndex) {
                     if (scores[i] !== scores[i + 1]) {
                         currentPos--;
                     }
                 }

                 if (currentScore <= scores[i]) {
                     aliceRanks.push(currentPos);
                     maxIndex = i;
                     break;
                 } else {
                     //if (i !== 0) {
                     if (i !== 0) {
                         if (currentScore < scores[i - 1]) {
                             aliceRanks.push(currentPos);
                             maxIndex = i;
                             break;
                         }
                     } else {
                         // If we have reached index 0, the position cannot be lower than 1
                         aliceRanks.push(currentPos);
                         break;
                     }
                 }
             }
        }
        console.log(`currentScore: ${currentScore} aliceRanks: ${aliceRanks}`);
    });
    console.log(``)

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
