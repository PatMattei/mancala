const board = {
    a1: 4,
    a2: 4,
    a3: 4,
    a4: 4,
    a5: 4,
    a6: 4,
    b1: 4,
    b2: 4,
    b3: 4,
    b4: 4,
    b5: 4,
    b6: 4,
    storeA: 0,
    storeB: 0
}

const countStones = (pit) => {
    const $pit = $(pit)
    const pitName = $pit.attr('name');

    $pit.html(board[pitName]);
};



$(() => {
    //iterate through each pit
    $('.pit').each((i, pit) => {
        countStones(pit)
    }
    );
})