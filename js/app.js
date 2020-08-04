let endGame = false;
let currentPlayer = "playerA";
let players = ["playerA", "playerB"];

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
        boardOrder.forEach(space => updateBoard(board[space]));
    }
    removeStones() {
        this.stoneCount = 0;
        boardOrder.forEach(space => updateBoard(board[space]));
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
        if (board[targetSpace].stoneCount > 0) {alert(`Captured ${board[targetSpace].stoneCount} stones from opponent`)};
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
const stores = [storeA, storeB];



// const board = {
//     PlayerA: {
//         "position1": a1, "position2": a2, "position3": a3, "position4": a4, "position5": a5, "position6": a6, "store": storeA
//     },
//     PlayerB: {
//         "position1": b1, "position2": b2, "position3": b3, "position4": b4, "position5": b5, "position6": b6,"store": storeB
//     }
// };

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

            alert(`${currentPlayer} go again`);
            goAgainStatus = true;
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

    boardOrder.forEach(space => updateBoard(board[space]));

    //set up board status

    $('.pit').on('click', moveStones);
    $('.current-player').html(currentPlayer);
});