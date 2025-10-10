let userScore = 0;
let compScore = 0;
let roundCount = 0; // New: Initialize round counter
const MAX_ROUNDS = 10; // New: Set the maximum rounds

// Get DOM elements
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// --- Game Logic Functions ---

/**
 * Generates a random computer choice.
 * @returns {string} The computer's choice.
 */
const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

/**
 * Resets the game scores and round count.
 */
const resetGame = () => {
    userScore = 0;
    compScore = 0;
    roundCount = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Game over! Starting new match. Play your turn!";
    msg.style.backgroundColor = "#3a5a40"; // Reset to initial color
    choices.forEach(choice => choice.style.pointerEvents = 'auto'); // Enable clicking
};

/**
 * Updates the score display and the message when the game is a draw.
 */
const drawGame = () => {
    roundCount++; // Increment round count even on a draw
    msg.innerText = `Round ${roundCount}: It was a Draw. Play again!`;
    msg.style.backgroundColor = "#081b31"; // Neutral color for draw
    checkRoundLimit(); // Check if the game should end
};

/**
 * Checks if the maximum round limit has been reached and handles game over.
 */
const checkRoundLimit = () => {
    if (roundCount >= MAX_ROUNDS) {
        choices.forEach(choice => choice.style.pointerEvents = 'none'); // Disable clicking
        let finalMessage = "Final Game Over! ";
        
        if (userScore > compScore) {
            finalMessage += `You WIN the match ${userScore} to ${compScore}! 🎉`;
        } else if (compScore > userScore) {
            finalMessage += `You LOST the match ${userScore} to ${compScore}. 😭`;
        } else {
            finalMessage += `The match is a TIE ${userScore} to ${compScore}! 🤝`;
        }
        
        msg.innerText = finalMessage;
        msg.style.backgroundColor = "#800080"; // A unique color for the final message

        // Automatically start a new game after a short delay
        setTimeout(resetGame, 5000); // New game starts after 5 seconds
    }
};

/**
 * Updates the score and message for a win or loss.
 */
const showWinner = (userWin, userChoice, compChoice) => {
    roundCount++; // Increment round count
    
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `Round ${roundCount}: You Win! Your ${userChoice} beats ${compChoice}.`;
        msg.style.backgroundColor = "#4caf50"; // Green for win
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `Round ${roundCount}: You Lost. ${compChoice} beats your ${userChoice}.`;
        msg.style.backgroundColor = "#d32f2f"; // Red for loss
    }
    
    checkRoundLimit(); // Check if the game should end
};

/**
 * Core game logic to play a single round.
 */
const playGame = (userChoice) => {
    // If the game is over, don't allow playing until reset
    if (roundCount >= MAX_ROUNDS) {
        return; 
    }

    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = false;
        
        // Winning conditions check
        if ((userChoice === "rock" && compChoice === "scissors") || 
            (userChoice === "paper" && compChoice === "rock") || 
            (userChoice === "scissors" && compChoice === "paper")) 
        {
            userWin = true;
        }
        
        showWinner(userWin, userChoice, compChoice);
    }
};

// --- Event Listeners ---

// Attach event listener to each choice element
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});