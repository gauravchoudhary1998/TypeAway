// Globals

let time = 5;
let score = 0;
let isPlaying;
let endtime = 3;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const model = document.querySelector('#model');
const overlay = document.querySelector("#overlay");
const highscore = document.querySelector('#highscore');

wordInput.addEventListener('click', init);

if(sessionStorage.getItem("highscore") != undefined){
    highscore.innerHTML = sessionStorage.getItem("highscore");
}else{
    highscore.innerHTML = 0;
}

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition',
  'paddle',
  "answer",
  "awesome",
  "distance",
  "fertile",
  "wakeful",
  "belief",
  "slippery",
  "bizarre",
  "learned",
  "pop",
  "mix",
  "fix",
  "hot",
  "pin",
  "hill",
  "wiry",
  "dirt",
];

// Initialize Game
function init() {
  
  wordInput.placeholder= '';
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
   setInterval(checkStatus, 1000);
}

// Start matching
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = 5;
    showWord(words);
    wordInput.value = '';
    score++;
    setHighscore();
  }
    scoreDisplay.innerHTML = score;
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {

    return true;
  } else {
    //message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word 
  if(currentWord.innerHTML === words[randIndex]){
      showWord(words);
  }
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time does not run out
  if (time > 0) {
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}
//Set Highscore
function setHighscore(){
    if(score > sessionStorage.getItem("highscore")){
        sessionStorage.setItem("highscore",score);
        highscore.innerHTML =  score; 
    }
}


function gameover(){
   document.querySelector('#hs').innerHTML = `Your score is ${score}`;
   openmodel();
}

function openmodel(){
model.classList.add('active');
overlay.classList.add('active');
}

function closemodel(){
  model.classList.remove('active');
  overlay.classList.remove('active');
}

//Restart Game
function restart(){
    closemodel();
    location.reload();
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    wordInput.blur();
    wordInput.value = "";
    gameover();
  }
}