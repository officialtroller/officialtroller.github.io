let canvas, ctx;
let words = [];
let word;
let guessedLetters = [];
let wrongGuesses = 0;
let isAnimating = false;
let isGameOver = false;
let animationQueue = [];
let response;

// Fetch words from the API
async function fetchWords() {
    const lang = localStorage.getItem('lang') || 'en';
    switch (lang) {
        case 'en':
            response = await fetch('https://raw.githubusercontent.com/RazorSh4rk/random-word-api/refs/heads/master/words.json');
            break;
        default:
            response = await fetch(`https://raw.githubusercontent.com/RazorSh4rk/random-word-api/refs/heads/master/languages/${lang}.json`);
            break;
    }
    words = await response.json();
    word = words[Math.floor(Math.random() * words.length)];
}

// Define the hangman parts with their coordinates
const hangmanParts = [
    { type: 'line', points: [50, 350, 150, 350] }, // Base
    { type: 'line', points: [100, 350, 100, 50] }, // Pole
    { type: 'line', points: [100, 50, 250, 50] }, // Top bar
    { type: 'line', points: [250, 50, 250, 100] }, // Rope
    { type: 'circle', points: [250, 130, 30] }, // Head
    { type: 'line', points: [250, 160, 250, 250] }, // Body
    { type: 'line', points: [250, 180, 220, 220] }, // Left arm
    { type: 'line', points: [250, 180, 280, 220] }, // Right arm
    { type: 'line', points: [250, 250, 220, 300] }, // Left leg
    { type: 'line', points: [250, 250, 280, 300] }, // Right leg
];

function animateLine(startX, startY, endX, endY, callback) {
    const duration = 500;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        const currentX = startX + (endX - startX) * progress;
        const currentY = startY + (endY - startY) * progress;
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            callback();
        }
    }

    requestAnimationFrame(animate);
}

function animateCircle(centerX, centerY, radius, callback) {
    const duration = 500;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2 * progress);
        ctx.stroke();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            callback();
        }
    }

    requestAnimationFrame(animate);
}

function processAnimationQueue() {
    if (animationQueue.length === 0) {
        isAnimating = false;
        if (wrongGuesses >= 10) {
            endGame(false);
        }
        return;
    }

    isAnimating = true;
    const part = animationQueue.shift();

    if (part.type === 'line') {
        animateLine(part.points[0], part.points[1], part.points[2], part.points[3], processAnimationQueue);
    } else if (part.type === 'circle') {
        animateCircle(part.points[0], part.points[1], part.points[2], processAnimationQueue);
    }
}

function drawHangman() {
    if (!isAnimating && !isGameOver) {
        if (wrongGuesses <= hangmanParts.length) {
            animationQueue.push(hangmanParts[wrongGuesses - 1]);
            processAnimationQueue();
        }
    }
}

function endGame(isWin) {
    isGameOver = true;
    const gameMessage = document.getElementById('gameMessage');
    const letterInput = document.getElementById('letterInput');
    const guessButton = document.getElementById('guessButton');
    const resetButton = document.getElementById('resetButton');
    const wordDisplay = document.getElementById('wordDisplay');

    letterInput.disabled = true;
    guessButton.disabled = true;
    resetButton.style.display = 'inline-block';

    if (isWin) {
        gameMessage.textContent = 'Congratulations! You won!';
        gameMessage.className = 'win-message';
        const winSound = new Audio('./winning.wav');
        winSound.play();
    } else {
        gameMessage.textContent = 'Game Over! The word was: ' + word;
        gameMessage.className = 'game-over';
        wordDisplay.textContent = word;
        const gameOverSound = new Audio('./gameover.mp3');
        gameOverSound.play();
    }
}

function updateGuessedLettersDisplay() {
    const display = document.getElementById('guessedLettersDisplay');
    display.innerHTML = Array.from(guessedLetters)
        .sort()
        .map(letter => {
            const isCorrect = word.includes(letter);
            return `<span class="guessed-letter ${isCorrect ? 'correct' : 'incorrect'}">${letter}</span>`;
        })
        .join('');
}

function guessLetter(letter) {
    if (!isAnimating && !isGameOver) {
        if (word.includes(letter)) {
            guessedLetters.push(letter);
            if (word.split('').every(letter => guessedLetters.includes(letter))) {
                endGame(true);
            }
        } else {
            wrongGuesses++;
            guessedLetters.push(letter);
            drawHangman();
        }
        updateWordDisplay();
        updateGuessedLettersDisplay();
    }
}

function updateWordDisplay() {
    const wordDisplay = document.getElementById('wordDisplay');
    wordDisplay.textContent = word
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');
}

function submitGuess() {
    const letterInput = document.getElementById('letterInput');
    const letter = letterInput.value.toLowerCase();
    letterInput.value = '';

    if (letter && !guessedLetters.includes(letter) && !isGameOver && /^\p{L}$/u.test(letter)) {
        guessLetter(letter);
    } else if (guessedLetters.includes(letter)) {
        const gameMessage = document.getElementById('gameMessage');
        gameMessage.textContent = 'Letter already guessed!';
        gameMessage.className = 'game-over';
        setTimeout(() => {
            if (!isGameOver) {
                gameMessage.textContent = '';
                gameMessage.className = '';
            }
        }, 1500);
    }
}

async function resetGame() {
    isGameOver = false;
    isAnimating = false;
    wrongGuesses = 0;
    guessedLetters = [];
    animationQueue = [];
    await fetchWords();

    const gameMessage = document.getElementById('gameMessage');
    const letterInput = document.getElementById('letterInput');
    const guessButton = document.getElementById('guessButton');
    const resetButton = document.getElementById('resetButton');
    const guessedLettersDisplay = document.getElementById('guessedLettersDisplay');

    gameMessage.textContent = '';
    gameMessage.className = '';
    letterInput.disabled = false;
    guessButton.disabled = false;
    resetButton.style.display = 'none';
    letterInput.value = '';
    guessedLettersDisplay.innerHTML = '';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateWordDisplay();
}

// Initialize the game once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    canvas = document.getElementById('hangmanCanvas');
    ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;

    const letterInput = document.getElementById('letterInput');

    letterInput.addEventListener('input', function (e) {
        const value = e.target.value;
        if (value && !/^\p{L}$/u.test(value)) {
            e.target.value = '';
        }
    });

    letterInput.addEventListener('paste', e => {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        if (/^\p{L}$/u.test(pastedText)) {
            letterInput.value = pastedText.toLowerCase();
        }
    });

    letterInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitGuess();
        }
    });

    await fetchWords();
    resetGame();
    const toggledark = document.getElementsByClassName('toggledark')[0];
    const toggleinput = document.querySelector('.toggledark label input');
    toggleinput.checked = localStorage.getItem('darkmode') === 'true';
    const body = document.querySelector('body');
    body.classList.toggle('darkmode', localStorage.getItem('darkmode') === 'true');
    toggleinput.addEventListener('change', () => {
        body.classList.toggle('darkmode');
        localStorage.setItem('darkmode', toggleinput.checked);
    });
    const changelang = document.getElementsByClassName('changelang')[0];
    const langinput = document.querySelector('.changelang select');
    langinput.value = localStorage.getItem('lang') || 'en';
    langinput.addEventListener('change', () => {
        localStorage.setItem('lang', langinput.value);
        location.reload();
    });
});
