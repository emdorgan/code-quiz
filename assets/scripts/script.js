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
var startBtn = document.getElementById('start-quiz');           // variables storing various pointers
var quizForm = document.getElementById('quiz-form');
var question = document.getElementById('question');             
var answer1 = document.getElementById('answer1')
var answer2 = document.getElementById('answer2')
var answer3 = document.getElementById('answer3')
var answer4 = document.getElementById('answer4')
var userAnswer = document.getElementById('user-answer')

function startQuiz(){
    startBtn.setAttribute("style", "display: none")
    quizForm.setAttribute("style", "display: inline")
    // continue here, adding pointers and modifiers to populate the questions
};

startBtn.addEventListener('click', startQuiz)