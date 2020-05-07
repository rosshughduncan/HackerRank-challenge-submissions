#!/bin/python3

import math
import os
import random
import re
import sys
import copy

# Complete the formingMagicSquare function below.
def formingMagicSquare(s):
    # check which lines need to be converted
    # calculate sums rows
    sums = []
    for sublist in s:
        sums.append(sum(sublist, 0))

    # columns
    for i in range(3):
        current_sum = 0
        for j in range(3):
            current_sum += s[i][j]
        sums.append(current_sum)

    # and diagonally
    # top left to bottom right
    current_sum = 0
    for i in range(3):
        current_sum += s[i][i]
    sums.append(current_sum)

    # top right to bottom left
    current_sum = 0
    for i in range(2, -1, -1):
        current_sum += s[i][i]
    sums.append(current_sum)

    # ********************************************************
    # calculate which calculations would be the most efficient

    costs = []
    sums_set = set(sums)

    # check calculations for each of the sums
    for m in sums_set:
        cost = 0
        scopy = copy.copy(s)
        # row 1
        #if sum(scopy[0]) != m:
        # [0][0]
        # take a copy of the current value
        #old_val = scopy[0][0]

        # adjust the current cell so the row fits the magic constant
        #scopy[0][0] = m - scopy[0][1] - scopy[0][2]
        # if the rows, columns and diagonals don't all add up to the magic constant, then the new value doesn't work and it gets reverted to the old value
        #if m != sum_col1(scopy) or m != sum_diag1(scopy):
        # if m != sum_col1(scopy) or m != sum_diag1(scopy) or m != sum(scopy[0]):
        #
        #     scopy[0][0] = old_val
        print(f"m is {m}")
        print(f"scopy before the change: {scopy}")
        cost += sum_line((sum_col1, sum_diag1), scopy[0][0], m, scopy, 0)
        print(f"total cost is {cost} after")
        print(f"scopy after change: {scopy}")
        # if the directions do add to the same value, then we know that the cost of our calculation is correct
        #else:
            # store the cost of changing the current value
            #cost += abs(old_val - scopy[0][0])


        # [0][1]
        old_val = scopy[0][1]

        scopy[0][1] = m - scopy[0][0] - scopy[0][2]
        #if m != sum_col2(scopy):
        if m != sum_col2(scopy) or m != sum(scopy[0]):
            scopy[0][1] = old_val
        else:
            cost += abs(old_val - scopy[0][1])


        # [0][2]
        old_val = scopy[0][2]


        #print(f"old val is {old_val}")
        scopy[0][2] = m - scopy[0][0] - scopy[0][1]
        #current_cost = abs(old_val - scopy[0][2])
        #if m != sum_col3(scopy) or m != sum_diag2(scopy):
        if m != sum_col3(scopy) or m != sum_diag2(scopy) or m != sum(scopy[0]):
            scopy[0][2] = old_val
        else:
            #cost += current_cost
            cost += abs(old_val - scopy[0][2])
            #print(f"cost on this round: {abs(old_val - scopy[0][1])}")



        # row 2
        #if sum(scopy[1]) != m:
            #[1][0]

        old_val = scopy[1][0]
        scopy[1][0] = m - scopy[1][1] - scopy[1][2]
        #current_cost =
        #if m != sum_col1(scopy):
        if m != sum_col1(scopy) or m != sum(scopy[1]):

            scopy[1][0] = old_val
        else:
            #cost += current_cost
            cost += abs(old_val - scopy[1][0])


        #[1][1]
        old_val = scopy[1][1]
        scopy[1][1] = m - scopy[1][0] - scopy[1][2]
        #current_cost = abs(old_val - scopy[1][1])
        #if m != sum_col2(scopy) or m != sum_diag1(scopy) or m != sum_diag2(scopy):
        if m != sum_col2(scopy) or m != sum_diag1(scopy) or m != sum_diag2(scopy) or m != sum(scopy[1]):

            scopy[1][1] = old_val
        else:
            #cost += current_cost
            cost += abs(old_val - scopy[1][1])


        #[1][2]
        old_val = scopy[1][2]
        scopy[1][2] = m - scopy[1][0] - scopy[1][1]
        #current_cost = abs(old_val - scopy[1][2])
        #if m != sum_col3(scopy):
        if m != sum_col3(scopy) or m != sum(scopy[1]):
            scopy[1][2] = old_val
        else:
            #cost += current_cost
            cost += abs(old_val - scopy[1][2])

        # row 3
        #if sum(scopy[2]) != m:
            #[2][0]
        old_val = scopy[2][0]
        scopy[2][0] = m - scopy[2][1] - scopy[2][2]
        #current_cost = abs(old_val - scopy[2][0])
        #if m != sum_col1(scopy) or m != sum_diag2(scopy):
        if m != sum_col1(scopy) or m != sum_diag2(scopy) or m != sum(scopy[2]):
            scopy[2][0] = old_val
        else:
            #cost += current_cost
            cost += abs(old_val - scopy[2][0])

        #[2][1]
        old_val = scopy[2][1]
        scopy[2][1] = m - scopy[2][0] - scopy[2][2]
        #current_cost = abs(old_val - scopy[2][1])
        #if m != sum_col2(scopy):
        if m != sum_col2(scopy) or m != sum(scopy[2]):
            scopy[2][1] = old_val
        else:
            #cost += current_cost
            cost += abs(old_val - scopy[2][1])

        #[2][2]
        old_val = scopy[2][2]
        scopy[2][2] = m - scopy[2][0] - scopy[2][1]
        #current_cost = abs(old_val - scopy[2][2])
        #if m != sum_col3(scopy) or m != sum_diag1(scopy):
        if m != sum_col3(scopy) or m != sum_diag1(scopy) or m != sum(scopy[2]):
            scopy[2][2] = old_val
        else:
            #cost += current_cost
            cost += abs(old_val - scopy[2][2])

        # column 1
        #if sum_col1(scopy) != m:
        #[0][0]
        old_val = scopy[0][0]
        scopy[0][0] = m - scopy[1][0] - scopy[2][0]
        #current_cost = abs(old_val - scopy[0][0])
        #if m != sum(scopy[0]) or m != sum_diag1(scopy):
        if m != sum(scopy[0]) or m != sum_diag1(scopy) or m != sum_col1(scopy):
            scopy[0][0] = old_val
        else:
            #cost += current_cost
            cost += abs(old_val - scopy[0][0])

        #[1][0]
        old_val = scopy[1][0]
        scopy[1][0] = m - scopy[0][0] - scopy[2][0]
        #current_cost = abs(old_val - scopy[1][0])
        if m != sum(scopy[1]) or m != sum_col1(scopy):
            scopy[1][0] = old_val
        else:
            #cost += current_cost
            cost += abs(old_val - scopy[1][0])

        #[2][0]
        old_val = scopy[2][0]
        scopy[2][0] = m - scopy[0][0] - scopy[1][0]
        #current_cost = abs(old_val - scopy[2][0])
        #if m != sum(scopy[2]) or m != sum_diag2(scopy):
        if m != sum(scopy[2]) or m != sum_diag2(scopy) or m != sum_col1(scopy):
            scopy[2][0] = old_val
        else:
            #cost += current_cost
            cost += abs(old_val - scopy[2][0])

        # column 2
        #if sum_col2(scopy) != m:
        #[0][1]
        old_val = scopy[0][1]
        scopy[0][1] = m - scopy[1][1] - scopy[2][1]
        #current_cost = abs(old_val - scopy[0][1])
        #if m != sum(scopy[0]):
        if m != sum(scopy[0]) or m != sum_col2(scopy):
            scopy[0][1] = old_val
        else:
            if old_val != scopy[0][1]:
                #cost += current_cost
                cost += abs(old_val - scopy[0][1])

        #[1][1]
        old_val = scopy[1][1]
        scopy[1][1] = m - scopy[0][1] - scopy[2][1]
        #current_cost = abs(old_val - scopy[1][1])
        #if m != sum(scopy[1]) or m != sum_diag1(scopy) or m != sum_diag2(scopy):
        if m != sum(scopy[1]) or m != sum_diag1(scopy) or m != sum_diag2(scopy) or m != sum_col2(scopy):
            scopy[1][1] = old_val
        else:
            if old_val != scopy[1][1]:
                #cost += current_cost
                cost += abs(old_val - scopy[1][1])

        #[2][1]
        old_val = scopy[2][1]
        scopy[2][1] = m - scopy[0][1] - scopy[1][1]
        #current_cost = abs(old_val - scopy[2][1])
        #if m != sum(scopy[2]):
        if m != sum(scopy[2]) or sum_col2(scopy):
            scopy[2][1] = old_val
        else:
            if old_val != scopy[2][1]:
                #cost += current_cost
                cost += abs(old_val - scopy[2][1])

        # column 3
        #if sum_col3(scopy) != m:
        #[0][2]
        old_val = scopy[0][2]
        scopy[0][2] = m - scopy[1][2] - scopy[2][2]
        #current_cost = abs(old_val - scopy[0][2])
        #if m != sum(scopy[0]) or m != sum_diag2(scopy):
        if m != sum(scopy[0]) or m != sum_diag2(scopy) or m != sum_col3(scopy):
            scopy[0][2] = old_val
        else:
            if old_val != scopy[0][2]:
                #cost += current_cost
                cost += abs(old_val - scopy[0][2])

        #[1][2]
        old_val = scopy[1][2]
        scopy[1][2] = m - scopy[0][2] - scopy[2][2]
        #current_cost = abs(old_val - scopy[1][2])
        #if m != sum(scopy[1]):
        if m != sum(scopy[1]) or m != sum_col3(scopy):
            scopy[1][2] = old_val
        else:
            if old_val != scopy[1][2]:
                #cost += current_cost
                cost += abs(old_val - scopy[1][2])

        #[2][2]
        old_val = scopy[2][2]
        scopy[2][2] = m - scopy[0][2] - scopy[1][2]
        #current_cost = abs(old_val - scopy[2][2])
        #if m != sum(scopy[2]) or m != sum_diag1(scopy):
        if m != sum(scopy[2]) or m != sum_diag1(scopy) or m != sum_col3(scopy):
            scopy[2][2] = old_val
        else:
            if old_val != scopy[2][2]:
                #cost += current_cost
                cost += abs(old_val - scopy[2][2])

        # top left to bottom right (diagonal 1)
        #if sum_diag1(scopy) != m:
        #[0][0]
        old_val = scopy[0][0]
        scopy[0][0] = m - scopy[1][1] - scopy[2][2]
        #current_cost = abs(old_val - scopy[0][0])
        #if m != sum(scopy[0]) or m != sum_col1(scopy):
        if m != sum(scopy[0]) or m != sum_col1(scopy) or m != sum_diag1(scopy):
            scopy[0][0] = old_val
        else:
            if old_val != scopy[0][0]:
                #cost += current_cost
                cost += abs(old_val - scopy[0][0])

        #[1][1]
        old_val = scopy[1][1]
        scopy[1][1] = m - scopy[0][0] - scopy[2][2]
        #current_cost = abs(old_val - scopy[1][1])
        #if m != sum(scopy[1]) or m != sum_col2(scopy):
        if m != sum(scopy[1]) or m != sum_col2(scopy) or m != sum_diag1(scopy):
            scopy[1][1] = old_val
        else:
            if old_val != scopy[1][1]:
                #cost += current_cost
                cost += abs(old_val - scopy[1][1])

        #[2][2]
        old_val = scopy[2][2]
        scopy[2][2] = m - scopy[0][0] - scopy[1][1]
        #current_cost = abs(old_val - scopy[2][2])
        #if m != sum(scopy[2]) or m != sum_col3(scopy):
        if m != sum(scopy[2]) or m != sum_col3(scopy) or m != sum_diag1(scopy):
            scopy[2][2] = old_val
        else:
            if old_val != scopy[2][2]:
                #cost += current_cost
                cost += abs(old_val - scopy[2][2])

        # top right to bottom left (diagonal 2)
        #if sum_diag2(scopy) != m:
        #[0][2]
        old_val = scopy[0][2]
        scopy[0][2] = m - scopy[1][1] - scopy[2][0]
        #current_cost = abs(old_val - scopy[0][2])
        #if m != sum(scopy[0]) or m != sum_col3(scopy):
        if m != sum(scopy[0]) or m != sum_col3(scopy) or m != sum_diag2(scopy):
            scopy[0][2] = old_val
        else:
            if old_val != scopy[0][2]:
                #cost += current_cost
                cost += abs(old_val - scopy[0][2])

        #[1][1]
        old_val = scopy[1][1]
        scopy[1][1] = m - scopy[0][2] - scopy[2][0]
        #current_cost = abs(old_val - scopy[1][1])
        #if m != sum(scopy[1]) or m != sum_col2(scopy) or m != sum_diag1(scopy):
        if m != sum(scopy[1]) or m != sum_col2(scopy) or m != sum_diag1(scopy) or m != sum_diag2(scopy):
            scopy[1][1] = old_val
        else:
            if old_val != scopy[1][1]:
                #cost += current_cost
                cost += abs(old_val - scopy[1][1])

        #[2][0]
        old_val = scopy[2][0]
        scopy[2][0] = m - scopy[1][1] - scopy[0][2]
        #current_cost = abs(old_val - scopy[2][0])
        #if m != sum(scopy[2]) or m != sum_col1(scopy):
        if m != sum(scopy[2]) or m != sum_col1(scopy) or m != sum_diag2(scopy):
            scopy[2][0] = old_val
        else:
            if old_val != scopy[2][0]:
                #cost += current_cost
                cost += abs(old_val - scopy[2][0])

        costs.append(cost)

        # ********TESTING**********
        print("\n\n\n\n")

    # return the lowest cost
    return min(costs)

