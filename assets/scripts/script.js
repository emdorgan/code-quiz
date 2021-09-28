// User presses Start Quiz!         <-- Pseudocode
// Hide start quiz button
// Start the timer at 120 seconds
// Display the first question and the 4 multiple choices, wait for user input
// If user enters incorrectly, say "wrong!" and deduct 10s from timer
// If user enters correctly, say "correct!", switch text to question 2 with 4 new answers
// Wait for user to enter input, then repeat step 5 until all 5 (10?) questions are completed and stop the timer
// Alternatively, if timer reachest zero, stop the quiz early, display "Time's up!"
// Once quiz is stopped prompt user to enter their name
// Store the entered name along with the value remaining on the timer in local storage
// Once stored, reset timer and return user to step 1.

// If user clicks on high-scores, get all the data in local storage
// convert data fromt string to objects
// convert data from objects to 2D array [key, value]
// use sort() method to return a sorted array with the highest values first like this:.sort(([,a],[,b]) => b-a)
// display sorted array to the user in sequential order

var timer = 120;                                                // variable storing the timer
var startBtn = document.getElementById('start-quiz');           // variables storing API pointers for ease of use
var quizForm = document.getElementById('quiz-form');
var question = document.getElementById('question'); 
var timerDisplay = document.getElementById('timer');            
var answer1 = document.getElementById('answer1Label');
var answer2 = document.getElementById('answer2Label');
var answer3 = document.getElementById('answer3Label');
var answer4 = document.getElementById('answer4Label');
var userAnswer = document.getElementById('user-answer');

function startQuiz(){
    startBtn.setAttribute("style", "display: none");
    quizForm.setAttribute("style", "display: inline");
    question.textContent = "Question 1: When I define a variable outside of any function, the scope is...";
    answer1.textContent = "Infinite";
    answer2.textContent = "Full-body";
    answer3.textContent = "Global";
    answer4.textContent = "Functional";
    timerDisplay.textContent = timer;
    startTimer();
    userAnswer.addEventListener('click', checkAnswer1)
};

function checkAnswer1(){                         // Checks the current selected answer. If wrong, deduct timer time, if correct, load the next question
    console.log(quizForm.answer.value)
    if(quizForm.answer.value === "answer1" || quizForm.answer.value === "answer2" || quizForm.answer.value === "answer4"){
        timer -= 10;
    }
    else if(quizForm.answer.value === "answer3"){
        getQuestion2();
    }
}

function startTimer(){                        // Start the timer at 120 seconds
    var countdown = setInterval(() => {                        // fat arrow notation was auto-filled in by VS code, but it's (mostly) just a shorthand way of writing a function
        timer--;                                // sets a 1000ms interval at which 1 is removed from timer
        timerDisplay.textContent = timer;       // Continuously updates the display so the user sees the timer
        if(timer <= 0){                         // If timer reaches zero (or passes zero) clear the interval.
            clearInterval(countdown);
        }
    }, 1000);
}

startBtn.addEventListener('click', startQuiz)