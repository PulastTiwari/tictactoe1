document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('tic-tac-toe-board');
    const cells = [];
    let currentPlayer = 'X';
    let winner = null;

    // Create the Tic Tac Toe board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        cells.push(cell);
        board.appendChild(cell);
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = clickedCell.dataset.index;

        // Check if the cell is already clicked or if there's a winner
        if (!cells[cellIndex].textContent && !winner) {
            cells[cellIndex].textContent = currentPlayer;
            checkForWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkForWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                winner = currentPlayer;
                highlightWinnerCells(combination);
                alert(`Player ${winner} wins!`);
                return;
            }
        }

        // Check for a tie
        if (cells.every(cell => cell.textContent)) {
            alert('It\'s a tie!');
        }
    }

    function highlightWinnerCells(combination) {
        for (const index of combination) {
            cells[index].style.backgroundColor = '#c3e6cb';
        }
    }

    // Restart the game
    window.restartGame = function () {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '#333';
        });
        winner = null;
        currentPlayer = 'X';
    };
});
