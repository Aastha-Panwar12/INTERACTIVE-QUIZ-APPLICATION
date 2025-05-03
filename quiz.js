const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

// Make an array of objects that stores question, choices of question and answer 
const quiz = [
    {
        question: "Q. Which of the following is used to create web pages?",
        choices: ["HTML", "C", "CSS","JVM" ],
        answer: "HTML"
    },
    {
        question: "Q. Which of the following is not an example of browser?",
        choices: ["Netscape Navigator", "Microsoft Bing", "Mozilla Firefox", "Opera"],
        answer: "Microsoft Bing"
    },
    {
        question: "Q. Who invented World Wide Web(WWW)?",
        choices: ["Blaise Pascal", "Charles Babbage", "Herman Hollerith", "Tim Berners-Lee"],
        answer: "Tim Berners-Lee"  
    },
    {
        question: "Q. In CSS, how would you create a block-level elemet horizontally within its parent container?",
        choices: ["margin: auto;", "text-align: center;", "position: center;", "align: middle;"],
        answer: "margin: auto;"
    },
    {
        question: "Q. What is the default value of the position property in CSS?",
        choices: ["Relative", "Absolute", "Fixed", "Static"],
        answer: "Static"
    },
    {
        question: "Q. What HTML attribute is used to define inline Javascript?",
        choices: ["Onclick", "Onload", "Script", "href"],
        answer: "Onclick"
    },
    {
        question: "Q. Which of the following in not a Javascript data type?",
        choices: ["String", "Boolean", "Object", "Float"],
        answer: "Float"
    },
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["Margin", "Padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a javascript data types?",
        choices: ["Null type", "Undefined type", "Number type", "All of these"],
        answer: "All of these"
    },
    {
        question: "Q. Which of the following is not a framework?",
        choices: ["JavaScript.NET", "JavaScript", "Cocoa JS", "jQuery"],
        answer: "JavaSript"
    }
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    questionDetails.choices.forEach(choice => {
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = choice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            document.querySelectorAll('.choice').forEach(div => div.classList.remove('selected'));
            choiceDiv.classList.add('selected');
        });
    });

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        displayAlert('Correct Answer!');
        score++;
    } else {
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent =  "";
    choicesBox.textContent = "";
    scoreCard.textContent = 'You Scored ${score} out of ${quiz.length}!';
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Functionto show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
}

// Function to start Timer
const startTimer = () => {
    clearInterval(timerID); //Check for any existing timers
    timer.textContent = timeLeft;

    timerID = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerID);
            const confirmUser = confirm("Time Up!!! Do you want to play quiz again?");
            if (confirmUser) {
                timeLeft = 15;
                startQuiz();
            } else {
                startBtn.style.display = "block";
                container.style.display = "none";
            }
        }
   }, 1000);
}

// Function to stop Timer
const stopTimer = () => {
    clearInterval(timerID);
}

// Function to shuffle questions
const shuffleQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1 ));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

//Function to start Quiz
const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

//Adding Event Listener to Start Button
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        displayAlert("select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    } else {
        checkAnswer();
    }
});
