//LET & CONST

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

//Call function to shuffle cards, create HTML to display the cards, reset open/shown/matched cards, reset move number and matched cards number.
function newGame() {
  let cardsList = Array.prototype.slice.call(cards);
  cardsList = shuffle(cardsList);
  for (var i = 0; i < cardsList.length; i++) {
    deck.appendChild(cardsList[i])
    //cardsList[i].setAttribute("id", i);
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
    setTimeout(checkIfGameOver, 500);
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

//remove open/show class to the matched couple
function handleMatchedCards() {
  let matchCardsArray = Array.prototype.slice.call(matchCardsHC);
  matchCardsArray.forEach(function(card) {
    card.classList.remove('open', 'show');
  });
}

//remove the match class to all matched cards.
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
  if (movesNumber > 32) {
    alert('Game over! You made too many moves! Too bad...\nMoves number: ' + movesNumber);
  } else {
    return;
  }
  let matchCardsArray = Array.prototype.slice.call(matchCardsHC);
  if (matchCardsArray.length === 16) {
    if (movesNumber <= 16) {
      alert('You won! You\'ve got a great memory!\nTotal moves: ' + movesNumber);
    } else if (movesNumber > 16 && movesNumber <= 24) {
      alert('You won! Keep training to get better!\nTotal moves: ' + movesNumber);
    } else if (movesNumber > 24 && movesNumber <= 32) {
      alert('It took you a while, but you did it! Congratulations!\nTotal moves: ' + movesNumber);
    }
  }
}

//EVENT LISTENERS
deck.addEventListener('click', flipCard);
restart.addEventListener('click', newGame);
