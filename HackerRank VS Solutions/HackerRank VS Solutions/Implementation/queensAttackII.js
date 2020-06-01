'use strict';

//const fs = require('fs');

//process.stdin.resume();
//process.stdin.setEncoding('utf-8');

//let inputString = '';
//let currentLine = 0;

//process.stdin.on('data', inputStdin => {
//    inputString += inputStdin;
//});

//process.stdin.on('end', _ => {
//    inputString = inputString.replace(/\s*$/, '')
//        .split('\n')
//        .map(str => str.replace(/\s*$/, ''));

//    main();
//});

function readLine() {
    return inputString[currentLine++];
}

// Complete the queensAttack function below.
function queensAttack(n, k, r_q, c_q, obstacles) {
    /**
     * Chess board, one queen, num obstacles
     * n: num rows & columns
     * k: num obstacles
     * r_q & c_q: row & column of queen's position
     * obstacles: 2D array of ints
     */

    // Positions which are successful
    let positions = 0;
    // Current distance of each obstacle from queen
    let obstRows, obstCols, absRows, absCols;
    // Store flags for each direction (clockwise, left to left-down)
    const directions = ["l", "lu", "u", "ru", "r", "rd", "d", "ld"];
    // Store nearest obstacles to queen in each direction
    let nearestObsts = ((obj = {}) => {
        directions.forEach(dir => {
            // Set empty arrays for each direction by default
            obj[dir] = -1;
        });
        return obj;
    })();

    function rmDir(dir) {
        const index = directions.indexOf(dir);
        directions.splice(index, 1);
    }

    // Find nearest obsts to queen
    for (let i = 0; i < k; i++) {
        [obstRows, obstCols] = [obstacles[i][0] - r_q, obstacles[i][1] - c_q];
        // Find which direction this is going
        absRows = Math.abs(obstRows);
        absCols = Math.abs(obstCols);
        /**************************
         * If it's going diagonally
         *************************/
        if (absRows === absCols) {
            if (obstRows > 0) {
                // Left-up
                if (obstCols < 0) {
                    if (nearestObsts["lu"] === -1) {
                        nearestObsts["lu"] = [absRows, absCols];
                    } else {
                        if (obstRows < nearestObsts["lu"][0]) {
                            nearestObsts["lu"] = [absRows, absCols];
                        }
                    }
                    // Right-up
                } else {
                    if (nearestObsts["ru"] === -1) {
                        nearestObsts["ru"] = [absRows, absCols];
                    } else {
                        if (obstRows < nearestObsts["ru"][0]) {
                            nearestObsts["ru"] = [absRows, absCols];
                        }
                    }
                }
            } else {
                // Right-down
                if (obstCols > 0) {
                    if (nearestObsts["rd"] === -1) {
                        nearestObsts["rd"] = [absRows, absCols];
                    } else {
                        if (obstCols < nearestObsts["rd"][1]) {
                            nearestObsts["rd"] = [absRows, absCols];
                        }
                    }
                    // Left-down
                } else {
                    if (nearestObsts["ld"] === -1) {
                        nearestObsts["ld"] = [absRows, absCols];
                    } else {
                        if (obstRows > nearestObsts["ld"][0]) {
                            nearestObsts["ld"] = [absRows, absCols];
                        }
                    }
                }
            }
        /******************************
        * If it's going non-diagonally
        *****************************/
        } else {
            if (obstRows === 0) {
                // Left
                if (obstCols < 0) {
                    // Set current obstacle as the nearest 
                    if (nearestObsts["l"] === -1) {
                        nearestObsts["l"] = [absRows, absCols];
                    } else {
                        if (obstRows > nearestObsts["l"][0]) {
                            nearestObsts["l"] = [absRows, absCols];
                        }
                    }
                }
                // Right
                else {
                    if (nearestObsts["r"] === -1) {
                        nearestObsts["r"] = [absRows, absCols];
                    } else {
                        if (obstCols < nearestObsts["r"][1]) {
                            nearestObsts["r"] = [absRows, absCols];
                        }
                    }
                }
            } else if (obstCols === 0) {
                // Up
                if (obstRows > 0) {
                    if (nearestObsts["u"] === -1) {
                        nearestObsts["u"] = [absRows, absCols];
                    } else {
                        if (obstRows < nearestObsts["u"][0]) {
                            nearestObsts["u"] = [absRows, absCols];
                        }
                    }
                // Down
                } else if (obstRows < 0) {
                    if (nearestObsts["d"] === -1) {
                        nearestObsts["d"] = [absRows, absCols];
                    } else {
                        if (obstRows > nearestObsts["d"][0]) {
                            nearestObsts["d"] = [absRows, absCols];
                        }

                    }
                }
            }
        }
    }

    // Calculate the steps to each of the obstacles
    Object.keys(nearestObsts).forEach(dir => {
        // Only add steps if the obstacle is assigned
        if (nearestObsts[dir] !== -1) {
            //positions += Math.max(nearestObsts[dir][2], nearestObsts[dir][3]) - 1;
            positions += Math.max(nearestObsts[dir][0], nearestObsts[dir][1]) - 1;
            // Don't traverse this direction again
            rmDir(dir);
        }
    })

    // Calculate other paths not obstructed by obstacles
    directions.forEach(dir => {
        switch(dir) {
            case "l":
                positions += c_q - 1;
                break;
            case "lu":
                positions += Math.min(n - r_q, c_q - 1);
                break;
            case "u":
                positions += n - r_q;
                break;
            case "ru":
                positions += Math.min(n - r_q, n - c_q);
                break;
            case "r":
                positions += n - c_q;
                break;
            case "rd":
                positions += Math.min(n - c_q, r_q - 1);
                break;
            case "d":
                positions += r_q - 1;
                break;
            case "ld":
                positions += Math.min(r_q, c_q) - 1;
                break;
        }
    });

    return positions;
}

