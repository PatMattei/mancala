let endGame = false;
let currentPlayer = "playerA"
let players = ["playerA", "playerB"]

class Space {
	constructor(stoneCount, type, player, name) {
        this.stoneCount = stoneCount;
        this.type = type;
        this.player = player;
        this.name = name;
    }
    addStone() {
        this.stoneCount++;
        boardOrder.forEach(space => updateBoard(board[space]));
    }
    removeStones() {
        this.stoneCount = 0;
        boardOrder.forEach(space => updateBoard(board[space]));
    }
    captureStones() {
        console.log('capture')
        //get this pit's position
        //get opposite pit's position (ie if this is a3, get b3)
        //move opposite pit's stones to your store
        //move your pit's stones to your store
    }
}

const a1 = new Space(4, "pit", "playerA", "a1");
const a2 = new Space(4, "pit", "playerA", "a2");
const a3 = new Space(4, "pit", "playerA", "a3");
const a4 = new Space(4, "pit", "playerA", "a4");
const a5 = new Space(4, "pit", "playerA", "a5");
const a6 = new Space(4, "pit", "playerA", "a6");
const b1 = new Space(4, "pit", "playerB", "b1");
const b2 = new Space(4, "pit", "playerB", "b2");
const b3 = new Space(4, "pit", "playerB", "b3");
const b4 = new Space(4, "pit", "playerB", "b4");
const b5 = new Space(4, "pit", "playerB", "b5");
const b6 = new Space(4, "pit", "playerB", "b6");
const storeA = new Space(0, "store", "playerA", "storeA");
const storeB = new Space(0, "store", "playerB", "storeB");

const board = {"a1": a1, a1,"a2": a2,"a3": a3,"a4": a4,"a5": a5,"a6": a6,"b1": b1,"b2": b2,"b3": b3,"b4": b4,"b5": b5,"b6": b6,"storeA": storeA,"storeB": storeB};

const boardOrder = ["storeA", "b1", "b2", "b3", "b4", "b5", "b6", "storeB", "a6", "a5", "a4", "a3", "a2", "a1"];


const updateBoard = (space) => {
    const $space = $(`#${space.name}`);

    $space.html(`Stones: ${space.stoneCount}<br />Space: ${space.name}`);
};

const moveStones = (event) => {
    $targetPit = $(event.currentTarget);
    let id = $targetPit.attr('id');
    let stonesInHand = board[id].stoneCount;

    if ($targetPit.closest('.pit-row').hasClass('current-player-row') && stonesInHand > 0) {
        board[id].removeStones();

        shiftStones(stonesInHand, id);
    }
}

const shiftStones = (stonesInHand, id) => {
    let goAgain = false;
    
    //move stones to neighboring pits
    while (stonesInHand > 0) {

        //new target is clockwise pit/next space in array
        let index = boardOrder.indexOf(id) + 1;
        if(index > boardOrder.length - 1) { //if end of boardOrder array
            index = 0;
        }
        
       id = boardOrder[index];

        //if you have more than one stone in hand and land on the opponent's store, skip:
        if (board[id].type === "store" && stonesInHand >= 1 && board[id].player != currentPlayer) {
            index++;
        } else if (board[id].type === "store" && stonesInHand === 1 && board[id].player === currentPlayer) {
            board[id].addStone();
            stonesInHand--;

            alert(`${currentPlayer} go again`);
            goAgain = true;
        } else {
            board[id].addStone();
            stonesInHand--;
            //if last stone lands in an empty pit on your side:
            if (stonesInHand === 0 && board[id].player === currentPlayer && board[id].stoneCount === 1 && board[id].type === "pit") {
                board[id].captureStones();
            }
        }
    }
    endTurn(goAgain);
};

const endTurn = (goAgain) => {
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
}



$(() => {
    //set up board status
    boardOrder.forEach(space => updateBoard(board[space]));

    $('.pit').on('click', moveStones);
    $('.current-player').html(currentPlayer);
})