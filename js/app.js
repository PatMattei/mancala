//TODO: TARGET function- show what the reult of click will be.
//TODO flip board OR show direction of gem swap

let endGame = false;
let currentPlayer = "playerA";
let players = ["playerA", "playerB"];
let emoji = {
    "playerA": "",
    "playerB": ""
}

class Space {
	constructor(stoneCount, type, owner, boardPosition, name) {
        this.stoneCount = stoneCount;
        this.type = type;
        this.owner = owner;
        this.boardPosition = boardPosition;
        this.name = name;
    }
    addStone() {
        this.stoneCount++;
        updateStoneCounts();
        boardOrder.forEach(space => updateSpace(board[space]));
    }
    removeStones() {
        this.stoneCount = 0;
        updateStoneCounts();
        boardOrder.forEach(space => updateSpace(board[space]));
    }
    captureStones() {
        let targetSide = "";
        let targetSpace = "";
        let currentPlayerStore = ""
        stores.forEach((store) => {    
            if (store.owner === currentPlayer) {
                currentPlayerStore = store.name;
            }
        });

        //get opposite pit's position (ie if this is a3, get b3)
        if (this.name.includes("a")) {
            targetSide = "b";
        } else {
            targetSide = "a";
        }
        targetSpace = targetSide + this.boardPosition;

        // move opposite pit's stones to your store
        board[currentPlayerStore].stoneCount += board[targetSpace].stoneCount + this.stoneCount;
        
        boardOrder.forEach(space => updateSpace(board[space]));
        alert(`Moved 1 piece from your side to your store`);
        if (board[targetSpace].stoneCount > 0) {alert(`Captured ${board[targetSpace].stoneCount} pieces from opponent`)};
        board[targetSpace].removeStones()
        this.removeStones();
    }
}

const a1 = new Space(4, "pit", "playerA", "1", "a1");
const a2 = new Space(4, "pit", "playerA", "2", "a2");
const a3 = new Space(4, "pit", "playerA", "3", "a3");
const a4 = new Space(4, "pit", "playerA", "4", "a4");
const a5 = new Space(4, "pit", "playerA", "5", "a5");
const a6 = new Space(4, "pit", "playerA", "6", "a6");
const b1 = new Space(4, "pit", "playerB", "1", "b1");
const b2 = new Space(4, "pit", "playerB", "2", "b2");
const b3 = new Space(4, "pit", "playerB", "3", "b3");
const b4 = new Space(4, "pit", "playerB", "4", "b4");
const b5 = new Space(4, "pit", "playerB", "5", "b5");
const b6 = new Space(4, "pit", "playerB", "6", "b6");
const storeA = new Space(0, "store", "playerA", "0", "storeA");
const storeB = new Space(0, "store", "playerB", "0", "storeB");
 
const board = {"a1": a1, "a2": a2, "a3": a3, "a4": a4, "a5": a5, "a6": a6, "b1": b1, "b2": b2, "b3": b3, "b4": b4, "b5": b5, "b6": b6, "storeA": storeA ,"storeB": storeB};

const pits = [a1, a2, a3, a4, a5, a6, b1, b2, b3, b4, b5, b6];
const stores = [storeA, storeB];


let playerAPitStones = a1.stoneCount + a2.stoneCount + a3.stoneCount + a4.stoneCount + a5.stoneCount + a6.stoneCount;
let playerBPitStones = b1.stoneCount + b2.stoneCount + b3.stoneCount + b4.stoneCount + b5.stoneCount + b6.stoneCount;

const boardOrder = ["storeA", "b1", "b2", "b3", "b4", "b5", "b6", "storeB", "a6", "a5", "a4", "a3", "a2", "a1"];

const updateSpace = (space) => {
    const $space = $(`#${space.name}`);
    $space.html(`Pieces: ${space.stoneCount}<br />`);

    if (space.type === "store") {
        $space.prepend(`${space.owner}'s Store<br />`);
    }
    displayStones(space);
};

const displayStones = (space) => {
    const $space = $(`#${space.name}`);
    for (i = 1; i <= space.stoneCount; i++) {
        $space.append(`<span class="stone">${emoji[space.owner]}</span>`)
    }
};


const moveStones = (event) => {
    $targetPit = $(event.currentTarget);
    let id = $targetPit.attr('id');
    let stonesInHand = board[id].stoneCount;

    if ($targetPit.closest('.pit-row').hasClass('current-player-row') && stonesInHand > 0) { //only let players target their row
        board[id].removeStones();

        shiftStones(stonesInHand, id);
    }
}

const shiftStones = (stonesInHand, id) => {
    let goAgainStatus = false;
    
    //move stones to neighboring pits
    while (stonesInHand > 0) {

        //new target is clockwise pit/next space in array
        let index = boardOrder.indexOf(id) + 1;
        if(index > boardOrder.length - 1) { //if end of boardOrder array
            index = 0;
        }
        
       id = boardOrder[index];

        //if you have more than one stone in hand and land on the opponent's store, skip:
        if (board[id].type === "store" && stonesInHand >= 1 && board[id].owner != currentPlayer) {
            index++;
        } else if (board[id].type === "store" && stonesInHand === 1 && board[id].owner === currentPlayer) {
            board[id].addStone();
            stonesInHand--;
            goAgainStatus = true;

            if (playerAPitStones === 0 || playerBPitStones === 0 ) {
                goAgainStatus = false;
            } else {
                alert(`${currentPlayer} go again`);
            }
        } else {
            board[id].addStone();
            stonesInHand--;
            //if last stone lands in an empty pit on your side:
            if (stonesInHand === 0 && board[id].owner === currentPlayer && board[id].stoneCount === 1 && board[id].type === "pit") {
                board[id].captureStones();
            }
        }
    }
    endTurn(goAgainStatus);
};

