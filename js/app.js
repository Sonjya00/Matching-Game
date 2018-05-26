//LET & CONST
const DECK = document.getElementById('deck');
const CARDS = document.getElementsByClassName('card');
const MATCHED_COUPLE_DISPLAY = document.getElementById('matchedCoupleDisplay');
const MOVES_NUMBER_DISPLAY = document.getElementById('movesNumberDisplay');
const RESTART_BUTTON = document.getElementById('restartButton');
const PREVIOUS_SCORE_TABLE = document.getElementById('previous-score__table');
const PREVIOUS_SCORE_CNT = document.getElementById('previous-score__container');
const STAR_2= document.getElementById('star2');
const STAR_3= document.getElementById('star3');
const MODAL = document.getElementById('gameModal');
const ESCAPE_MODAL_BTN = document.getElementsByClassName('modal__close-btn')[0];
const RESTART_MODAL_BTN = document.getElementsByClassName('modal__restart-btn')[0];

let openCardsHC = document.getElementsByClassName('open show');
let toBeReflippedHC = document.getElementsByClassName('toBeReflipped');
let matchCardsHC = document.getElementsByClassName('match');
let modalMsg = document.getElementById('modalMsg');
let movesNumber = 0;
let matchedCouplesNumber = 0;
let starRating = 3;
let matchNumber = 1;

//TIMER
let sec = 0;
function myInterval() {
  sec++;
  document.getElementById('secondsElapsed').textContent = sec;
}
let timer = setInterval(myInterval, 1000);

//Called to start the 1st game.
//Call function to shuffle cards and create HTML to display the cards on the board.
function newGame() {
  let cardsList = Array.prototype.slice.call(CARDS);
  cardsList = shuffle(cardsList);
  for (let i = 0; i < cardsList.length; i++) {
    DECK.appendChild(cardsList[i]);
  }
}
newGame();

//Called from the 2nd game on.
//Call newGame function, reset timer, open/shown/matched cards,
//move no., matched cards no., star rating and star displayed
//Increase game # and restart timer.
function restartGame() {
  newGame();
  DECK.classList.add('shake-to-shuffle');

  clearInterval(timer);
  sec = 0;
  document.getElementById('secondsElapsed').textContent = sec;
  timer = setInterval(myInterval, 1000);

  if (matchCardsHC.length > 0 || openCardsHC.length > 0) {
    resetCards();
  }

  if (movesNumber !== 0) {
    movesNumber = 0;
    MOVES_NUMBER_DISPLAY.textContent = movesNumber;
  }
  if (matchedCouplesNumber !== 0) {
    matchedCouplesNumber = 0;
    MATCHED_COUPLE_DISPLAY.textContent = matchedCouplesNumber;
  }

  starRating = 3;
  STAR_2.className = 'fa fa-star star';
  STAR_3.className = 'fa fa-star star';

  matchNumber++;

  setTimeout(removeDeckShuffleClass, 1200);
}

//Remove the shuffle class from deck, to reapply it next time restart is clicked.
function removeDeckShuffleClass() {
  DECK.classList.remove('shake-to-shuffle');
}

//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//Called if game is restart.
//Remove .open/show/match class to all matched cards and adds .closed.
function resetCards() {
  let openCardsArray = Array.prototype.slice.call(openCardsHC);
  openCardsArray.forEach(function(card) {
    card.classList.add('closed');
    card.classList.remove('open', 'show');
  });
  let matchCardsArray = Array.prototype.slice.call(matchCardsHC);
  matchCardsArray.forEach(function(card) {
    card.classList.add('closed');
    card.classList.remove('match');
  });
}

//Flip cards, removes .closed and adds .open/show. Store cards symbols in an array.
//If 2 cards are open, run check matching cards function.
//Prevent more than 2 cards from being flipped.
function flipCard(evt) {

  let flippedCard = evt.target;
  if (flippedCard.nodeName === 'LI') {
    if (!flippedCard.classList.contains('match') && !flippedCard.classList.contains('open')) {
      flippedCard.classList.remove('closed');
      flippedCard.classList.add('open', 'show');
    }
  }

  let openCardsArray = Array.prototype.slice.call(openCardsHC);
  if (openCardsArray.length === 2) {
    checkIfMatching();
  }

  if (openCardsArray.length > 2) {
    flipOpenCards();
  }
}

//Called when 2 cards are .open/shown.
//If they are a matching pair, make them .match and not .open/.show,
//Add +1 matching couple found, add +1 move.
//Check no. moves to adjust star rating, then check if player has won.
//If they are not a matching pair, add a temporary class to identity which cards need to be closed.
//Add +1 matching couple found, add +1 move, and check moves no. / star rating.
//Then call function to close non-matching cards.
function checkIfMatching() {

  let openCardsArray = Array.prototype.slice.call(openCardsHC);
  if (openCardsArray[0].classList[1] === openCardsArray[1].classList[1]) {
    turnIntoMatched(openCardsArray);
    incrementMovesNumber();
    setTimeout(checkMovesNumber, 300);
    setTimeout(checkIfGameOver, 500);

  } else {
    openCardsArray.forEach(function(card) {
      card.classList.add('toBeReflipped');
    });
    incrementMovesNumber();
    setTimeout(checkMovesNumber, 300);
    setTimeout(flipOpenCards, 800);
  }
}