function main() {
    //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    //const nk = readLine().split(' ');

    //const n = parseInt(nk[0], 10);

    //const k = parseInt(nk[1], 10);

    //const r_qC_q = readLine().split(' ');

    //const r_q = parseInt(r_qC_q[0], 10);

    //const c_q = parseInt(r_qC_q[1], 10);

    //let obstacles = Array(k);

    //for (let i = 0; i < k; i++) {
    //    obstacles[i] = readLine().split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    //}

    //let result = queensAttack(n, k, r_q, c_q, obstacles);

    //let obsString = "54 87 64 97 42 75 32 65 42 87 32 97 54 75 64 65 48 87 48 75 54 81 42 81 45 17 14 24 35 15 95 64 63 87 25 72 71 38 96 97 16 30 60 34 31 67 26 82 20 93 81 38 51 94 75 41 79 84 79 65 76 80 52 87 81 54 89 52 20 31 10 41 32 73 83 98 87 61 82 52 80 64 82 46 49 21 73 86 37 70 43 12 94 28 10 93 52 25 50 61 52 68 52 23 60 91 79 17 93 82 12 18 75 64 69 69 94 74 61 61 46 57 67 45 96 64 83 89 58 87 76 53 79 21 94 70 16 10 50 82 92 20 40 51 49 28 51 82 35 16 15 86 78 89 41 98 70 46 79 79 24 40 91 13 59 73 35 32 40 31 14 31 71 35 96 18 27 39 28 38 41 36 31 63 52 48 81 25 49 90 32 65 25 45 63 94 89 50 43 41";
    //let obsStringSplit = obsString.split(" ");
    //let newEntry = [], obstacles = [];
    //for (let i = 0; i < obsStringSplit.length; i++) {
    //    if ((i + 1) % 2 === 0) {
    //        newEntry[1] = parseInt(obsStringSplit[i]);
    //        obstacles.push(newEntry.concat());
    //    } else {
    //        newEntry[0] = parseInt(obsStringSplit[i]);
    //    }
    //}

    let obstacles = [], data, splitLine, r_q = 400, c_q = 477, diag = [], upDown = [], rightLeft = [], obstRows, obstCols;

    var fs = require('fs');
    var path = require('path');

    try {
        data = fs.readFileSync(path.join(__dirname, "/bigNumbers.txt"), "utf8");
    } catch (err) {
        console.log('Error: ', e.stack);
    }

    splitLine = data.split('\n');
    splitLine.forEach(entry => {
        obstacles.push([parseInt(entry[0]), parseInt(entry[1])]);
    });

    obstacles.forEach(el => {
        obstRows = el[0] - r_q;
        obstCols = el[1] - c_q;
        if (Math.abs(obstRows) === Math.abs(obstCols)) {
            diag.push(el);
        } else {
            if (obstRows === 0) {
                leftRight.push(el);
            } else if (obstCols === 0) {
                upDown.push(el);
            }
        }
    });

    let result = queensAttack(1000, 10000, r_q, c_q, obstacles);
    
    //let result = queensAttack(100, 100, 48, 81, [[54, 87], [64, 97], [42, 75], [32, 65], [42, 87],
    //    [32, 97], [54, 75], [64, 65], [48, 87], [48, 75], [54, 81], [42, 81], [45, 17],
    //    [14, 24], [35, 15], [95, 64], [63, 87], [25, 72], [71, 38], [96, 97],
    //    [16, 30], [60, 34], [31, 67], [26, 82], [20, 93], [81, 38], [51, 94], [75, 41],
    //    [79, 84], [79, 65], [76, 80], [52, 87], [81, 54], [89, 52], [20, 31],
    //    [10, 41], [32, 73], [83, 98], [87, 61], [82, 52], [80, 64], [82, 46], [49, 21], [73, 37],
    //    [70, 43], [12, 94], [28, 10], [93, 52], [25, 50] 61
    //52 68 52 23 60 91 79 17 93 82 12 18 75 64 69 69 94 74 61 61 46 57 67 45 96 64 83 89 58 87 76 53
    //79 21 94 70 16 10 50 82 92 20 40 51 49 28 51 82 35 16 15 86 78 89 41 98 70 46 79 79 24 91 13 59 73
    //35 32 40 31 14 31 71 35 96 18 27 39 28 38 41 36 31 63 52 48 81 25 49 32 65 25 45 63 94 89 50
    //43 41

    //ws.write(result + "\n");

    //ws.end();
}

