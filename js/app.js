const board = {
    1: 4,
    2: 4,
    3: 4,
    4: 4,
    5: 4,
    6: 4,
    7: 4,
    8: 4,
    9: 4,
    10: 4,
    11: 4,
    12: 4,
    storeA: 0,
    storeB: 0
}

class Space {
	constructor(stones, type, name) {
        this.stones = stones;
        this.type = type;
        this.name = name;
    }
    checkStones() {
        return this.stones;
    }
    checkType() {
        return this.type;
    }
}

class Store extends Space {
    constructor(stones, type, name) {
        super(stones, type, name);
    }
}

const storeA = new Store(0, "store", "storeA");
const a1 = new Space(4, "pit", "a1");
const a2 = new Space(4, "pit", "a2");
const a3 = new Space(4, "pit", "a3");
const a4 = new Space(4, "pit", "a4");
const a5 = new Space(4, "pit", "a5");
const a6 = new Space(4, "pit", "a6");
const storeB = new Store(0, "store", "storeB");
const b1 = new Space(4, "pit", "b1");
const b2 = new Space(4, "pit", "b2");
const b3 = new Space(4, "pit", "b3");
const b4 = new Space(4, "pit", "b4");
const b5 = new Space(4, "pit", "b5");
const b6 = new Space(4, "pit", "b6");
const boardOrder = [storeA, a1, a2, a3, a4, a5, a6, storeB, b1, b2, b3, b4, b5, b6];

//board should be an array with objects-- iterate through objects in array- objects can hold the functions to identify what should be done when they are accessed.
//each space should have:
//stones in it
//type (ex. pit or store)

const getStoneCount = (pitId) => {
    return board[pitId];
};


const updateBoard = (space) => {
    const $space = $(space);
    const spaceName = $space.attr('pit-position');

    $space.html(`${getStoneCount(spaceName)}<br />${spaceName}`);
};

const moveStones = (event) => {
    $targetPit = $(event.currentTarget);
    pitPosition = $targetPit.attr('pit-position');

    const spaceName = $targetPit.attr('pit-position');
    let stones = getStoneCount(spaceName);

    board[$targetPit.attr('pit-position')] = 0; //remvoe the stones from pit
    updateBoard($targetPit);

    //move stone to neihgboring pits
   while (stones > 0) {
        //new target is clockwise pit
        pitPosition--
        if (pitPosition < 1 && stones == 1) {
            board.storeA++;
            updateBoard($('#storeA'));
        }
        else if (pitPosition < 1) {
            pitPosition = 12;
        }

        const $newTarget = $(`.pit[pit-position="${pitPosition}"]`);
        board[pitPosition]++
        updateBoard($newTarget);
        stones--;
    }
};




$(() => {
    //iterate through each pit
    $('.pit').each((i, pit) => {
        updateBoard(pit);
    });
    $('.mancala-store').each((i, store) => {
        updateBoard(store);
    });

    //on clicking a pit
    $('.pit').on('click', moveStones);
})