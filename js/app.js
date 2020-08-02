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