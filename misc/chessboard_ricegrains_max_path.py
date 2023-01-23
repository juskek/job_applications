"""
Given a chessboard with an arbitrary no of rows and columns, and a number of rice grains in each position of the chessboard, find the maximum number of rice grains which can be obtained by travelling from the top left corner to the bottom right corner. 

Movements at each position are restricted to the bottom or right side (B or R)

Brute Force Approach:
- Find all possible paths and their resulting grains collected.

Pascal's triangle can be used to determine number of potential paths to reach a location, e.g.

1 1 1 1
1 2 3 4
1 3 6 10
1 4 10 20

So for 2x2 grid, there are 2 possible paths
and for a 3x3 grid there are 6 possible paths 
and for a 4x4 grid there are 20 possible paths

This increases exponentially, so brute force may not be suitable.

The number of paths can be obtained from the following formula:
(
    (M-1)(N-1)
    (N-1)
) 
    - See https://towardsdatascience.com/understanding-combinatorics-number-of-paths-on-a-grid-bddf08e28384
    - Which will lead to some factorial time complexity, see: https://jarednielsen.com/static/9c24f10d0295ead7526e32d62fa2eac5/2ef06/big-o-cheatsheet.png


A* Search Approach: 
A* search is a path finding algorithm where at each position, the most promising path is taken

In this case, at each position, the most promising path is determined by comparing the potential gains from continuing travel all the way down the row/col, and moving towards the direction of max potential gain.

This method is locally blind to diagonal values (at each location, cannot see any values not on the same row or col), but will still reach the global max gain since it will be able to see those diagonal values on subsequent moves

e.g. consider the following grid
0 1 1
10 0 100
10 0 0
    - in the first position, 100 is not seen
    - however, regardless of whether the next move is D or R, 100 will be eventually seen and the information will be taken into account
    
By checking the potential gain from the entire remaining row or col path, instead of just checking the potential gain from the next row element or path element, the algorithm takes the path maximum global gain, instead of local gain.

This leads to O(d) time, where d is the distance in moves from start to end.

For an M x N matrix, the d = N-1 + M-1, so the time complexity is O(N + M)
"""

board = [
    [2,2,4,2],
    [0,3,0,1],
    [1,2,2,1],
    [4,1,2,2],
    ]
    
ans = 15

def maxGrainPath(board):
    currentRow = 0
    currentCol = 0
    totalGrains = 0
    width = len(board[0])
    height = len(board)
    
    # while not at end location yet
    while currentRow < height and currentCol < width:
        
        # add rice in current loc
        totalGrains += board[currentRow][currentCol]
        
        potentialCol = 0
        # count rice in untravelled col
        # iterate through remaining rows
        for i in range(currentRow,height):
            potentialCol += board[i][currentCol]
            
        potentialRow = 0
        # count rice in untravelled row
        # iterate through remaining cols
        for j in range(currentCol,width):
            potentialRow += board[currentRow][j]
            
        # if potential gains for the row path is more than the potential gains for the col path, take the row path. Opposite applies
        
        if potentialRow > potentialCol:
            currentCol += 1 # move right
        else:
            currentRow += 1 # move down
    
    # at end location
    return totalGrains
            

print(f'Correct Ans: {maxGrainPath(board) == ans}')