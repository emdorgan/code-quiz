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

var startBtn = document.getElementById('start-quiz');           // variables storing API pointers for ease of use
var cardPointer = document.getElementById('quiz');
var quizForm = document.getElementById('quiz-form');
var question = document.getElementById('question'); 
var timerDisplay = document.getElementById('timer');            
var userAnswer = document.getElementById('user-answer');
var highScoreForm = document.getElementById('high-score-form');    
var highScoreBtn = document.getElementById('high-score');                   

var allRadios = document.getElementsByName('answer');                       // Nodelist of the <input>s in the quiz form
var allLabels = document.getElementById('radios').querySelectorAll('label'); // Nodelist of the <label>s in the quiz form

var endScreenHeader = document.createElement("h2");                         // All APIs for the dynamically generated end screen 
var endScreen = document.createElement('p');
var restartBtn = document.createElement('button');

restartBtn.setAttribute('class', 'btn btn-outline-success');                // set bootstrapping for the restart btn
restartBtn.setAttribute('type', 'button');                                  // set type attribute for the restart btn

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

var countdown;                                                      // initializing countdown function variable globally for scope
var timer = 120;                                                    // variable storing the timer
var q = 0;                                                          // global variable that controls with set of questions and answers in the arrays are loaded.
var game = false;                                                   // checks if the game is running
var playerScore;

function startQuiz(){
    if(!game){                                                      // Checks to see if the game has started
    highScoreBtn.setAttribute("style", "display: none");            // Hides high-score btn once the game starts
    game = true;                                                    // If it hasn't, set game to true (start) &
    q = 0;                                                          // Reset q variable to 0 &
    timer = 120;                                                    // Reset timer to 120 &
    startBtn.setAttribute("style", "display: none");                // hide the start button &
    quizForm.setAttribute("style", "display: inline");              // display the quiz form &
    timerDisplay.textContent = timer;                               // display the counter to the user &
    startTimer();                                                   // start the timer
    }
    if(q < questionArray.length){                                          // Checks if the game is still active (i.e. q is less than the # of questions AND the timer is greater than zero)
        question.textContent = questionArray[q];                            // Sets the text content of question to the 'q' index of the questions array
            for(var i=0; i< allRadios.length; i++){                        //For loop that iterates through the 4 multiple choice answers and adds answer corresponding to the question
                allLabels.item(i).textContent = answerArray[q][i];          //Uses the .items method to get the 'index' and iterate through the nodelist just like an array
                if(answerArray[q][i] === answerArray[q][4]){                //compares the sub array item to the 4th index (the answer index)
                    allRadios.item(i).setAttribute("value", "correct");      //If it's equal, set the value of the associated radio button to "correct"
                }
                else{                                                       //If not, then set it to "incorrect" to override previous 'correct' answers
                    allRadios.item(i).setAttribute("value", "incorrect");
                }

            }
        userAnswer.addEventListener('click', checkAnswer); // Calls a function that checks if the answer is correct
    }
    else{                                                               // If q is ever greater or equal to the number of questions, the the game is over
        endGame(true);                                                  // the player has 'won' (i.e. made it to the end before the timer ran out) so the endGame function is called with a true value
    }
};

function endGame(win){                                          // Function serving as the end game that accepts a boolean value to indicate if the player won or lose
    game = false;
    quizForm.setAttribute("style", "display: none");
    clearInterval(countdown);                                   // Stops the timer effect
    document.getElementById('timer-name').setAttribute("style", "display: none");   // hides the timer
    if(win){
        endScreenHeader.textContent = "You Win!!";                                      //if the functions was called with a value of true, display all the You win! stuff
        endScreen.textContent = "Your Score is "+ timer;                                // display score as value remaining on timer
        document.getElementById('win').append(endScreenHeader);                         //append the you win and score messages
        document.getElementById('win').append(endScreen);
        playerScore = timer;                                                            // sets the player score equal to the timer
        highScoreForm.setAttribute("style", "display: inline");                         //unhide the high score submission form
        
    }
    else{
        endScreenHeader.textContent = "Time's up!";                                     // puts text in three DOM elements
        endScreen.textContent = "Better luck next time!";
        document.getElementById('win').append(endScreenHeader);                         //append the you win and score messages
        document.getElementById('win').append(endScreen);
        playerScore = timer;                                                            // sets the player score equal to the timer
        highScoreForm.setAttribute("style", "display: inline");                         //unhide the high score submission form
        

    }
};

