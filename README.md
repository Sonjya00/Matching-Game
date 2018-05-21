# Memory Game Project

## Summary

This Memory Game is a project made for the completion of the [Udacity's Front-End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001?v=fe1).

## Project Description

Build a complete browser-based card matching game using HTML, CSS, and JavaScript.

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down.

The game allows the player to flip over two cards at a time and it checks if the cards have matching symbols. If they do, they will stay flipped face up. If they don't, they will be flipped face down again.
To win the game, the player has to find all the matching pairs.

When a user wins the game, the timer stops and a popup appears to congratulate the player. The popup also tells the player how much time and how many moves it took to win the game, and what the star rating was.

On top of the game board, a star rating system (from 0 to 3), the time elapsed, the number of moves, and the cards matched so far are displayed.

A restart button allows the player to reset the game board, the timer, the moves, and the star rating.

The star rating system is based on the number of moves the player makes. At the beginning of the game, the rating is 3, but as soon as the player makes more than 14 moves, it will start decreasing by 0.5 every 4 moves. If the player makes more than 34 moves, the game will stop, as the maximum number of moves allowed has been reached.

Beneath the board game, there is a table that shows the previous game's stats (time elapsed, moves number, star rating). This will be displayed only upon completion of the first game.

## How to play

Click on two cards at a time to flip them over. If the two cards match, they will stay flipped; otherwise, they will flip face down again. Keep flipping the cards until all cards have been matched with their pair.

Try to complete the game with the fewest moves and in the shortest time possible. At the end of the game, you will get a score based on the number of moves you made to complete it. You can check your current score by looking at the stars in the top left corner: as you keep making more moves, the stars will gradually deplete. If you make too many moves, all the stars will be depleted and you will lose the game.

Once you win or lose the game, or any time you want to restart the game, click on the arrow button in the upper right corner on top of the board game. This will shuffle the cards, flipping them face down again, and will reset the timer and your score, allowing you to start a new game.

The game will register your score in the table beneath the cards every time you win.

## Credits

Background pattern: [https://www.heropatterns.com/](https://www.heropatterns.com/)
