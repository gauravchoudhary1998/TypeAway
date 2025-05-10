// Globals

let time = 5;
let score = 0;
let isPlaying;
// let endtime = 3;

// DOM Elements
const leadTime = document.querySelector('#lead-time');
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const level = document.querySelector('#level');
const model = document.querySelector('#model');
const modelHeader = document.querySelector('#model-header');
const overlay = document.querySelector("#overlay");
const highscore = document.querySelector('#highscore');

wordInput.addEventListener('click', init);

if(sessionStorage.getItem("highscore") != undefined){
    highscore.innerHTML = sessionStorage.getItem("highscore");
}else{
    highscore.innerHTML = 0;
}

let words = [
  'hat','river','lucky','statue','generate','stubborn','cocktail','runaway','joke','developer',
  'establishment','hero','javascript','nutrition','revolver','echo','siblings','investigate','horrendous',
  'symptom','laughter','magic','master','space','definition','paddle',"answer","awesome","distance",
  "fertile","wakeful","belief","slippery","bizarre","learned","pop","mix","pin","hill",
  "wiry","dirt","snapshot", "delicate", "humming", "thunder", "flamingo", "reaction", "backpack",
  "graceful", "keyboard", "strategy","magnetic", "scribble", "fragment", "triangle", "homeland",
  "simplify", "observer", "mountain", "elevator", "polishing","whispers", "lantern", "playful", "printer",
  "optimize", "necklace", "solution", "bicycle", "paradise", "operator","freckles", "charming", "building",
  "traveler", "scenario", "response", "velocity", "hospital", "sandwich", "floating","explorer",
  "slippery", "sunflower", "crossword", "backspace", "foundation", "creativity", "successful", "technology",
  "everything","adventure", "background", "handshake", "brainstorm", "chocolate", "assumption",
  "journalist", "narrative", "relationship", "marketplace",
];

// backup words
const backupWords = words.slice(0);

// let usedWords = [];

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
    showWord(words);
    wordInput.value = '';
    score++;
    setLevel();
    setHighscore();
  }
    scoreDisplay.innerHTML = score;
}


function setLevel() {
  let newLevel = '';
  let newTime = 5;

  if (score < 100) {
    newLevel = 'EASY';
    newTime = 5;
  } else if (score < 200) {
    newLevel = 'MEDIUM';
    newTime = 4;
  } else if (score < 300) {
    newLevel = 'HARD';
    newTime = 3;
  } else if (score === 300) {
    endgame();
    return; 
  }

  // Update level and time only if they change
  if (level.innerHTML !== newLevel) {
    level.innerHTML = newLevel;
    leadTime.innerHTML = newTime.toString();
    level.className = newLevel.toLowerCase();
  }

  time = newTime;
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
  // Check if words array is empty
  if (words.length === 0) {
    words.push(...backupWords); // Reset words array
  }
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word 
  currentWord.innerHTML = words[randIndex];
  // Remove word from array to avoid repetition
  words.splice(randIndex, 1);
  console.log(words);
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
   modelHeader.innerHTML = "Game Over!!";
   openmodel();
}

function endgame(){
  wordInput.blur();
  wordInput.value = "";
  document.querySelector('#hs').innerHTML = `Your score is ${score}`;
  modelHeader.innerHTML = "You Win!!";
  time = 5;
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