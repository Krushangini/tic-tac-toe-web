const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const winnerMessage = document.getElementById('winner-message');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return null;
}

function checkDraw() {
    return !gameBoard.includes('');
}

function makeMove(cell) {
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameBoard[cellIndex] === '' && gameActive) {
        cell.textContent = currentPlayer;
        gameBoard[cellIndex] = currentPlayer;
        const winner = checkWin();

        if (winner) {
            winnerMessage.textContent = `Player ${winner} wins!`;
            gameActive = false;
        } else if (checkDraw()) {
            winnerMessage.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    winnerMessage.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', () => makeMove(cell)));
