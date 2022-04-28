// On charge les informations utiles
const selectBox = document.querySelector(".select-box"),
    selectXBtn = selectBox.querySelector(".options .playerX"),
    selectOBtn = selectBox.querySelector(".options .playerO"),
    playBoard = document.querySelector(".container"),
    players = document.querySelector(".range"),
    allBox = document.querySelectorAll("section button"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector(".btn button");

//lors de la telegargement du page
window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "chooseCase(this)");
    }
}

selectXBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");

}

selectOBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "range active player")
}

let playerO = "O";
let playerX = "X";
let playerSign = "X";


// recupere les case
function chooseCase(element) {
    if (players.classList.contains("player")) {
        element.innerHTML = playerO;
        players.classList.add("active");
    } else {
        element.innerHTML = playerX;
        players.classList.add("active");
    }
    element.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot();
    }, randomDelayTime);

};


// function auto selection (CPU)
function bot() {
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0) {
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    console.log(randomBox);
    if (array.length > 0) {
        if (players.classList.contains("player")) {
            allBox[randomBox].innerHTML = playerX;
            players.classList.remove("active");
        } else {
            allBox[randomBox].innerHTML = playerO;
            players.classList.remove("active");
        }
    }
    allBox[randomBox].style.pointerEvents = "none";
}