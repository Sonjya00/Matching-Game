/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

const deck = document.getElementById('deck');
const cards = document.getElementsByClassName('card');
const matchedCoupleCards = document.getElementById('matchedCoupleCards');
const moves = document.getElementById('moves');
const restart = document.getElementById('restart');

let openCardsHC = document.getElementsByClassName('open show');
let toBeReflippedHC = document.getElementsByClassName('toBeReflipped');
let matchCardsHC = document.getElementsByClassName('match');
let movesNumber = 0;
let matchedCoupleCardsNumber = 0;

//Call function to shuffle cards, create HTML to display the cards, reset open/shown/matched cards, reset move number and matched cards number.
function newGame() {
  let cardsList = Array.prototype.slice.call(cards);
  cardsList = shuffle(cardsList);
  for (var i = 0; i < cardsList.length; i++) {
    deck.appendChild(cardsList[i])
    cardsList[i].setAttribute("id", i);
  };
  if (matchCardsHC.length > 0) {
    resetCards();
  };
  if (openCardsHC.length > 0) {
    flipOpenCards();
  }
  if (movesNumber !==0) {
    movesNumber = 0;
    moves.textContent = movesNumber;
  }
  if (matchedCoupleCardsNumber !== 0) {
    matchedCoupleCardsNumber = 0;
    matchedCoupleCards.textContent = matchedCoupleCardsNumber;
  }

}
newGame();

//Flip cards, store open/shown cards images in an array, and run check matching cards function.
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

//when 2 cards are open/shown, if their content match, assign class match, call function to unassign open/shown classes, add +1 matching couple found, call function to increment move by one and check if game is over. If they don't match, assign a temporary class to identity which cards need to be closed in case more than 2 cards were flipped, and call the function to close those 2 cards. In any case, the move number is incremented by one
function checkIfMatching() {
  let openCardsArray = Array.prototype.slice.call(openCardsHC);
    if (openCardsArray[0].classList[1] === openCardsArray[1].classList[1]) {
      openCardsArray.forEach(function(card) {
        card.classList.add('match');
      });
      setTimeout(handleMatchedCards, 1200);
      incrementMatchedCouples();
      setTimeout(checkIfGameOver, 1000);
  } else {
    openCardsArray.forEach(function(card) {
      card.classList.add('toBeReflipped');
    });
  setTimeout(flipOpenCards, 1200);
  /*setTimeout(function closeCards() {
    openCardsArray[0].classList.remove('open', 'show');
    openCardsArray[0].classList.remove('open', 'show');
  }
, 1200);*/
    }
    incrementMovesNumber();
  }

//close the 2 cards confronted and any other open card, if there are more than 2 open besides the confronted ones.
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

//add the match class to the matched couple
function handleMatchedCards() {
  let matchCardsArray = Array.prototype.slice.call(matchCardsHC);
  matchCardsArray.forEach(function(card) {
    card.classList.remove('open', 'show');
  });
}

//remove the class match to all matched cards.
function resetCards() {
  let matchCardsArray = Array.prototype.slice.call(matchCardsHC);
  matchCardsArray.forEach(function(card) {
    card.classList.remove('match');
  });
}

//Increment moves number and display it
function incrementMovesNumber() {
  movesNumber++;
  moves.textContent = movesNumber;
}

//Increment matched couple number and display it
function incrementMatchedCouples() {
  matchedCoupleCardsNumber++;
  matchedCoupleCards.textContent = matchedCoupleCardsNumber;
}

//Check if all the couples have been matched
function checkIfGameOver() {
  let matchCardsArray = Array.prototype.slice.call(matchCardsHC);
  if (matchCardsArray.length === 16) {
    if (movesNumber <= 16) {
      alert('You won! You\'ve got a great memory! Total moves: ' + movesNumber);
    } else if (movesNumber > 16 && movesNumber <= 30) {
      alert('You won! Keep training to get better! Total moves: ' + movesNumber);
    } else if (movesNumber > 30) {
      alert('It took you a while, but you did it! Total moves: ' + movesNumber);
    }
  }
}

//EVENT LISTENERS
deck.addEventListener('click', flipCard);
restart.addEventListener('click', newGame);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
