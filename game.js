$(document).ready(function () {
    drawGrid();
    addTile();
    addTile();
    draw();
    $(".new-btn").click(function () {
        matrix = [];
        drawGrid();
        addTile();
        addTile();
        draw();
    });

    $(".new-tile").click(function () {
        addTile();
        draw();
    });
});

var matrix = [];
var count = 0;
var movesList = [];

$(document).keydown(function (e) {
    let movementHappended = false;
    if (e.keyCode == 90 && e.ctrlKey) {
        let last2 = movesList.splice(7, 2);
        let x = movesList
       
    }
    switch (e.which) {
        case 37: // left
            while (goLeft()) {
                draw();
                movementHappended = true;
            }
            break;

        case 38: // up
            while (goUp()) {
                draw();
                movementHappended = true;
            }
            break;

        case 39: // right

            while (goRight()) {
                draw();
                movementHappended = true;
            }

            break;

        case 40: // down
            while (goDown()) {
                draw();
                movementHappended = true;
            }
            break;

        default: return; // exit this handler for other keys
    }

    if (movementHappended == true) {
        addTile();
        draw();
    }
});



function goRight() {
    let movementHappended = false;

    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            let currentElementValue = matrix[i][j];
            let nextElementValue = matrix[i][j + 1];

            if (canWeMergeTiles(currentElementValue, nextElementValue)) {
                mergeTiles(currentElementValue, nextElementValue, i, j, i, j + 1);
                movementHappended = true;
            }
        }
    }
    return movementHappended;
}

function goLeft() {
    let movementHappended = false;

    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            let currentElementValue = matrix[i][j];
            let nextElementValue = matrix[i][j - 1];

            if (canWeMergeTiles(currentElementValue, nextElementValue)) {
                mergeTiles(currentElementValue, nextElementValue, i, j, i, j - 1);
                movementHappended = true;
            }
        }
    }
    return movementHappended;
}

function goDown() {
    let movementHappended = false;

    for (let i = 2; i >= 0; i--) {
        for (let j = 0; j <= 3; j++) {
            let currentElementValue = matrix[i][j];
            let nextElementValue = matrix[i + 1][j];

            if (canWeMergeTiles(currentElementValue, nextElementValue)) {
                mergeTiles(currentElementValue, nextElementValue, i, j, i + 1, j);
                movementHappended = true;
            }
        }
    }
    return movementHappended;
}

function goUp() {
    let movementHappended = false;

    for (let i = 1; i < 4; i++) {
        for (let j = 0; j <= 3; j++) {
            let currentElementValue = matrix[i][j];
            let nextElementValue = matrix[i - 1][j];

            if (canWeMergeTiles(currentElementValue, nextElementValue)) {
                mergeTiles(currentElementValue, nextElementValue, i, j, i - 1, j);
                movementHappended = true;
            }
        }
    }
    return movementHappended;
}

function canWeMergeTiles(currentElementValue, nextElementValue) {
    if (currentElementValue == 0) {
        return false;
    }

    if (nextElementValue == 0) {
        return true;
    }

    if (nextElementValue == currentElementValue) {
        return true;
    }

    return false;
}

function mergeTiles(currentElementValue, nextElementValue, x, y, nextX, nextY) {
    const nextValue = currentElementValue + nextElementValue;
    matrix[x][y] = 0;
    matrix[nextX][nextY] = nextValue;
}

function drawGrid() {
    let t = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            t.push(0);
        }
        matrix.push(t);
        t = [];
    }
}

function isEmptyTile(x, y) {
    if (matrix[x][y] === 0) {
        return true;
    } else {
        return false;
    }
}

function isFull() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (matrix[i][j] === 0) {
                count++;
            }
        }
    }
    if (count === 0) {
        return true;
    } else {
        return false;
    }
}

function addTile() {
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);
    if (isFull()) {
        return;
    } else {
        if (isEmptyTile(x, y)) {
            let val = randomNr();
            if (val === 2) {
                matrix[x][y] = 2;
            } else if (val === 4) {
                matrix[x][y] = 4;
            }
        } else {
            addTile();
        }
    }

}

function randomNr() {
    let nr = (Math.random()) < 0.9 ? 2 : 4;
    return nr;
}

function draw() {
    let elem = document.getElementsByClassName("grid-cell");
    let v;
    let tile;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            v = matrix[i][j];
            tile = elem[i * 4 + j];
            /*
            0  1  2  3 
            4  5  6  7
            8  9  10 11
            12 13 14 15
            */
            
            tile.className = ("grid-cell tile" + v + " tileText");
            tile.innerHTML = v;

            if(v == 0){
                tile.className = ("grid-cell tile" + v + " tileText");
                tile.innerHTML = "";
            }

        }
    }
}

function reset() {
    matrix = [];
}

function movesQueue(x , y) {
    movesList.push(x, y);
    console.log(movesList);
    if(movesList.length > 9){
        movesList.splice(0, 2);
    }
}