main();





/**
 * Old code
 */
/*else if (obstRows > 0) {
            //// Left-up
            //if (obstCols < 0) {
            //    if (nearestObsts["lu"] === -1) {
            //        nearestObsts["lu"] = obstacles[i];
            //    } else {
            //        if (obstRows < nearestObsts["lu"][0]) {
            //            nearestObsts["lu"] = obstacles[i];
            //        }
            //    }
            //}
            //// Up
            //else if (obstCols === 0) {
            //    if (nearestObsts["u"] === -1) {
            //        nearestObsts["u"] = obstacles[i];
            //    } else {
            //        if (obstRows < nearestObsts["u"][0]) {
            //            nearestObsts["u"] = obstacles[i];
            //        }
            //    }
            //}
            //// Right-up
            //else {
            //    if (nearestObsts["ru"] === -1) {
            //        nearestObsts["ru"] = obstacles[i];
            //    } else {
            //        if (obstRows < nearestObsts["ru"][0]) {
            //            nearestObsts["ru"] = obstacles[i];
            //        }
            //    }
            //}
        //} else {
            // Right-down
            //if (obstCols > 0) {
            //    if (nearestObsts["rd"] === -1) {
            //        nearestObsts["rd"] = obstacles[i];
            //    } else {
            //        if (obstCols < nearestObsts["rd"][1]) {
            //            nearestObsts["rd"] = obstacles[i];
            //        }
            //    }
            //}
            // Down
            //else if (obstCols === 0) {
            //    if (nearestObsts["d"] === -1) {
            //        nearestObsts["d"] = obstacles[i];
            //    } else {
            //        if (obstRows > nearestObsts["d"][0]) {
            //            nearestObsts["d"] = obstacles[i];
            //        }
            //    }
            //}
            //// Left-down
            //else {
            //    if (nearestObsts["ld"] === -1) {
            //        nearestObsts["ld"] = obstacles[i];
            //    } else {
            //        if (obstRows > nearestObsts["ld"][0]) {
            //            nearestObsts["ld"] = obstacles[i];
            //        }
            //    }
            //}*/

    //// Calculate the steps to each of the obstacles
    //Object.keys(nearestObsts).forEach(dir => {
    //    // Only add steps if the obstacle is assigned
    //    if (nearestObsts[dir] !== -1) {
    //        positions +=
    //            Math.max(
    //                Math.abs(r_q - nearestObsts[dir][0]),
    //                Math.abs(c_q - nearestObsts[dir][1])
    //            ) - 1;
    //        // Don't traverse current direction again
    //        rmDir(dir);
    //    }
    //});

