'use strict';

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

// Complete the extraLongFactorials function below.
function extraLongFactorials(n) {
    let product = BigInt(1);
    for (let i = BigInt(n); i > 0; i--) {
        product *= i;
    }

    // Remove n from end
    let strConv = product.toString();
    console.log(strConv);
}

function main() {
    const n = parseInt(readLine(), 10);

    extraLongFactorials(n);
}
