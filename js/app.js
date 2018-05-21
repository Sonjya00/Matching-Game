//LET & CONST

const deck = document.getElementById('deck');
const cards = document.getElementsByClassName('card');
const matchedCoupleCards = document.getElementById('matchedCoupleCards');
const moves = document.getElementById('moves');
const restart = document.getElementById('restart');

const allStarsHC = document.getElementsByClassName('star');
const allStarsArray = Array.prototype.slice.call(allStarsHC);
const star1= document.getElementById('star1');
const star2= document.getElementById('star2');
const star3= document.getElementById('star3');

let openCardsHC = document.getElementsByClassName('open show');
let toBeReflippedHC = document.getElementsByClassName('toBeReflipped');
let matchCardsHC = document.getElementsByClassName('match');
let movesNumber = 0;
let matchedCoupleCardsNumber = 0;
let starRating = 3;

//TIMER
let sec = 0;
//let min = 0;
    let timer = setInterval(function(){
        sec++;
        document.getElementById('secondsElapsed').textContent = sec;

        /*PARTS THAT ASSOCIATES STAR WITH TIME
        /*if (sec > 20) {
          star3.classList.remove('fa-star');
          star3.classList.add('fa-star-half-o');
        }
        if (sec > 30) {
          star3.classList.remove('fa-star-half-o');
          star3.classList.add('fa-star-o');
        }
        if (sec > 40) {
          star2.classList.remove('fa-star');
          star2.classList.add('fa-star-half-o');
        }
        if (sec > 50) {
          star2.classList.remove('fa-star-half-o');
          star2.classList.add('fa-star-o');
        }
        if (sec > 60) {
          star1.classList.remove('fa-star');
          star1.classList.add('fa-star-half-o');
        }
        if (sec > 70) {
          star1.classList.remove('fa-star-half-o');
          star1.classList.add('fa-star-o');
        }*/

        /* TO SPLIT SECONDS INTO MINUTES
        if (sec > 59) {
          min++;
          document.getElementById('timerDisplayMinutes').textContent = min;
          sec = 0;
          document.getElementById('secondsElapsed').textContent = sec;
        }*/

    }, 1000);

//Call function to shuffle cards, create HTML to display the cards, reset open/shown/matched cards, reset move number and matched cards number, reset seconds, reset star rating.
function newGame() {
  let cardsList = Array.prototype.slice.call(cards);
  cardsList = shuffle(cardsList);
  for (var i = 0; i < cardsList.length; i++) {
    deck.appendChild(cardsList[i])
    //cardsList[i].setAttribute("id", i);
  };
  if (matchCardsHC.length > 0 || openCardsHC.length > 0) {
    resetCards();
  };
  if (movesNumber !==0) {
    movesNumber = 0;
    moves.textContent = movesNumber;
  }
  if (matchedCoupleCardsNumber !== 0) {
    matchedCoupleCardsNumber = 0;
    matchedCoupleCards.textContent = matchedCoupleCardsNumber;
  }
  //clearInterval(timer);
  sec = 0;
  //min = 0;
  document.getElementById('secondsElapsed').textContent = sec;
  //document.getElementById('timerDisplayMinutes').textContent = min;

  starRating = 3;
  allStarsArray.forEach(function(star) {
    star.className = "fa fa-star star";
  });
}
newGame();

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

//when 2 cards are open/shown, if their content match, assign class match, call function to unassign open/shown classes, add +1 matching couple found, call function to increment move by one and check if game is over. If they don't match, assign a temporary class to identity which cards need to be closed in case more than 2 cards were flipped, and call the function to close those 2 cards. In any case, the move number is incremented by one
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
  /*setTimeout(function closeCards() {
    openCardsArray[0].classList.remove('open', 'show');
    openCardsArray[0].classList.remove('open', 'show');
  }
, 1200);*/
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
  moves.textContent = movesNumber;
}

//Increment matched couple number and display it
function incrementMatchedCouples() {
  matchedCoupleCardsNumber++;
  matchedCoupleCards.textContent = matchedCoupleCardsNumber;
}

