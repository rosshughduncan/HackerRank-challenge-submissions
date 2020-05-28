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
    let aliceRanks = [], currentPos, left = 0, right = scores.length - 1,
        middle, minIndex, maxIndex;
    //let lastIndexFound = false;

    // Sort Alice's scores into ascending order
    let aliceSorted = alice.sort((a, b) => { return a - b });

    // Determine Alice's highest score
    const highestScore = aliceSorted[aliceSorted.length - 1];
    const lowestScore = aliceSorted[0];

    // Find position of highest score
    while (left <= right && middle !== 0) {
        middle = Math.floor((left + right) / 2);
        if (scores[middle] > highestScore) {
            left = middle + 1;
        } else if (scores[middle] < highestScore) {
            right = middle - 1;
        } else {
            break;
        }
    }

    // Certify the highest scores start position
    for (let i = middle; i > 0; i--) {
        if (scores[middle - 1] < highestScore) {
            break;
        } else {
            middle--;
        }
    }
    minIndex = middle;

    // Find position of lowest score
    left = minIndex;
    right = scores.length - 1;
    while (left <= right && middle !== scores.length - 1) {
        middle = Math.floor((left + right) / 2);
        if (scores[middle] > lowestScore) {
            left = middle + 1;
        } else if (scores[middle] < lowestScore) {
            right = middle - 1;
        } else {
            break;
        }
    }

    // Certify the lowest score's start position
    for (let i = middle; i < scores.length - 1; i++) {
        if (scores[middle + 1] < lowestScore) {
            break;
        } else {
            middle++;
        }
    }
    maxIndex = middle;

    /*Get lowest possible start position and store highest score position
    const scoresStart = scores.slice(0, middle - 1);
    for (let i = 0; i < middle; i++) {
        if (scoresStart[i] === lastNum) {
            currentPos++;
            lastNum = scoresStart[i];
        }
    }*/

    // Find the current position at maxIndex
    let scoresSet = new Set();
    //for (let i = 0; i < minIndex; i++) {
    for (let i = 0; i <= maxIndex; i++) {
        scoresSet.add(scores[i]);
    }
    currentPos = scoresSet.size;

    // Loop through the rest of Alice's scores to find other positions
    aliceSorted.forEach(currentScore => {
        for (let i = maxIndex; i >= minIndex; i--) {
            // Decrement currentPos if necessary
            if (i < middle) {
                if (scores[i] !== scores[i + 1]) {
                    currentPos--;
                }
            }

            // Determine position of currentScore
            if (currentScore < scores[i]) {
                currentPos++;
                aliceRanks.push(currentPos);
                currentPos--;
                maxIndex = i - 1;
                break;
            } else if (currentScore === scores[i]) {
                aliceRanks.push(currentPos);
                maxIndex = i - 1;
                break;
            } else {
                if (i !== 0) {
                    if (currentScore < scores[i - 1]) {
                        aliceRanks.push(currentPos);
                        maxIndex = i - 1;
                        break;
                    } else if (currentScore === scores[i - 1]) {
                        currentPos--;
                        aliceRanks.push(currentPos);
                        currentPos++;
                        maxIndex = i - 1;
                        break;
                    }
                } else {
                    // If we have reached index 0, the position cannot be lower than 1
                    aliceRanks.push(currentPos);
                    break;
                }
            }
        }

        /*for (let i = minIndex; i <= maxIndex; i++) {
            // Determine the current leaderboard position
            if (i > minIndex) {
                if (scores[i] !== scores[i - 1]) {
                    currentPos++;
                }
            }

            // Only run other checks if it's within the bounds of Alice's scores
            // if (!(highestScore < scores[i])) {

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
        }*/

        /**
         * If we have not found the last index
         * we are running the search for the first time
         * loop forward in the scores array

        if (!lastIndexFound) {
            for (let i = minIndex; i <= maxIndex; i++) {
                // Determine the current leaderboard position
                if (i > minIndex) {
                    if (scores[i] !== scores[i - 1]) {
                        currentPos++;
                    }
                }

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
        } else {
            /**
             * If we have found the last index
             * loop backwards to find the other positions


             for (let i = maxIndex; i >= minIndex; i--) {
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
        }*/
    });

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
