const start = document.getElementById('start');
const quiz = document.getElementById('quiz');
const question = document.getElementById('question');
const qImg = document.getElementById('qImg');
const choiceA = document.getElementById('A');
const choiceB = document.getElementById('B');
const counter = document.getElementById('counter');
const timeGauge = document.getElementById('timeGauge');
const progress = document.getElementById('progress');
const scoreDiv = document.getElementById('scoreContainer');

let questions = [
  {
    question: 'Cows have best friends',
    imgSrc: 'img/cow.jpg',
    choiceA: 'True',
    choiceB: 'False',
    // choiceC: 'Correct',
    correct: 'A'
  },
  {
    question: 'Dogs see in black and white',
    imgSrc: 'img/dog.jpg',
    choiceA: 'True',
    choiceB: 'False',
    // choiceC: 'Wrong',
    correct: 'B'
  },
  {
    question: 'We only use 10% of our brains',
    imgSrc: 'img/brain.jpg',
    choiceA: 'True',
    choiceB: 'False',
    // choiceC: 'Wrong',
    correct: 'B'
  },
  {
    question: 'Shaving facial hair increases its rate of growth?',
    imgSrc: 'img/hair.jpg',
    choiceA: 'True',
    choiceB: 'False',
    // choiceC: 'Correct',
    correct: 'B'
  },

  {
    question: 'All sushi is raw fish',
    imgSrc: 'img/sushi.jpg',
    choiceA: 'True',
    choiceB: 'False',
    // choiceC: 'Correct',
    correct: 'A'
  }
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let score = 0;
let TIMER;

function renderQuestion() {
  let q = questions[runningQuestion];

  qImg.innerHTML = '<img src =' + q.imgSrc + '>';
  question.innerHTML = '<p>' + q.question + '</p>';
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  // choiceC.innerHTML = q.choiceC;
}

start.addEventListener('click', startQuiz);
function startQuiz() {
  start.style.display = 'none';
  renderQuestion();
  quiz.style.display = 'block';
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000);
}

function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + '></div>';
  }
}

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + 'px';
    count++;
  } else {
    count = 0;
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      clearInterval(TIMER);
      scoreRender();
      quiz.style.display = 'none';
    }
  }
}

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    score++;
    answerIsCorrect();
  } else {
    answerIsWrong();
  }
  count = 0;

  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    clearInterval(TIMER);
    scoreRender();
    quiz.style.display = 'none';
  }
}

function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = 'green';
}

function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = 'red';
  let q = questions[runningQuestion];
  // if ('A' === q.correct) {
  //   document.getElementById('A').style.backgroundColor = 'green';
  // } else if ('B' === q.correct) {
  //   document.getElementById('A').style.backgroundColor = 'green';
  // }
}
function scoreRender() {
  scoreDiv.style.display = 'block';
  const scorePercent = Math.round((100 * score) / questions.length);
  let img =
    scorePercent >= 80
      ? 'img/5.png'
      : scorePercent >= 60
      ? 'img/4.png'
      : scorePercent >= 40
      ? 'img/3.png'
      : scorePercent >= 20
      ? 'img/2.png'
      : scorePercent >= 80
      ? 'img/5.png'
      : 'img/1.png';

  // scoreDiv.innerHTML = '<img src=' + img + '>';
  // scoreDiv.innerHTML = '<p>' + scorePercent + '</p>';
  if (scorePercent < 60) {
    scoreDiv.innerHTML =
      '<p class=your-score> You scored ' +
      scorePercent +
      '% <br><span class= "your-score">You silly goose :) </span></></p>';
  } else if (scorePercent > 60) {
    scoreDiv.innerHTML =
      '<p> You scored ' +
      scorePercent +
      '%!!<br><span> Smarty Pants </span></></p>';
  }
}
