const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let answered = false; // Add this after your variable declarations
let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
    document.getElementById('right-answers').innerText = quizScore;
}

function setNextQuestion() {
    resetState();
    answered = false; // Reset the answered state for the new question
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}


function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}


function selectAnswer(e) {
    if (answered) return; // Prevent further clicks

    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    // Mark the question as answered
    answered = true;

    // Set the status class for the selected answer and the body
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);

        // Disable all buttons after an answer is selected
        button.disabled = true;
    });

    if (correct === "true") {
        quizScore++;
    }

    if (shuffledQuestions.length > currectQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }

    document.getElementById("right-answers").innerText = quizScore;
}

// Reset the `answered` variable in `setNextQuestion

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Which one of these is a JavaScript framework?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Eclipse', correct: false },
        ],
    },
    {
        question: 'Who is the Prime Minister of India?',
        answers: [
            { text: 'Narendra Modi', correct: true },
            { text: 'Rahul Gandhi', correct: false },
        ],
    },
    {
        question: 'What is 4 * 3?',
        answers: [
            { text: '6', correct: false },
            { text: '12', correct: true },
        ],
    },
    {
        question: 'What is Capital of India?',
        answers: [
            { text: 'Delhi', correct: false },
            { text: 'New Delhi', correct: true },
            { text: 'Maharastra', correct: false},
            { text: 'Haryana', correct: false}
        ],
    },
    {
        question: 'What is 100000000*798563?',
        answers: [
            { text: '8.98657e', correct: false },
            { text: '7.98563e', correct: true },
        ],
    },
];
