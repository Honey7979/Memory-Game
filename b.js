// for the sound effect 

function playSoundOnClick(elementId, soundFilePath) {
    const element = document.getElementById(elementId);
    const sound = new Audio(soundFilePath);
    let isPlaying = false;

    element.addEventListener('click', () => {
        if (isPlaying) {
            sound.pause();
            isPlaying = false;
            element.textContent = "Sound On";
        } else {
            sound.play();
            isPlaying = true;
            element.textContent = "Sound Off";
        }
    });
}

playSoundOnClick('sound', 'Fluffing-a-Duck(chosic.com).mp3');


let moves = 0;
let score = 0;
let firstCard = null;
let secondCard = null;
let isProcessing = false;
let matchedPairs = 0;
const totalPairs = 10;

// Timer variables
let startTime;
let intervalId;
let timerStarted = false; // Flag to track if the timer has started

function addCardClickListeners() {
    const cards = document.querySelectorAll('.flipCard');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (isProcessing || card.classList.contains('flipped') || card.classList.contains('matched')) {
                return;
            }

            flipCard(card);
            moves++;
            updateMovesCount();

            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                checkForMatch();
            }
        });
    });
}

function flipCard(card) {
    card.classList.toggle('flipped');
    card.classList.add('clicked');
    setTimeout(() => card.classList.remove('clicked'), 2000);
}

function checkForMatch() {
    isProcessing = true;
  
    if (firstCard && secondCard) {
        if (firstCard.dataset.id === secondCard.dataset.id) {
            playMatchSound();
            // Cards match
            score += 1;
            matchedPairs++;
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            updateScore();
    
            console.log('Cards matched!');
    
            // Check if all pairs are matched
            if (matchedPairs === totalPairs) {
            // Stop the timer when the game is won
                if (intervalId) {
                    clearInterval(intervalId);
                }
            
        
                let elapsed = Date.now() - startTime;
                let seconds = Math.floor(elapsed / 1000);
                let minutes = Math.floor(seconds / 60);
                seconds = seconds % 60;
        
                // Ensure flips are complete before displaying message
                playWinningSound()
                setTimeout(() => {
                    alert(`Congratulations! You won! Time taken: ${minutes}:${seconds.toString().padStart(2, '0')}`);
                    resetGame(); // Reset the game after displaying message
                }, 500); // Adjust delay as needed
            } else {
                setTimeout(() => resetCards(), 500);
            }
        } else {
            playMismatchSound();
            // Cards don't match, wait for 2 seconds before flipping them back
            setTimeout(() => {
            flipCard(firstCard);
            flipCard(secondCard);
            resetCards();
            }, 500);
        }
    } else {
        resetCards();
    }
}
    
function resetCards() {
    firstCard = null;
    secondCard = null;
    isProcessing = false;
}

function updateMovesCount() {
    const movesCount = document.getElementById('moves');
    movesCount.textContent = `${moves}`;
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `${score}`;
}

function shuffleCards() {
    const cards = Array.from(document.querySelectorAll('.flipCard'));
    const shuffledCards = cards.sort(() => 0.5 - Math.random());

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';

    shuffledCards.forEach(card => gridContainer.appendChild(card));
}

function resetGame() {
    moves = 0;
    score = 0;
    matchedPairs = 0;
    updateMovesCount();
    updateScore();

    const cards = document.querySelectorAll('.flipCard');
    cards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });

    resetCards();
    shuffleCards();
}

// Add click event listener to restart button
document.getElementById('restart').addEventListener('click', () => {
    resetGame();
    if (intervalId) {
        clearInterval(intervalId); // Clear any existing timer
    }
    timerStarted = false; // Reset the timerStarted flag
    startTimer(); // Start the timer after resetting the game

});


// Add click event listener to start button
document.getElementById('startButton').addEventListener('click', function() {
    if (!timerStarted) {
        startTimer(); // Start the timer if not already started
    }
});

function startTimer() {
    let timerDisplay = document.getElementById('timer');
    startTime = Date.now();

    function updateTimer() {
        let elapsed = Date.now() - startTime;
        let seconds = Math.floor(elapsed / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(updateTimer, 1000);
    timerStarted = true; // Set the flag to true when the timer starts
}

// Initialize the game (optional)
shuffleCards();
addCardClickListeners();


// grid clicking sound effect

function playSoundOnClick1() {
    const gridContainer = document.querySelector('.grid-container');
    const sound = new Audio('mixkit-select-click-1109.wav'); // Replace with your sound file path
  
    gridContainer.addEventListener('click', () => {
      sound.play();
    });
  }
  
  playSoundOnClick1();
  

  // for winning and loosing sound effect

  function playMatchSound() {
    const matchSound = new Audio('mixkit-quick-win-video-game-notification-269.wav'); // Replace with your match sound file
    matchSound.play();
  }
  
  function playMismatchSound() {
    const mismatchSound = new Audio('mixkit-click-error-1110.wav'); // Replace with your mismatch sound file
    mismatchSound.play();
  }

  function playWinningSound() {
    const winSound = new Audio('goodresult-82807.mp3'); // Replace with your winning sound file
    winSound.play();
  }
  
function playSoundAfterOneAndHalfMinute(soundFilePath) {
    const oneAndHalfMinute = 80 * 1000; // Convert 1.5 minutes to milliseconds
  
    const sound = new Audio(soundFilePath);
  
    setTimeout(() => {
      sound.play();
    }, oneAndHalfMinute);
}
  
  // Example usage:
playSoundAfterOneAndHalfMinute('A Few Moments Later (Spongebob) - QuickSounds.com.mp3');