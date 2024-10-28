document.addEventListener('DOMContentLoaded', initGame);

function initGame() {
    let currentMark = 'X';
    let gameState = Array(9).fill('');
    let gameActive = true;

    const cells = document.querySelectorAll('#board div');
    const messageDisplay = document.getElementById('status');
    const resetButton = document.querySelector('.btn');

    setInitialMessage(messageDisplay);
    applySquareClass(cells);
    setupCellListeners(cells);
    setupHoverEffects(cells);
    resetButton.addEventListener('click', resetGame);

    function setInitialMessage(display) {
        display.textContent = "To play 'X' / 'O', hover over a square and click";
    }

    function applySquareClass(cells) {
        cells.forEach(cell => cell.classList.add('square'));
    }

    function setupCellListeners(cells) {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => handleCellClick(cell, index));
        });
    }

    function handleCellClick(cell, index) {
        if (cell.textContent === '' && gameActive) {
            cell.textContent = currentMark;
            cell.classList.add(currentMark);
            gameState[index] = currentMark;

            if (checkWin()) {
                displayWinner();
            } else {
                switchPlayer();
            }
        }
    }

    function checkWin() {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }

    function displayWinner() {
        messageDisplay.textContent = `Congratulations! ${currentMark} is the Winner!`;
        messageDisplay.classList.add('you-won');
        gameActive = false;
    }

    function switchPlayer() {
        currentMark = currentMark === 'X' ? 'O' : 'X';
    }

    function setupHoverEffects(cells) {
        cells.forEach(cell => {
            cell.addEventListener('mouseover', () => cell.classList.add('hover'));
            cell.addEventListener('mouseout', () => cell.classList.remove('hover'));
        });
    }

    function resetGame() {
        gameState.fill('');
        currentMark = 'X';
        gameActive = true;

        cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'square';
        });

        messageDisplay.textContent = 'Move your mouse over a square and click to play an X or an O.';
        messageDisplay.className = '';
    }
}
