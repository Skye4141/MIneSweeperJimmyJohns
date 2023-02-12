var board = [];
var width = 20
var height = 15

window.addEventListener("load", (event) => {
    console.log("this should print to console when the window loads");
    // any setup should be done here
    var table = document.getElementById("game-board");
    for (var i = 0; i < height; i ++){
        var tr = document.createElement("tr");
        tr.className = "game-row";
        var arr = [];
        
        for (var j = 0; j < width; j ++) {
            var td = document.createElement("td");
            td.className = "game-piece";
            td.setAttribute("onclick", "reveal("+i+","+j+",this)")
            tr.appendChild(td);
            var num = Math.floor(Math.random() * 4.8);
            var isMine = (num == 0);
            arr.push(isMine);
        }
        table.append(tr);
        board.push(arr);
    }

    runSimulation()
});

var isSimulation = false;
function runSimulation() {
    var iBound = Math.floor(height / 2) - 2
    var jBound = Math.floor(width / 2) - 6
    isSimulation = true;
    for (var i = iBound; i < iBound + 5; i++) {
        for (var j = jBound; j < jBound + 13; j++) {
            var table = document.getElementById("game-board");
            var row = table.querySelector("tr:nth-child("+(i+1)+")")
            var cell = row.querySelector("td:nth-child("+(j+1)+")")
            reveal(i, j, cell)
        }
    }
    isSimulation = false;
}

function reveal(i, j, gamePiece) {
    if (event.shiftKey) {
        gamePiece.style.backgroundColor = "blue";
        return;
    }
    console.log(board[i][j])
    if (board[i][j]) {
        if (isSimulation) {
            gamePiece.style.backgroundColor = "blue";
        } else {
            gamePiece.style.backgroundColor = "black";
            console.log("you lose")    
        }
    } else {
        gamePiece.style.backgroundColor = "lightgreen";
        console.log("you don't lose");
        var sur = calcSurroundingMines(i, j)
        gamePiece.innerText = sur;
    }
    
}

function calcSurroundingMines(i, j) {
    var count = 0;
    if (i < height - 1 && board[i + 1][j]) {
        count ++;
    }
    if (j < width - 1 && i < height - 1 && board[i + 1][j + 1]) {
        count ++;
    }
    if (j < width - 1 && board[i][j + 1]) {
        count ++;
    }
    if (j > 0 && i < height - 1 && board[i + 1][j - 1]) {
        count ++;
    }
    if (i > 0 && board[i - 1][j]) {
        count ++;
    }
    if (j > 0 && i > 0 && board[i - 1][j - 1]) {
        count ++;
    }
    if (j < width - 1 && i > 0 && board[i - 1][j + 1]) {
        count ++;
    }
    if (j > 0 && board[i][j - 1]) {
        count ++;
    }
    return count;
}

function clickme() {
    console.log("I think a button was clicked "+globalVariable+" times");
    // sets globalVariable equal to itself plus one, this is called "incrementing" the value
    globalVariable += 1;
}