class Space {
	constructor(stones, type, player, name) {
        this.stoneCount = stones;
        this.type = type;
        this.player = player;
        this.name = name;
    }
    addStone() {
        this.stoneCount++;
    }
    removeStones() {
        this.stoneCount = 0;
    }
}

class Store extends Space {
    constructor(stones, type, player, name) {
        super(stones, type, player, name);
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
const storeA = new Store(0, "store", "playerA", "storeA");
const storeB = new Store(0, "store", "playerB", "storeB");
const board = {"a1": a1, a1,"a2": a2,"a3": a3,"a4": a4,"a5": a5,"a6": a6,"b1": b1,"b2": b2,"b3": b3,"b4": b4,"b5": b5,"b6": b6,"storeA": storeA,"storeB": storeB};

const boardOrder = ["storeA", "b1", "b2", "b3", "b4", "b5", "b6", "storeB", "a6", "a5", "a4", "a3", "a2", "a1"];


const  updateBoard = (space) => {
    const $space = $(`#${space.name}`);

    $space.html(`${space.stoneCount}<br />${space.name}`);
};

const moveStones = (event) => {
    $targetPit = $(event.currentTarget);
    let id = $targetPit.attr('id');
    let stonesInHand = board[id].stoneCount;

    board[id].removeStones();

    updateBoard(board[id]);
    shiftStones(stonesInHand, id);
}

const shiftStones = (stonesInHand, id) => {
    //move stones to neighboring pits
    while (stonesInHand > 0) {
        //new target is clockwise pit
        let index = boardOrder.indexOf(id) + 1;
        if(index > boardOrder.length - 1) {
            index = 0;
        }
        
       id = boardOrder[index];

        //if you have more than one stone in hand and land on the store; skip store:
        if (board[id].type === "store" && stonesInHand > 1) {
            index++;
        } else {
            board[id].addStone();
            updateBoard(board[id]);
            stonesInHand--
            //if we end on a store, add score
            if (board[id].type === "store") {
                console.log("SCORE")
                //score();
            }
        }
    }
};




$(() => {
    //iterate through each space
    boardOrder.forEach(space => updateBoard(board[space]))

    //on clicking a pit
    $('.pit').on('click', moveStones);
})