def sum_diag1(scopy):
    return scopy[0][0] + scopy[1][1] + scopy[2][2]

def sum_diag2(scopy):
    return scopy[0][2] + scopy[1][1] + scopy[2][0]

def sum_col1(scopy):
    return scopy[0][0] + scopy[1][0] + scopy[2][0]

def sum_col2(scopy):
    return scopy[0][1] + scopy[1][1] + scopy[2][1]

def sum_col3(scopy):
    return scopy[0][2] + scopy[1][2] + scopy[2][2]

def sum_line(sums, square, m, scopy, row_index = -1):
    current_cost = 0
    old_val = square
    for current_sum in sums:
        current_result = current_sum(scopy)
        if current_result != m:
            print(f"****current result: {current_result}")
            square = m - (current_result - square)
            print(f"square is now: {square}")
    # if we are calculating a sum for a row as well
    if row_index != -1:
        row_sum = sum(scopy[row_index])
        if row_sum != m:
            square = m - (row_sum - square)
            print(f"square is now: {square}")
    print(f"old val is: {old_val}")
    current_cost += abs(old_val - square)
    print(f"current cost @ function is: {current_cost}")
    return current_cost

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    s = []

    for _ in range(3):
        s.append(list(map(int, input().rstrip().split())))

    result = formingMagicSquare(s)

    fptr.write(str(result) + '\n')

    fptr.close()
