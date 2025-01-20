const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let answered = false; // Prevent multiple clicks
let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); // Shuffle questions
    currentQuestionIndex = 0;
    quizScore = 0; // Reset score
    document.getElementById('right-answers').innerText = quizScore; // Reset score display
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    answered = false; // Reset the answered state
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
    if (answered) return; // Prevent further clicks on this question

    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true"; // Ensure boolean comparison

    answered = true; // Mark the question as answered

    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct === "true");

        // Disable all buttons after selection
        button.disabled = true;
    });

    if (correct) {
        quizScore++;
    }

    document.getElementById('right-answers').innerText = quizScore;

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide'); // Show "Next" button
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove('hide'); // Show "Restart" button
    }
}

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
            { text: 'Maharashtra', correct: false },
            { text: 'Haryana', correct: false },
        ],
    },
    {
        question: 'What is 100000000 * 798563?',
        answers: [
            { text: '8.98657e', correct: false },
            { text: '7.98563e', correct: true },
        ],
    },
];
