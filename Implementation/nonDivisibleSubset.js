'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'nonDivisibleSubset' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY s
 */

function nonDivisibleSubset(k, s) {
    // Storage of subsets
    let nonDivisibles = [], iValid, jValid, iPushed;

    // Loop through s to find additions
    for (let i = 0; i < s.length; i++) {
        jValid = false;

        // Check if array already contains i
        nonDivisibles.forEach(num => {
            if (num === s[i]) {
                iValid = true;
                iPushed = true;
            } else {
                iValid = false;
                iPushed = false;
            }
        });

        for (let j = i; j < s.length; j++) {
            jValid = false;

            // Run checks if sum of 2 numbers is not divisble by k
            if (i !== j && s[i] + s[j] % k !== 0) {
                // Check if the values are already in the array
                if (nonDivisibles.length > 0) {
                    jValid = true;
                    nonDivisibles.forEach(num => {
                        if (!iValid) {
                            if (s[i] !== num && s[i] + num % k !== 0) {
                                iValid = true;
                            }
                            //else { iValid = false; }
                        }
                        if (num !== s[i]) {
                            if (s[j] === num || s[j] + num % k === 0) {
                                jValid = false;
                            }
                            //else { jValid = true; }
                        }
                    });
                } else {
                    iValid = true;
                    jValid = true;
                }
            }

            if (iValid && !iPushed) {
                nonDivisibles.push(s[i]);
                iPushed = true;
            }
            if (jValid) { nonDivisibles.push(s[j]); }
        }
    }

    return nonDivisibles.length;
            /*
            // Check if the numbers are already contained in nonDivisibles
            if (i !== j) {
                if (nonDivisibles.lenth !== 0) {
                    nonDivisibles.forEach(num => {
                        if (num === s[i] || num + s[i] % k === 0) {
                            iValid = false;
                        }
                        if (num === s[j] || num + s[j] % k === 0) {
                            jValid = false;
                        }
                    });
                }

                if (!iValid) { break; }

                if (jValid && s[i] + s[j] % k === 0) {
                    iValid = false;
                    jValid = false;
                }
            } else {
                iValid = false;
                jValid = false;
            }

            if (jValid) {
                nonDivisibles.push(s[j]);
            }
            if (iValid) {
                nonDivisibles.push(s[i]);
                break;
            }
        }
    }*/
            /*
            if (j !== i && (s[i] + s[j]) % k !== 0) {
                iValid = true;
                jValid = true;
                if (nonDivisibles.length !== 0) {
                    nonDivisibles.forEach(num => {
                        /** If any number already in the array is already
                         * divisble by 0 with the current 2 numbers,
                         * don't add the two new values to the array

                        if (num === s[i] || num + s[i] % k === 0) {
                            iValid = false;
                        }
                        if (num === s[j] || num + s[j] % k === 0) {
                            jValid = false;
                        }
                    });
                }
                if (iValid) { nonDivisibles.push(s[i]); }
                if (jValid) { nonDivisibles.push(s[j]); }
                if (iValid || jValid) { break; }
            }
        }
    } */
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const result = nonDivisibleSubset(k, s);

    ws.write(result + '\n');

    ws.end();
}
