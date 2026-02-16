/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    if (!board || board.length === 0) return;

    const m = board.length;
    const n = board[0].length;
    const dy = [-1, 0, 0, 1];
    const dx = [0, -1, 1, 0];

    // "살아남을 O"를 찾아서 임시 문자 'S'로 마킹하는 함수
    const boundaryDFS = (y, x) => {
        // 범위를 벗어나거나, 'O'가 아니면(이미 'X'이거나 이미 방문한 'S'면) 종료
        if (y < 0 || y >= m || x < 0 || x >= n || board[y][x] !== 'O') {
            return;
        }

        board[y][x] = 'S'; // Safe: 경계와 연결되어 있으므로 살려둠

        for (let i = 0; i < 4; i++) {
            boundaryDFS(y + dy[i], x + dx[i]);
        }
    };

    // 1. 테두리(가장자리)에 있는 'O'를 찾아서 연결된 모든 'O'를 'S'로 바꿈
    for (let i = 0; i < m; i++) {
        // 왼쪽 열, 오른쪽 열 검사
        if (board[i][0] === 'O') boundaryDFS(i, 0);
        if (board[i][n - 1] === 'O') boundaryDFS(i, n - 1);
    }
    for (let j = 0; j < n; j++) {
        // 위쪽 행, 아래쪽 행 검사
        if (board[0][j] === 'O') boundaryDFS(0, j);
        if (board[m - 1][j] === 'O') boundaryDFS(m - 1, j);
    }

    // 2. 보드 전체를 순회하며 정리
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') {
                board[i][j] = 'X'; // 'S'로 안 바뀐 'O'는 갇힌 녀석들 -> X로 사형
            } else if (board[i][j] === 'S') {
                board[i][j] = 'O'; // 살려둔 'S'는 다시 원래대로 'O'로 복구
            }
        }
    }
};