function checkAnswer(){
    if(quizForm.answer.value === "correct"){        //If the user's answer is correct, increment q and call the startQuiz main function, which will load the next question
        q++;
        startQuiz();
    }
    else{                                       // If the answer is wrong, deduct 10s from the timer.
        timer -= 10;
        document.getElementById('user-answer').setAttribute("class", "btn btn-danger")          //changes button color to red to give visual feedback
        var flashRed = setTimeout(function(){
            document.getElementById('user-answer').setAttribute("class", "btn btn-primary")     // changes it back after 1/4th of a second to create a 'flash red' effect
        }, 250)
    }
}

function startTimer(){                        // Start the timer at 120 seconds
    countdown = setInterval(() => {         // fat arrow notation was auto-filled in by VS code, but it's (mostly) just a shorthand way of writing a function
        timer--;                                // Every interval, 1 is removed from timer
        timerDisplay.textContent = timer;       // Continuously updates the display so the user sees the timer
        if(timer <= 0){                         // If timer reaches zero (or passes zero in case the player answers wrong with less than 10 seconds remaining) then
            clearInterval(countdown);           //  clear the interval &
            timer = 0;                          // set the timer to 0 (to avoid negatives showing up) &
            timerDisplay.textContent = timer;
            endGame(false);                     // call the endGame function with a value of false indicating the player lost the game
        }
    }, 1000);                                   // sets a 1 second interval
}

function postScore(){                               // Stores the user input as key and the player score as value in localStorage
    localStorage.setItem(highScoreForm.pname.value, playerScore);
    location.reload();                                  // reloads the page to restart the quiz for the user to try again or access highscores.
}

function loadHighScoreTable(){
    document.getElementById('timer-name').setAttribute("style", "display: none");
    var allHighScores = {...localStorage};  // Uses the spread notation to fetch an object of all local storage with each 'name: score' properties
    var orderedHighScores = [];
    for (var scores in allHighScores) {                 // For... in loop to iterate through the object properties and deconstruct into an array of [key, value] arrays
        orderedHighScores.push([scores, allHighScores[scores]]);
    }

    orderedHighScores.sort(function(a, b) {             // uses array.sort method to sort the score values in ascending order
        return a[1] - b[1];
    });
    console.log(orderedHighScores);
    startBtn.setAttribute("style", "display: none");        //  Hides the start button
    highScoreBtn.setAttribute("style", "display: none");    //  hides the highscore button
    endScreenHeader.textContent = "High Scores";            
    cardPointer.append(endScreenHeader);                    // append the h2 tag that got text filled with "high scores"
    var k = 1                                               // Starts a counter at 1 which will add a number to each player on the highscore table
    for(var i = orderedHighScores.length-1; i >= 0; i--){   // iterates through the array backwards to reverse the order and list highest first
        if(k < 6){                                          // caps the max number of high score players at 5
            var j = document.createElement('p');            // initializes an API method that makes a p element
            j.textContent = k +": Name: " + orderedHighScores[i][0] + " - Score: " + orderedHighScores[i][1];       //adds the player name and score to that p element 
            j.setAttribute('class', 'border m1 rounded border-success');                            // applies bootstrap styling
            cardPointer.append(j);                                                 //appends the p element to the highscore table
            k++;                                                                    //increments player number
        }
    }
    restartBtn.textContent = "Go back";                                         
    cardPointer.append(restartBtn);                         // I resused the restart button dynamic element since the "go back" button is functionally identical

}

highScoreBtn.addEventListener('click', loadHighScoreTable);     //event listener for loading the highscore screen
startBtn.addEventListener('click', startQuiz);       // Event listener for the 'start quiz' button which runs the main script
restartBtn.addEventListener('click', function(){    // Event listener for the restart button (or the go back button) which reloads the page
    location.reload();
});