//// Directions the queen can travel
    //const queenRules = [[0, -1], [-1, -1], [-1, 0], [-1, 1],
    //[0, 1], [1, 1], [1, 0], [1, -1]];
    //// Positions which are successful
    //let positions = 0;
    //// Flag if end of board or obstacle is reached
    //let obstacleReached;
    //// Current position of queen
    //let currentPosition;
    //// Target position of current move
    ////let targetPosition = [,];
    //let targetRow, targetCol;
//queenRules.forEach(direction => {
    //    obstacleReached = false;
    //    // Reset queen's position
    //    currentPosition = [r_q, c_q];
    //    // Loop while obstacle not found
    //    while (!obstacleReached) {
    //        targetRow = currentPosition[0] + direction[0];
    //        targetCol = currentPosition[1] + direction[1];

    //        // Is targetPosition off the end of the board?
    //        if (targetRow < 1 || targetCol < 1 || targetRow > n
    //            || targetCol > n) {
    //            obstacleReached = true;
    //        } else {
    //            // Find an obstacle
    //            let currentObstacle;
    //            for (let i = 0; i < obstacles.length; i++) {
    //                currentObstacle = obstacles[i];
    //                if (currentObstacle[0] === targetRow && currentObstacle[1] === targetCol) {
    //                    obstacleReached = true;
    //                    obstacles.splice(i, 1);
    //                    break;
    //                }
    //            }
    //        }

    //        // Only move forward if obstacle is not found
    //        if (!obstacleReached) {
    //            positions++;
    //            currentPosition[0] = targetRow;
    //            currentPosition[1] = targetCol;
    //        }
    //    }
    //    console.log(positions)
    //});

//// Find obstacles in queen's path
    //for (let i = 0; i < k; i++) {
    //    [obstRows, obstCols] = [obstacles[i][0] - r_q, obstacles[i][1] - c_q];
    //    // Find which direction this is going
    //    if (obstRows === 0) {
    //        positions += Math.abs(obstCols) - 1;
    //        // Left
    //        if (obstCols > 0) { rmDir("l"); }
    //        // Right
    //        else { rmDir("r"); }
    //    } else if (obstRows > 0) {
    //        positions += obstRows - 1;
    //        // Left-up
    //        if (obstCols < 0) { rmDir("lu"); }
    //        // Up
    //        else if (obstCols === 0) { rmDir("u"); }
    //        // Right-up
    //        else { rmDir("ru"); }
    //    } else {
    //        positions += Math.abs(obstRows) - 1;
    //        // Right-down
    //        if (obstRows > 0) { rmDir("rd"); }
    //        // Down
    //        else if (obstRows === 0) { rmDir("d"); }
    //        // Down-left
    //        else { rmDir("ld"); }
    //    }
    //}