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
var allRadios = document.getElementsByName('answer');           // Nodelist of the <input>s in the quiz form
var allLabels = document.getElementById('radios').querySelectorAll('label'); // Nodelist of the <label>s in the quiz form

                //Array with each question
var questionArray = ["Question 1: When I define a variable outside of any function, the scope is...",  
                    "Question 2: Which of the following is NOT used to initialize a variable?",
                    "Question 3: Which of these comparison operators compares both value AND type?",
                    "Question 4: Name this data structure: var data = {name: data, property: stuff}",
                    "Question 5: Which method returns the size of an array?"];

                //2D array of multiple choice answers. Each sub array is a set of 4 multiple choice possibilities and the 4th index of each sub array (which is hidden from the user) is the correct answer
var answerArray = [
    ["Infinite", "Full-body", "Global", "Functional", "Global"], 
    ["const", "var", "init", "let", "init"],
    ["==", "||", "!=", "===", "==="],
    ["Object", "Array", "Pointer", "DOM", "Object"],
    ["arr.size", "arr.length", "arr.total", "arr.matey", "arr.length"]
];

var q = 0; // global variable that controls with set of questions and answers in the arrays are loaded.
var game = false; // checks if the game is running

function startQuiz(){
    if(!game){                                                      // Checks to see if the game has started
    game = true;                                                    // If it hasn't, set game to true (start) &
    startBtn.setAttribute("style", "display: none");                // hide the start button &
    quizForm.setAttribute("style", "display: inline");              // display the quiz form &
    timerDisplay.textContent = timer;                               // display the counter to the user &
    startTimer();                                                   // start the timer
    }
    question.textContent = questionArray[q];                            // Sets the text content of question to the 'q' index of the questions array
        for(var i=0; i< allRadios.length; i++){                        //For loop that iterates through the 4 multiple choice answers and adds answer corresponding to the question
            allLabels.item(i).textContent = answerArray[q][i];          //Uses the .items method to get the 'index' and iterate through the nodelist just like an array
            if(answerArray[q][i] === answerArray[q][4]){                //compares the sub array item to the 4th index (the answer index)
                allRadios.item(i).setAttribute("value", "correct")      //If it's equal, set the value of the associated radio button to "correct"
            }
            else{                                                       //If not, then set it to "incorrect" to override previous 'correct' answers
                allRadios.item(i).setAttribute("value", "incorrect")
            }

        }
    userAnswer.addEventListener('click', checkAnswer); // Calls a function that checks if the answer is correct
    
};

function checkAnswer(){
    if(quizForm.answer.value === "correct"){        //If the user's answer is correct, increment q and call the startQuiz main function, which will load the next question
        q++;
        startQuiz();
    }
    else{                                       // If the answer is wrong, deduct 10s from the timer.
        timer -= 10;
    }
}

function startTimer(){                        // Start the timer at 120 seconds
    var countdown = setInterval(() => {         // fat arrow notation was auto-filled in by VS code, but it's (mostly) just a shorthand way of writing a function
        timer--;                                // Every interval, 1 is removed from timer
        timerDisplay.textContent = timer;       // Continuously updates the display so the user sees the timer
        if(timer <= 0){                         // If timer reaches zero (or passes zero) clear the interval.
            clearInterval(countdown);
        }
    }, 1000);                                   // sets a 1 second interval
}

startBtn.addEventListener('click', startQuiz)