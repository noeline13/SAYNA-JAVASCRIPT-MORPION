// On charge les informations utiles
const selectBox = document.querySelector(".select-box"),
    selectXBtn = selectBox.querySelector(".options .playerX"),
    selectOBtn = selectBox.querySelector(".options .playerO"),
    playBoard = document.querySelector(".container"),
    players = document.querySelector(".players"),
    slider = document.querySelector(".slider"),
    allBox = document.querySelectorAll("section button"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector(".btn button");

//lors de la telegargement du page
window.onload = () => {
        for (let i = 0; i < allBox.length; i++) {
            allBox[i].setAttribute("onclick", "chooseCase(this)");
        }


        //selection des button

        selectXBtn.onclick = () => {
            selectBox.classList.add("hide");
            playBoard.classList.add("show");
            slider.setAttribute("class", "slider")
            players.setAttribute("class", "players actives player")

        }

        selectOBtn.onclick = () => {
            selectBox.classList.add("hide");
            playBoard.classList.add("show");
            slider.setAttribute("class", "slider")
        }
    }
    // definir les joueur
let playerOIcon = "O";
let playerXIcon = "X";
let playerSign = "X";
let runBot = true;

// function pour le joueur
function chooseCase(element) {
    if (players.classList.contains("player")) {
        playerSign = "O";
        element.innerHTML = playerXIcon;
        slider.setAttribute("class", "active")
        element.setAttribute("id", playerSign)
    } else {
        element.innerHTML = playerOIcon;
        element.setAttribute("id", playerSign);
        slider.setAttribute("class", "active")
    }
    selectWinner();
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(runBot);
    }, randomDelayTime);

}


// function auto selection (CPU)
function bot(runBot) {
    if (runBot) {
        playerSign = "O";
        let array = [];
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
                console.log(i + "" + "has no children");
            }
        }
        console.log(array);
        let randomBox = 0;
        do {
            randomBox = array[Math.floor(Math.random() * array.length)];
        } while (allBox[randomBox].textContent !== "")
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                playerSign = "X";
                allBox[randomBox].innerHTML = playerOIcon;
                slider.setAttribute("class", "slider")
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = playerXIcon;
                slider.setAttribute("class", "slider")
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}

// definir le gagnant
function getClass(classname) {
    return document.querySelector(".item" + classname).id;
}

function ckeckThreeClasses(val1, val2, val3, sign) {
    if (getClass(val1) === sign && getClass(val2) === sign && getClass(val3) === sign) {
        return true;
    }
}

function selectWinner() {
    if (ckeckThreeClasses(1, 2, 3, playerSign) || ckeckThreeClasses(4, 5, 6, playerSign) || ckeckThreeClasses(7, 8, 9, playerSign) || ckeckThreeClasses(1, 4, 3, playerSign) || ckeckThreeClasses(2, 5, 8, playerSign) || ckeckThreeClasses(3, 6, 9, playerSign) || ckeckThreeClasses(1, 5, 9, playerSign) || ckeckThreeClasses(3, 5, 7, playerSign)) {
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        wonText.innerHTML = 'VICTORY';
    }
}


// resulta
replayBtn.onclick = () => {
    window.location.reload();
}