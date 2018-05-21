//LET & CONST

const deck = document.getElementById('deck');
const cards = document.getElementsByClassName('card');
const matchedCoupleDisplay = document.getElementById('matchedCoupleDisplay');
const movesNumberDisplay = document.getElementById('movesNumberDisplay');
const restartButton = document.getElementById('restartButton');

const allStarsHC = document.getElementsByClassName('star');
const allStarsArray = Array.prototype.slice.call(allStarsHC);
const star1= document.getElementById('star1');
const star2= document.getElementById('star2');
const star3= document.getElementById('star3');

let openCardsHC = document.getElementsByClassName('open show');
let toBeReflippedHC = document.getElementsByClassName('toBeReflipped');
let matchCardsHC = document.getElementsByClassName('match');
let movesNumber = 0;
let matchedCouplesNumber = 0;
let starRating = 3;

//TIMER
let sec = 0;
function myInterval() {
  sec++;
  document.getElementById('secondsElapsed').textContent = sec;
}
let timer = setInterval(myInterval, 1000);

//Call function to shuffle cards and create HTML to display the cards
function newGame() {
  let cardsList = Array.prototype.slice.call(cards);
  cardsList = shuffle(cardsList);
  for (var i = 0; i < cardsList.length; i++) {
    deck.appendChild(cardsList[i])
    //cardsList[i].setAttribute("id", i);
  };
}
newGame();

//Calls newGame function, reset timer, reset open/shown/matched cards, reset move number and matched cards number, reset star rating.
function restartGame() {
  newGame();

  clearInterval(timer);
  sec = 0;
  document.getElementById('secondsElapsed').textContent = sec;
  timer = setInterval(myInterval, 1000);

  if (matchCardsHC.length > 0 || openCardsHC.length > 0) {
    resetCards();
  };
  if (movesNumber !==0) {
    movesNumber = 0;
    movesNumberDisplay.textContent = movesNumber;
  }
  if (matchedCouplesNumber !== 0) {
    matchedCouplesNumber = 0;
    matchedCoupleDisplay.textContent = matchedCouplesNumber;
  }

  starRating = 3;
  allStarsArray.forEach(function(star) {
    star.className = "fa fa-star star";
  });
}

// Shuffle function from http://stackoverflow.com/a/2450976
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

//Flip cards, store open/shown cards images in an array, run check matching cards function, and prevent more than 2 cards from being flipped.
function flipCard(evt) {
  let flippedCard = evt.target;
  if (flippedCard.nodeName === 'LI') {
    if (!flippedCard.classList.contains('match') && !flippedCard.classList.contains('open')) {
      flippedCard.classList.add('open', 'show');
    }
  }
  let openCardsArray = Array.prototype.slice.call(openCardsHC);
  if (openCardsArray.length ===2) {
      checkIfMatching();
    }
    if (openCardsArray.length >2) {
      flipOpenCards();
    }
  }

//when 2 cards are open/shown, if their content match, assign class match, call function to unassign open/shown classes, add +1 matching couple found, call function to increment move by one and check if game is over. If they don't match, assign a temporary class to identity which cards need to be closed in case more than 2 cards were flipped, and call the function to close those 2 cards. In any case, the move number is incremented by one and the moves number is check to adjust star rating and to determine if game is over by max moves number reached
function checkIfMatching() {
  let openCardsArray = Array.prototype.slice.call(openCardsHC);
    if (openCardsArray[0].classList[1] === openCardsArray[1].classList[1]) {
      openCardsArray.forEach(function(card) {
        card.classList.add('match');
      });
      handleMatchedCards();
      incrementMatchedCouples();
      setTimeout(checkIfGameOver, 1000);
    } else {
      openCardsArray.forEach(function(card) {
        card.classList.add('toBeReflipped');
      });
      setTimeout(flipOpenCards, 1200);
      }
    incrementMovesNumber();
    setTimeout(checkMovesNumber, 500);
  }

