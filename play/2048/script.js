var board;
var score = 0;
var rows = 4;
var columns = 4;
var canPlay = false;

window.onload = function () {
    setGame();
};

function setGame() {
    document.getElementById("board").innerHTML = "";
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    score = 0;
    document.getElementById("score") && (document.getElementById("score").innerText = "Puntaje: 0");
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
    canPlay = true;
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("b" + num.toString());
        } else {
            tile.classList.add("b8192");
        }
    }
}

function actualizarPuntaje() {
    document.getElementById("puntaje").innerHTML = `Puntaje: <strong>${score}</strong>`;
}

document.addEventListener('keyup', (e) => {
    if (!canPlay) return;
    let movio = false;
    if (e.code == "ArrowLeft") { slideLeft(); movio = true; }
    else if (e.code == "ArrowRight") { slideRight(); movio = true; }
    else if (e.code == "ArrowUp") { slideUp(); movio = true; }
    else if (e.code == "ArrowDown") { slideDown(); movio = true; }
    if (movio) {
        setTwo();
        actualizarPuntaje();
        verificarGameOver();
    }
});

document.getElementById("keyup").addEventListener("click", () => {
    if (!canPlay) return;
    slideUp(); setTwo(); actualizarPuntaje(); verificarGameOver();
});
document.getElementById("keydown").addEventListener("click", () => {
    if (!canPlay) return;
    slideDown(); setTwo(); actualizarPuntaje(); verificarGameOver();
});
document.getElementById("keyright").addEventListener("click", () => {
    if (!canPlay) return;
    slideRight(); setTwo(); actualizarPuntaje(); verificarGameOver();
});
document.getElementById("keyleft").addEventListener("click", () => {
    if (!canPlay) return;
    slideLeft(); setTwo(); actualizarPuntaje(); verificarGameOver();
});

window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

function filterZero(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        board[r] = row.reverse();
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) return;
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("b2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) return true;
        }
    }
    return false;
}

// Detectar si hay movimientos posibles
function hayMovimientosPosibles() {
    if (hasEmptyTile()) return true;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const actual = board[r][c];
            if (c < columns - 1 && board[r][c + 1] === actual) return true;
            if (r < rows - 1 && board[r + 1][c] === actual) return true;
        }
    }
    return false;
}

function verificarGameOver() {
    if (!hayMovimientosPosibles()) {
        canPlay = false;
        document.getElementById("puntajeFinal").textContent = score;
        document.getElementById("modalGameOver").classList.add("activo");
    }
}

// Botones de los modales
document.getElementById("btnEmpezar").addEventListener("click", () => {
    document.getElementById("modalInicio").classList.remove("activo");
    setGame();
    actualizarPuntaje();
});

document.getElementById("btnReiniciar").addEventListener("click", () => {
    document.getElementById("modalGameOver").classList.remove("activo");
    setGame();
    actualizarPuntaje();
});
