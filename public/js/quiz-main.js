const { quizData, question } = require("../../data/quiz-data");

var startBtn = document.querySelector(".start-btn");
var nextBtn = document.querySelector(".next-btn");
var questionsE = document.querySelector(".question");
var answersContainer = document.querySelector("q-container");
var quizTitile = document.querySelector(".quiz-title");
var correctCount = document.querySelector(".correct-count");

let currentQuestion = 0;
let correct = 0;

window.addEventListener("load", () => {
    quizTitile.innerHTML = quizData.title;
});

startBtn.addEventListener("click", () => {
    startQuiz();
});

nextBtn.addEventListener("click", () => {
    loadQuestion(currentQuestion);
});

function startQuiz() {
    startBtn.classList.add("hide");
    nextBtn.classList.remove("hide");
    questionsE.classList.remove("hide");
    answersContainer.classList.remove("hide");
    loadQuestion(currentQuestion);
}

function loadQuestion(questionNum) {
    if(currentQuestion == questions.length) {
        startBtn.classList.remove("hide");
        nextBtn.classList.add("hide");
        questionsE.classList.add("hide");
        answersContainer.classList.add("hide");
        startBtn.innerHTML = "Restart";
        correctCount.innerHTML = `Correct: ${correct}/${questions.length}`;
        correct = 0;
        currentQuestion = 0;
    }
    else {
        while(answersContainer.firstChild) {
            answersContainer.removeChild(answersContainer.firstChild);
        }
        answersContainer.dataset.type = null;
        questionsE.innerHTML = questions[questionNum].text;

        if(questions[questionNum].type === "mc") {
            var bntGrid = document.createElement("div");
            answersContainer.appendChild(bntGrid);
            questions[questionNum].answers.forEach((answer) => {
                var anserElement = document.createElement("button");
                bntGrid.classList.add("btn-grid");
                anserElement.innerHTML = answer.text;
                anserElement.dataset.correct = answer.correct;
                anserElement.addEventListener("click", (e) => {
                    Array.from(bntGrid.children).forEach(
                        (element) => (element.disabled = true)
                    );
                    e.target.dataset.clicked = "true";
                    checkAnser();
                });
                bntGrid.appendChild(anserElement);
            });

            answersContainer.dataset.type = "mc";
        } else if(questions[questionNum].type === "txt") {
            var inputElement = document.createElement("input");
            var checkBtn = document.createElement("button");
            checkBtn.innerHTML = "Check";
            checkBtn.classList.add("check-btn");
            checkBtn.addEventListener("click", (e) =>{
                checkAnser();
            });
            answersContainer.appendChild(inputElement);
            answersContainer.appendChild(checkBtn);
            answersContainer.dataset.type = "txt";
        }
    }
}