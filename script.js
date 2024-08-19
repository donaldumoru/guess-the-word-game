'use strict';

let displayWord = document.querySelector('.word-display');
let displayHint = document.querySelector('.hint');
let displayChances = document.querySelector('.chances');
let submitButton = document.querySelector('.submit-guess');
let playAgainButton = document.querySelector('.play-again');
let displayAlert = document.querySelector('.alert');
let userGuessInput = document.querySelector('.user-guess');
let displayWordLength = document.querySelector('.word-length');
let singlePlayerButton = document.querySelector('.single-player');
let twoPlayerButton = document.querySelector('.two-players');
let saveWordButton = document.querySelector('.save-word');
let gameChoice = document.querySelector('.game-choice');
let opponentInput = document.querySelector('.opponent-input');

playAgainButton.style.display = 'none';
opponentInput.style.display = 'none';
userGuessInput.style.display = 'none';
submitButton.style.display = 'none';
let wordToGuess = '';
let underscoreWord = '';

let userChances = 3;

function playOpponent() {
  gameChoice.style.display = 'none';
  opponentInput.style.display = 'block';
}

function inputWordAndHint() {
  let opponentWordInput = document.querySelector('.opponent-word');
  let opponentHintInput = document.querySelector('.opponent-hint');
  let opponentWord = opponentWordInput.value.toUpperCase();
  let opponentHint = opponentHintInput.value;
  displayChances.textContent = `Chances: ${userChances}`;

  userGuessInput.style.display = 'block';
  submitButton.style.display = 'block';

  wordToGuess = opponentWord;

  displayHint.textContent = `Hint: ${opponentHint}`;

  opponentWordInput.value = '';
  opponentHintInput.value = '';
  opponentInput.style.display = 'none';

  function turnLettersToUnderscore() {
    // underscoreWord = [];
    // for (const letter of wordToGuess) {
    //   if (letter !== '_') {
    //     underscoreWord.push('_');
    //   }
    // }

    for (const letter of wordToGuess) {
      if (letter !== '_') {
        underscoreWord += '_';
      }
    }

    underscoreWord = underscoreWord.split('');
    displayWordLength.textContent = `Word Length: ${wordToGuess.length}`;
    displayWord.textContent = underscoreWord.join('');
  }

  turnLettersToUnderscore();

  return wordToGuess;
}

function playComputer() {
  gameChoice.style.display = 'none';
  computerRoute();
}

function computerRoute() {
  userGuessInput.style.display = 'block';
  submitButton.style.display = 'block';
  displayChances.textContent = `Chances: ${userChances}`;

  function generateRandomWord() {
    const wordsArr = [
      'aardvark',
      'acrobat',
      'adventure',
      'amethyst',
      'annihilate',
      'astronaut',
      'balloon',
      'bicycle',
      'blueprint',
      'breezy',
      'carousel',
      'chemistry',
      'chocolate',
      'cosmos',
      'creature',
      'dinosaur',
      'dolphin',
      'dragonfly',
      'dreamscape',
      'eclectic',
      'elephant',
      'emerald',
      'escalator',
      'fairy',
      'fascinate',
      'fireworks',
      'frosty',
      'gadget',
      'gargoyle',
      'giraffe',
      'glitter',
      'hello',
      'hologram',
      'holograph',
      'horizon',
      'hummingbird',
      'iceberg',
      'igloo',
      'imagine',
      'infinity',
      'jazz',
      'jellyfish',
      'jigsaw',
      'jungle',
      'kaleidoscope',
      'kitchen',
      'kiwi',
      'labyrinth',
      'lantern',
      'lemonade',
      'leprechaun',
      'marshmallow',
      'mosaic',
      'mystery',
      'mystical',
      'nebula',
      'nightmare',
      'nocturnal',
      'ocean',
      'octopus',
      'opera',
      'orchid',
      'parade',
      'penguin',
      'penguin',
      'puzzle',
      'quasar',
      'quicksand',
      'quilt',
      'rainbow',
      'raindrop',
      'robot',
      'robotic',
      'sapphire',
      'seashell',
      'snowflake',
      'sunshine',
      'telescope',
      'tinker',
      'tornado',
      'tropical',
      'umbrella',
      'unicorn',
      'universe',
      'velvet',
      'volcano',
      'vortex',
      'vortex',
      'whirlpool',
      'whistle',
      'wizard',
      'wonder',
      'xenon',
      'xylophone',
      'yacht',
      'yarn',
      'yoga',
      'zebra',
      'zenith',
      'zeppelin',
    ];

    displayWord.textContent = '';
    let wordToGuess = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    return wordToGuess;
  }

  function getWordHint(word) {
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(response => response.json())
      .then(data => {
        const [obj] = data;
        const { meanings } = obj;
        const [definitionsObj] = meanings;
        const { definitions } = definitionsObj;
        const [definitionOne] = definitions;
        const { definition } = definitionOne;

        return definition;
      })
      .catch(err => console.error(err));
  }

  wordToGuess = generateRandomWord();

  getWordHint(wordToGuess).then(definition => {
    function turnLettersToUnderscore() {
      for (const letter of wordToGuess) {
        if (letter !== '_') {
          underscoreWord += '_';
        }
      }

      displayWordLength.textContent = `Word Length: ${wordToGuess.length}`;
      displayWord.textContent = underscoreWord;
      displayHint.textContent = `Hint: ${definition}`;
      wordToGuess = wordToGuess.toUpperCase();
      underscoreWord = underscoreWord.split('');
    }

    turnLettersToUnderscore();
  });

  return wordToGuess;
}

