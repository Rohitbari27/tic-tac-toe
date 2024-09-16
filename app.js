let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let undo = document.querySelector(".undo");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn = document.querySelector(".turn");

let turn_O = true;
let moves = [];

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const  resetgame = () => {
    turn_O = true;
    moves = [];
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (turn_O) {
            box.innerText = "O";
            turn.innerText = "X Player Turn"
            moves.push({ index, mark: 'O' });
            turn_O = false;
        } else {
            box.innerText = "X";
            turn.innerText = "O Player Turn"
            moves.push({ index, mark: 'X' });
            turn_O = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is player ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const showTie = () => {
    msg.innerText = `It is  a Tie , Play again`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log(`Winner is player ${pos1}`);
                showWinner(pos1);
                undo.disabled = true;
                reset.disabled = true;
                return;
            }
        }

    }

    let allFilled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
            break;
        }
    }

    if (allFilled) {
        console.log("The game is a tie");
        showTie();
    }

};

const undoMove = () => {
    if (moves.length > 0) {
        const lastMove = moves.pop();
        boxes[lastMove.index].innerText = "";
        boxes[lastMove.index].disabled = false;
        turn_O = lastMove.mark === 'O';
    }
    
};

newGameBtn.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);
undo.addEventListener("click", undoMove);
