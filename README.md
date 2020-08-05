README- Mancala

https://patmattei.github.io/mancala/

This is a game of Mancala created using HTML, CSS, Javascript, and jQuery. 

---RULES---
This is a two player game. Player A and Player B both have six pits that start filled with four stones. On their turn, one player removes the stones from a pit on their side and redistributes one seed to each pit on the board, going counter-clockwise, until they have no more seeds in their hand (click the pit you want to empty and redistribute). 
The large stores at the end of board are the players' banks. Seeds in the bank are locked there until the end of the game, and whoever has the most seeds wins the game.
When redistribting the seeds, a player adds one seed to their bank if they come to while redistribting seeds counter-clockwise. A player will skip their opponent's bank, not distribute any seeds in there, and will instead put the seed in the next pit. If a player puts the final pit in their hand into their bank, they get to go again.
If a player puts their final seed into an EMPTY pit, they move that seed and any other seeds in the pit opposite that spot on the board to their bank.
The game ends when all six pits on a side of the board are empty. The non-empty side seeds are moved into the bank of the player who still has seeds on their side.
Whoever has the most seeds in their bank at the end is the winner!

---RESOURCES AND APPROACH---
I wanted it to be easy to iterate through each space on the board, so I made objects representing the pits and banks and put them in an array. I also wanted the HTML to match up well with the .js file, so the id's of each board space correspond to the objects created in Javascript. Each space also had an attribute of "owner" which let me add them to the correct bank and compare scores.

I used flexbox to style the board, which made it easy to create grids for the pits. It also let the board be scaleable regardless of screensize.

I used this as a guide for the rules: https://endlessgames.com/wp-content/uploads/Mancala_Instructions.pdf

I got a bunch of the HTML codes for emojis from: https://html-css-js.com/