const guessLogic = function () {
  let userGuessInput = document.querySelector('.user-guess');
  let userGuess = userGuessInput.value.toUpperCase();

  if (!userGuess || userGuess === ' ') {
    displayAlert.textContent = 'Please enter a guess';
  } else if (underscoreWord.includes(userGuess)) {
    displayAlert.textContent = `You already guessed '${userGuess}'`;
  } else {
    const incorrectMessages = [
      `Oops! "${userGuess}" isn't right. Try another letter!`,
      `Not quite! "${userGuess}" is incorrect. Give it another shot!`,
      `Uh-oh! "${userGuess}" doesn't match. Keep guessing!`,
      `Sorry, "${userGuess}" is wrong. Try again!`,
      `Nope! "${userGuess}" is not the correct letter. Keep going!`,
    ];

    const correctMessages = [
      `Great job! "${userGuess}" is spot on! Keep it up!`,
      `Yes! "${userGuess}" is correct! You're doing well!`,
      `Nice work! "${userGuess}" is right! Let's keep going!`,
      `Awesome! "${userGuess}" is a match! Keep the momentum!`,
    ];

    if (!wordToGuess.includes(userGuess)) {
      userChances--;
      displayChances.textContent = `Chances: ${userChances}`;
      displayAlert.textContent =
        incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
    } else if (wordToGuess.includes(userGuess)) {
      for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === userGuess) {
          underscoreWord[i] = userGuess;
        }
      }
      displayWord.textContent = underscoreWord.join('');
      displayAlert.textContent =
        correctMessages[Math.floor(Math.random() * incorrectMessages.length)];
    }
  }

  if (userChances === 0) {
    displayWord.textContent = `The word is ${wordToGuess}`;
    showGameOver();
    return;
  }

  if (wordToGuess === underscoreWord.join('')) {
    showWin();
  }

  userGuessInput.value = '';
};

function saveEnter(e) {
  if (e.key === 'Enter') inputWordAndHint();
}

function enterKey(e) {
  if (e.key === 'Enter') guessLogic();
}

const showGameOver = function () {
  submitButton.style.display = 'none';
  displayHint.textContent = 'Game Over';
  userGuessInput.style.display = 'none';
  playAgainButton.style.display = 'block';
  displayAlert.style.display = 'none';
  return;
};

const showWin = function () {
  displayHint.textContent = 'You Win!';
  submitButton.style.display = 'none';
  playAgainButton.style.display = 'block';
  displayAlert.textContent = '';
  userGuessInput.style.display = 'none';
  displayWordLength.textContent = '';
};

const playAgain = function () {
  playAgainButton.style.display = 'none';
  userChances = 3;
  submitButton.style.display = 'block';
  userGuessInput.style.display = 'block';
  userGuessInput.value = '';
  gameChoice.style.display = 'block';
  underscoreWord = [];
  displayWord.textContent = '';
  displayWordLength.textContent = '';
  displayHint.textContent = '';
  userGuessInput.style.display = 'none';
  submitButton.style.display = 'none';
  displayChances.textContent = `Chances: ${userChances}`;
};

playAgainButton.addEventListener('click', playAgain);
submitButton.addEventListener('click', guessLogic);
userGuessInput.addEventListener('keydown', enterKey);
opponentInput.addEventListener('keydown', saveEnter);
saveWordButton.addEventListener('click', inputWordAndHint);
singlePlayerButton.addEventListener('click', playComputer);
twoPlayerButton.addEventListener('click', playOpponent);