//Check if all the couples have been matched and return alert according to time/star rating
function checkIfGameOver() {
  //calculateStarRating();
  let matchCardsArray = Array.prototype.slice.call(matchCardsHC);
  let alertMessage;
  let gameStatsMessage = '\nTime elapsed: ' + sec + ' seconds' + '\nTotal moves: ' + movesNumber + '\nYour rating: ' + starRating + ' stars';
  if (matchCardsArray.length === 16) {
    if (starRating === 3) {
      alertMessage = 'You won! You have amazing memory skills!!';
    } else if (starRating === 2.5) {
      alertMessage = 'You won! You have good memory skills!!';
    } else if (starRating === 2) {
      alertMessage = 'You won! Keep exercising to improve your memory skills!!';
    } else if (starRating === 1.5) {
      alertMessage = 'You won! Try finding the matching cards with less moves next time!!';
    } else if (starRating === 1) {
      alertMessage = 'You won! Try finding the matching cards with less moves next time!!';
    } else if (starRating === 0.5) {
      alertMessage = 'You were close to the maximum number of moves...But you won!!';
    }
/*
    if (movesNumber <= 16) {
      if (starRating >= 2.5) {
        alert('You won! You are a real fast thinker with great memory skills!\nTotal moves: ' + movesNumber + '\nTime elapsed: ' + sec + ' seconds' + '\nYour rating: ' + starRating + ' stars');
      } else if (starRating < 2.5 && starRating >= 2) {
        alert('You won! You\'ve got good memory!\nTotal moves: ' + movesNumber + '\nTime elapsed: ' + sec + ' seconds' + '\nYour rating: ' + starRating + ' stars');
      } else if (starRating < 2 && starRating >= 1) {
        alert('You won! You are a careful player but try working on your speed next time.\nTotal moves: ' + movesNumber + '\nTime elapsed: ' + sec + ' seconds' + '\nYour rating: ' + starRating + ' stars');
      } else if (starRating < 1) {
        alert('You won! But that took a while, didn\'t it?\nTotal moves: ' + movesNumber + '\nTime elapsed: ' + sec + ' seconds' + '\nYour rating: ' + starRating + ' stars');
      }
    } else if (movesNumber > 16 && movesNumber <= 24) {
      alert('You won! Keep training to get a better time and more stars!\nTotal moves: ' + movesNumber + '\nTime elapsed: ' + sec + ' seconds' + '\nYour rating: ' + starRating + ' stars');
    } else if (movesNumber > 24 && movesNumber <= 32) {
      if (starRating >= 2.5) {
        alert('You won! You are a fast thinker but a fast clicker too!\nTotal moves: ' + movesNumber + '\nTime elapsed: ' + sec + ' seconds' + '\nYour rating: ' + starRating + ' stars');
      } else if (starRating < 2.5 && starRating >= 2) {
        alert('You won! It took you a bit, but you did it!\nTotal moves: ' + movesNumber + '\nTime elapsed: ' + sec + ' seconds' + '\nYour rating: ' + starRating + ' stars');
      } else if (starRating < 2 && starRating >= 1) {
        alert('You won! It took you a bit too long, but you did it!\nTotal moves: ' + movesNumber + '\nTime elapsed: ' + sec + ' seconds' + '\nYour rating: ' + starRating + ' stars');
      } else if (starRating < 1) {
        alert('You won! But that took you a while and quite a few moves. Try working on your speed and be mindful about the moves number too next time.\nTotal moves: ' + movesNumber + '\nTime elapsed: ' + sec + ' seconds' + '\nYour rating: ' + starRating + ' stars');
      }
    }*/
    alert(alertMessage + gameStatsMessage);
  }
}

//USED TO CALCULATE STAR RATING WHEN IT WAS ASSOCIATED WITH TIME
//Calculate star rating according to time elapsed
/*function calculateStarRating() {
  if (sec <= 20) {
    starRating = 3;
  } else if (sec > 20 && sec <=30) {
    starRating = 2.5;
  } else if (sec > 30 && sec <=40) {
    starRating = 2;
  } else if (sec > 40 && sec <=50) {
    starRating = 1.5;
  } else if (sec > 50 && sec <=60) {
    starRating = 1;
  } else if (sec > 60 && sec <=70) {
    starRating = 0.5;
  }  else if (sec > 60) {
    starRating = 0.5;
  }
}*/

//Check if max moves number has been reached
function checkMovesNumber() {
  if (movesNumber > 14 && movesNumber <=18) {
    starRating = 2.5;
    star3.classList.remove('fa-star');
    star3.classList.add('fa-star-half-o');
  } else if (movesNumber > 18 && movesNumber <=22) {
    starRating = 2;
    star3.classList.remove('fa-star');
    star3.classList.add('fa-star-o');
  } else if (movesNumber > 22 && movesNumber <=26) {
    starRating = 1.5;
    star2.classList.remove('fa-star');
    star2.classList.add('fa-star-half-o');
  } else if (movesNumber > 26 && movesNumber <=30) {
    starRating = 1;
    star2.classList.remove('fa-star');
    star2.classList.add('fa-star-o');
  } else if (movesNumber > 30 && movesNumber <=34) {
    starRating = 0.5;
    star1.classList.remove('fa-star');
    star1.classList.add('fa-star-half-o');
  } else if (movesNumber > 34) {
    starRating = 0.5;
    star1.classList.remove('fa-star');
    star1.classList.add('fa-star-o');
    alert('Game over! You made too many moves! Try again!\nTotal moves: ' + movesNumber + '\nTime elapsed: ' + sec + ' seconds' + '\nYour rating: ' + starRating + ' stars');
  } else {
    return;
  }
}

//EVENT LISTENERS
deck.addEventListener('click', flipCard);
restart.addEventListener('click', newGame);