//close the 2 cards confronted and any other open card, preventing there to be more than 1 open card besides the matched ones
function flipOpenCards() {
  let toBeReflipped = Array.prototype.slice.call(toBeReflippedHC);
  toBeReflipped.forEach(function(card) {
    card.classList.remove('open', 'show', 'toBeReflipped');
  });
  let openCardsArray = Array.prototype.slice.call(openCardsHC);
  if (openCardsArray.length>1) {
    openCardsArray.forEach(function(card) {
      card.classList.remove('open', 'show');
    });
  }
}

//remove open/show class to the matched couple
function handleMatchedCards() {
  let matchCardsArray = Array.prototype.slice.call(matchCardsHC);
  matchCardsArray.forEach(function(card) {
    card.classList.remove('open', 'show');
  });
}

//remove open/show/match class to all matched cards.
function resetCards() {
  let openCardsArray = Array.prototype.slice.call(openCardsHC);
  openCardsArray.forEach(function(card) {
      card.classList.remove('open', 'show');
  });
  let matchCardsArray = Array.prototype.slice.call(matchCardsHC);
  matchCardsArray.forEach(function(card) {
    card.classList.remove('match');
  });
}

//Increment moves number and display it
function incrementMovesNumber() {
  movesNumber++;
  movesNumberDisplay.textContent = movesNumber;
}

//Increment matched couple number and display it
function incrementMatchedCouples() {
  matchedCouplesNumber++;
  matchedCoupleDisplay.textContent = matchedCouplesNumber;
}

//Check if all the couples have been matched, return alert according to star rating, stops timer
function checkIfGameOver() {
  let matchCardsArray = Array.prototype.slice.call(matchCardsHC);
  let alertMessage;
  let gameStatsMessage = '\nTime elapsed: ' + sec + ' seconds' + '\nTotal moves: ' + movesNumber + '\nYour rating: ' + starRating + ' stars';
  if (matchCardsArray.length === 16) {
    if (starRating === 3) {
      alertMessage = 'You won! You have amazing memory skills!!';
    } else if (starRating === 2.5) {
      alertMessage = 'You won! You have good memory skills!!';
    } else if (starRating === 2) {
      alertMessage = 'You won! Good job!!';
    } else if (starRating === 1.5) {
      alertMessage = 'You won! Keep exercising to improve your memory skills!!';
    } else if (starRating === 1) {
      alertMessage = 'You won! Try finding the matching cards with less moves next time!!';
    } else if (starRating === 0.5) {
      alertMessage = 'You were close to the maximum number of moves... But you won!!';
    }
    alert(alertMessage + gameStatsMessage);
    clearInterval(timer);
  }
}

//Check moves number to change star rating and check if maximum number of moves has been reached
function checkMovesNumber() {
  if (movesNumber > 14 && movesNumber <=18) {
    starRating = 2.5;
    star3.classList.remove('fa-star');
    star3.classList.add('fa-star-half-o');
  } else if (movesNumber > 18 && movesNumber <=22) {
    starRating = 2;
    star3.classList.remove('fa-star-half-o');
    star3.classList.add('fa-star-o');
  } else if (movesNumber > 22 && movesNumber <=26) {
    starRating = 1.5;
    star2.classList.remove('fa-star');
    star2.classList.add('fa-star-half-o');
  } else if (movesNumber > 26 && movesNumber <=30) {
    starRating = 1;
    star2.classList.remove('fa-star-half-o');
    star2.classList.add('fa-star-o');
  } else if (movesNumber > 30 && movesNumber <=34) {
    starRating = 0.5;
    star1.classList.remove('fa-star');
    star1.classList.add('fa-star-half-o');
  } else if (movesNumber > 34) {
    starRating = 0;
    star1.classList.remove('fa-star-half-o');
    star1.classList.add('fa-star-o');
    alert('Game over! You made too many moves! Try again!\nTotal moves: ' + movesNumber + '\nTime elapsed: ' + sec + ' seconds' + '\nYour rating: ' + starRating + ' stars');
    clearInterval(timer);
  } else {
    return;
  }
}

//EVENT LISTENERS
deck.addEventListener('click', flipCard);
restartButton.addEventListener('click', restartGame);