const endTurn = (goAgain) => {
    updateStoneCounts();
    
    if (playerAPitStones <= 0 || playerBPitStones <= 0) {
        alert('GAME OVER!');
        $('.play-again').css('display', 'block');
        endGame = true;
        handleEndGame(playerAPitStones, playerBPitStones);
    }

    if (endGame === false) {
        if (goAgain != true) {
            if (players.indexOf(currentPlayer) === 0) {
                currentPlayer = players[1];
            } else {
                currentPlayer = players[0];
            }
        }

        $('.current-player-row').removeClass('current-player-row');

        $(`#${currentPlayer}`).addClass('current-player-row');
        $('.current-player').html(currentPlayer);
        
        stores.forEach((store) => {    
            if (store.owner === currentPlayer) {
                $(`#${store.name}`).addClass('current-player-store');
            } else {
                $(`#${store.name}`).removeClass('current-player-store');
            }
        });
    }
}

const handleEndGame = (playerAPitStones, playerBPitStones) => {
    //remove remaining stones to stores
    storeA.stoneCount += playerAPitStones;
    storeB.stoneCount += playerBPitStones;
    pits.forEach(pit => {pit.removeStones()});

    boardOrder.forEach(store => updateSpace(board[store]));
    
    $(`.mancala-store`).removeClass('current-player-store');
    $('.current-player-row').removeClass('current-player-row');

    if (storeA.stoneCount > storeB.stoneCount) {
        alert("Player A WINS!");
        $('#storeA').addClass('winner');
        displayWinScreen("playerA");
    } else if (storeB.stoneCount > storeA.stoneCount) {
        alert("Player B WINS!");
        $('#storeB').addClass('winner');
        displayWinScreen("playerB");
    } else {
        alert("TIE!");
    }
};

const displayWinScreen = (winner) => {
    const winnerEmoji = emoji[winner];
    $('body').prepend('<div class="win-screen"></div>');

    //generate a random number of emojis between 20 and 50
    const randomNumber = Math.floor(Math.random() * 60) + 20;
    for (i = 0; i <= randomNumber; i++) {
        randomSize = Math.floor(Math.random() * 15) + 6;
        randomLeft = Math.floor(Math.random() * 90) + 1;
        randomClass = Math.floor(Math.random() * 5) + 1;

        if (randomClass === 1) {
            animationClass = "slowest";
        } else if (randomClass === 2) {
            animationClass = "slow";
        } else if (randomClass === 3) {
            animationClass = "medium";
        } else if (randomClass === 4) {
            animationClass = "fast";
        } else if (randomClass === 5) {
            animationClass = "fastest";
        }

        $('.win-screen').append($(`<div class="win-emoji ${animationClass}" style="font-size: ${randomSize}vw; left: ${randomLeft}%; position: absolute">${winnerEmoji}</div>`));
    }
};


const updateStoneCounts = () => {
    playerAPitStones = a1.stoneCount + a2.stoneCount + a3.stoneCount + a4.stoneCount + a5.stoneCount + a6.stoneCount;
    playerBPitStones = b1.stoneCount + b2.stoneCount + b3.stoneCount + b4.stoneCount + b5.stoneCount + b6.stoneCount;
};

const greetPlayers = () => {
    $('#emoji-selector').addClass('overlay-active');
    $('.user-text').html(`<b>${currentPlayer}</b>, choose your emoji:`);
    
    
    emojis.forEach(emoji => $('.emoji-list').append($(`<li class="emoji">${emoji}</li>`)))

    $('.emoji').on('click', (event) => {
        emoji[currentPlayer] = $(event.currentTarget).text();

        if (players.indexOf(currentPlayer) === 0) {
            currentPlayer = players[1];
            $('.user-text').html(`<b>${currentPlayer}</b>, choose your emoji:`);
        } else {
            currentPlayer = players[0];
            $('.user-text').html(`<b>${currentPlayer}</b>, choose your emoji:`);
        }

        if (emoji[currentPlayer] != "") {
            $('#emoji-selector').removeClass('overlay-active');
        }

        boardOrder.forEach(space => updateSpace(board[space]));
    });
};



$(() => {
    //set up board status
    greetPlayers();


    //$('.pit').on('click', moveStones);
    $('.pit').on('click', () => {displayWinScreen("playerA")});
    $('.current-player').html(currentPlayer);


    $('.play-again').on('click', () => {location.reload(true)});
    
    $('.overlay-close').on('click', (event) => {
        $(event.currentTarget).closest('.overlay').removeClass('overlay-active')
    });
    $('.overlay-display').on('click', (event) => {
        const overlayName = $(event.currentTarget).attr('overlay');
        $(`#${overlayName}`).addClass('overlay-active');
    });
});