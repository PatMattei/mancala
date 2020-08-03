class Space {
	constructor(stones, type, name) {
        this.stoneCount = stones;
        this.type = type;
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
    constructor(stones, type, name) {
        super(stones, type, name);
    }
}

class Factory {
	constructor() {
	}
	generatePit(i) {
		const newPit = new Space(4, "pit", `${i}`);
		enemyList.push(newPit);
	}

}

const a1 = new Space(4, "pit", "a1");
const a2 = new Space(4, "pit", "a2");
const a3 = new Space(4, "pit", "a3");
const a4 = new Space(4, "pit", "a4");
const a5 = new Space(4, "pit", "a5");
const a6 = new Space(4, "pit", "a6");
const b1 = new Space(4, "pit", "b1");
const b2 = new Space(4, "pit", "b2");
const b3 = new Space(4, "pit", "b3");
const b4 = new Space(4, "pit", "b4");
const b5 = new Space(4, "pit", "b5");
const b6 = new Space(4, "pit", "b6");
const storeA = new Store(0, "store", "storeA");
const storeB = new Store(0, "store", "storeB");
const board = {"a1": a1, a1,"a2": a2,"a3": a3,"a4": a4,"a5": a5,"a6": a6,"b1": b1,"b2": b2,"b3": b3,"b4": b4,"b5": b5,"b6": b6,"storeA": storeA,"storeB": storeB};

const boardOrder = ["storeA", "a1", "a2", "a3", "a4", "a5", "a6", "storeB", "b1", "b2", "b3", "b4", "b5", "b6"];


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


    //move stone to neihgboring pits
    while (stonesInHand > 0) {
        //new target is clockwise pit
        const target = boardOrder.indexOf(id) - 1;
        id = boardOrder[target];
        board[id].addStone();
        stonesInHand--;
        updateBoard(board[id]);
    }
//         if (pitPosition < 1 && stones == 1) {
//             board.storeA++;
//             updateBoard($('#storeA'));
//         }
//         else if (pitPosition < 1) {
//             pitPosition = 12;
//         }

//         const $newTarget = $(`.pit[pit-position="${pitPosition}"]`);
//         board[pitPosition]++
//         updateBoard($newTarget);
//         stones--;
//     }
};




$(() => {
    //iterate through each space
    boardOrder.forEach(space => updateBoard(board[space]))

    //on clicking a pit
    $('.pit').on('click', moveStones);
})