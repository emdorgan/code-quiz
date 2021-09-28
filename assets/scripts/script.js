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

var questionArray = ["Question 1: When I define a variable outside of any function, the scope is...",
                    "Question 2: Which of the following is NOT used to initialize a variable?",
                    "Question 3: Which of these comparison operators compares both value AND type?",
                    "Name this data structure: var data = {name: data, property: stuff}",
                    "Which method returns the size of an array?"];

var answer1Array = ["Infinite", "const", "==", "Object", "arr.size"];
var answer2Array = ["Full-body", "var", "||", "Array", "arr.length"];
var answer3Array = ["Global", "init", "!=", "Pointer", "arr.total"];
var answer4Array = ["Functional", "l`et", "===", "DOM", "arr.matey"]

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
    if(quizForm.answer.value === "answer1" || quizForm.answer.value === "answer2" || quizForm.answer.value === "answer4"){ 
        timer -= 10;                                //deduct 10 points for wrong answer
    }
    else if(quizForm.answer.value === "answer3"){   //If the answer is right, call the next question
        getQuestion2();
    }
}

function getQuestion2(){
    question.textContent = "Question 2: Which of the following is NOT used to initialize a variable?";
    answer1.textContent = "const";
    answer2.textContent = "var";
    answer3.textContent = "init";
    answer4.textContent = "let";
    userAnswer.addEventListener('click', checkAnswer2)
}

function checkAnswer2(){                         
    if(quizForm.answer.value === "answer1" || quizForm.answer.value === "answer2" || quizForm.answer.value === "answer4"){ 
        timer -= 10;                                
    }
    else if(quizForm.answer.value === "answer3"){
        getQuestion3();
    }
}

function getQuestion3(){
    question.textContent = "Question 3: Which of these comparison operators compares both value AND type?";
    answer1.textContent = "==";
    answer2.textContent = "||";
    answer3.textContent = "!=";
    answer4.textContent = "===";
    userAnswer.addEventListener('click', checkAnswer3)
}

function checkAnswer3(){                         
    if(quizForm.answer.value === "answer1" || quizForm.answer.value === "answer2" || quizForm.answer.value === "answer3"){ 
        timer -= 10;                                
    }
    else if(quizForm.answer.value === "answer4"){
        getQuestion4();
    }
}

function getQuestion4(){
    question.textContent = "Name this data structure: var data = {name: data, property: stuff}";
    answer1.textContent = "Object";
    answer2.textContent = "Array";
    answer3.textContent = "Pointer";
    answer4.textContent = "DOM";
    userAnswer.addEventListener('click', checkAnswer4)
}

function checkAnswer4(){                         
    if(quizForm.answer.value === "answer2" || quizForm.answer.value === "answer3" || quizForm.answer.value === "answer4"){ 
        timer -= 10;                                
    }
    else if(quizForm.answer.value === "answer1"){
        getQuestion5();
    }
}

function getQuestion5(){
    question.textContent = "Which method returns the size of an array?";
    answer1.textContent = "arr.size";
    answer2.textContent = "arr.length";
    answer3.textContent = "arr.total";
    answer4.textContent = "arr.matey";
    userAnswer.addEventListener('click', checkAnswer5)
}

function checkAnswer5(){                         
    if(quizForm.answer.value === "answer1" || quizForm.answer.value === "answer3" || quizForm.answer.value === "answer4"){ 
        timer -= 10;                                
    }
    else if(quizForm.answer.value === "answer2"){
        console.log("the end"); // placeholder for building the user submission form while I test the current functionality
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