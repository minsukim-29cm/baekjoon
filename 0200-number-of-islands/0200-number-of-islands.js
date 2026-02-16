/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    const dy = [-1, 0, 0, 1];
    const dx = [0, -1, 1, 0];
    let answer = 0;

    const dfs = (y, x) => {
        grid[y][x] = 0;

        for(let i = 0 ; i < 4 ; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];

            if(ny < 0 || nx < 0 || ny >= grid.length || nx >= grid[0].length) {
                continue;
            }
            if(grid[ny][nx] === '1') {
                dfs(ny, nx);
            }

        }
    }

    for(let i = 0 ; i < grid.length ; i++) {
        for(let j = 0 ; j < grid[0].length ; j++) {
            if(grid[i][j] === '1') {
                answer++;
                dfs(i, j);
            }
        }
    }

    return answer;
};