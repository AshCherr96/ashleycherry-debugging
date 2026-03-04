// --- DOM ELEMENT SELECTORS ---
// These variables grab the HTML elements so we can change them with code
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message'); // Note: This returns a list (collection)
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

// --- GAME STATE VARIABLES ---
// These variables track the hidden "target" number and the player's progress
let targetNumber; 
let attempts = 0; 
const maxNumberOfAttempts = 5; 

// --- UTILITY FUNCTIONS ---
// Returns a random number from min (inclusive) to max (exclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Hides all feedback messages at once using a loop
function hideAllMessages() {
  // FIXED: Changed <= to < so it stops at the last actual message
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

// --- MAIN GAME LOGIC ---
// This function runs every time the user submits a guess
function checkGuess() {
  // Get value from guess input element and convert to a number
  const guess = parseInt(guessInput.value, 10);

  // STRETCH GOAL: Prevent numbers outside 1-99
  if (isNaN(guess) || guess < 1 || guess > 99) {
    alert("Please enter a number between 1 and 99.");
    return; 
  }

  attempts = attempts + 1;
  hideAllMessages();

  // Logic for a CORRECT guess
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  // Logic for an INCORRECT guess
  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = ''; // Shows if guess is lower than target
    } else {
      tooHighMessage.style.display = ''; // FIXED: Shows if guess is higher than target
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
    
    // STRETCH GOAL: Handle singular vs plural grammar
    let word = remainingAttempts === 1 ? 'guess' : 'guesses';

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${word} remaining`;
  }

  // Logic for reaching the maximum number of attempts
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    
    // Message added specifically for losing
    maxGuessesMessage.style.display = ''; 
  }

  guessInput.value = ''; // Clear the input for the next guess
  resetButton.style.display = ''; // Show reset button after a guess
}

// --- INITIALIZATION / RESET ---
// Sets the game back to the starting state
function setup() { 
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0; 

  // Enable the input and submit button
  submitButton.disabled = false; 
  guessInput.disabled = false;

  // FIX: Clear the input field text on reset
  guessInput.value = '';

  hideAllMessages();
  resetButton.style.display = 'none';
}

// --- EVENT LISTENERS ---
// Tells the buttons which functions to run when clicked
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

// Start the game for the first time
setup();