//Called to both flip up and flip down cards.
//Close the 2 cards confronted and any other open card,
//preventing there to be more than 1 open card besides the matched ones.
function flipOpenCards() {
  let toBeReflipped = Array.prototype.slice.call(toBeReflippedHC);
  toBeReflipped.forEach(function(card) {
    card.classList.add('closed');
    card.classList.remove('open', 'show', 'toBeReflipped');
  });
}

//Add .match, remove .open/show class to the matched pair,
//add +1 matched couple.
function turnIntoMatched(card) {
  card.forEach(function(card) {
    card.classList.add('match');
    card.classList.remove('open', 'show');
  });
  matchedCouplesNumber++;
  MATCHED_COUPLE_DISPLAY.textContent = matchedCouplesNumber;
}

//Increment moves no. and display it
function incrementMovesNumber() {
  movesNumber++;
  MOVES_NUMBER_DISPLAY.textContent = movesNumber;
}

//Check moves no. to change star rating.
function checkMovesNumber() {
  if (movesNumber > 14 && movesNumber <= 18) {
    starRating = 2.5;
    toHalfOStar(STAR_3);
  } else if (movesNumber > 18 && movesNumber <= 22) {
    starRating = 2;
    toOStar(STAR_3);
  } else if (movesNumber > 22 && movesNumber <= 26) {
    starRating = 1.5;
    toHalfOStar(STAR_2);
  } else if (movesNumber > 26) {
    starRating = 1;
    toOStar(STAR_2);
  }
}

//Deplete half star.
function toHalfOStar(star) {
  star.classList.remove('fa-star');
  star.classList.add('fa-star-half-o');
}

//Deplete whole star.
function toOStar(star) {
  star.classList.remove('fa-star-half-o');
  star.classList.add('fa-star-o');
}

//Check if all pairs have been matched.
//If so, call function to calculate star rating, record last score,
//return modal containing game stats, stops timer.
function checkIfGameOver() {
  let matchCardsArray = Array.prototype.slice.call(matchCardsHC);
  if (matchCardsArray.length === 16) {
    setModalMsg();
    recordLastScore();
    MODAL.style.display = 'block';
    clearInterval(timer);
  } else {
    return;
  }
}

//Returns a message in the modal based on the star rating.
function setModalMsg() {
  let commentMsg;
  let gameStatsMsg;
  switch (starRating) {
    case 3:
    commentMsg = '<h3>YOU WON THE GAME!!</h3><p>You have amazing memory skills!! Top score!!</p>';
    break;
    case 2.5:
    commentMsg = '<h3>YOU WON THE GAME!!</h3><p>You have good memory skills!!</p>';
    break;
    case 2:
    commentMsg = '<h3>YOU WON THE GAME!!</h3><p>Good job at matching those cards!!</p>';
    break;
    case 1.5:
    commentMsg = '<h3>YOU WON THE GAME!!</h3><p>Keep playing and training to get a better score!!</p>';
    break;
    case 1:
    commentMsg = '<h3>YOU WON THE GAME!!</h3><p>You can do better! Try completing the game with less moves next time!!</p>';
    break;
    }
  gameStatsMsg = '<p><strong>Time elapsed:</strong> ' + sec + ' seconds</p>' + '<p><strong>Total moves:</strong> ' + movesNumber +'</p>';
  if (starRating >= 2) {
    gameStatsMsg += '<p><strong>Your rating:</strong> ' + starRating + ' stars</p>';
  } else if (starRating <= 1.5) {
    gameStatsMsg += '<p><strong>Your rating:</strong> ' + starRating + ' star</p>';
  }
  modalMsg.innerHTML = commentMsg + gameStatsMsg;
}

//Create a row on the Previous Score table to record game stats in case of victory.
function recordLastScore() {
  let newLineScore = '<tr><td>' + matchNumber + '</td><td>' + sec + ' sec</td><td>' + movesNumber + '</td><td>' + starRating + '</td></tr>';
PREVIOUS_SCORE_TABLE.insertAdjacentHTML('beforeend', newLineScore);
PREVIOUS_SCORE_CNT.style.display = 'block';
}

//EVENT LISTENERS
DECK.addEventListener('click', flipCard, false);
RESTART_BUTTON.addEventListener('click', restartGame, false);

//MODAL

//Close the modal and restart the game when the player clicks on Restart.
RESTART_MODAL_BTN.onclick = function() {
  MODAL.style.display = 'none';
  restartGame();
};

//Close the modal when the player clicks on the cross button.
ESCAPE_MODAL_BTN.onclick = function() {
  MODAL.style.display = 'none';
};

//Close the modal when the player clicks anywhere outside of it.
window.onclick = function(event) {
  if (event.target == MODAL) {
    MODAL.style.display = 'none';
  }
};
