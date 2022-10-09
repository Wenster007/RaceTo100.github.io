'use strict';

//Selecting Elements-------------------------------------------
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceImgEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//Starting Conditions-------------------------------------------

score0El.textContent = 0;
score1El.textContent = 0;

diceImgEl.classList.add("hidden");

let totalScore = [0, 0];
let currentScore = 0;
let activePlayer = 0;


//Useful functions------------------------------------------------

//it makes the currentScore to zero when 1 comes on the dice and passes to the next Person.
let nextUserTurn = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
    play2();
}


//for playing sound effects of each dice roll
function play1() {
    let audio1 = document.getElementById("audio1");
    audio1.pause();
    audio1.currentTime = 0;
    audio1.play();
  }

//sound effect when 1 comes
function play2(){
    let audio2 = document.getElementById("audio2");
    audio2.play();
} 

//winning sound effect
function play3(){
    let audio3 = document.getElementById("audio3");
    audio3.play();
} 

//New Game button sound effect
function play4(){
    let audio4 = document.getElementById("audio4");
    audio4.play();
} 

//Adding EventListeners-------------------------------------------

//rolling dice functionality
btnRoll.addEventListener("click", function () {
    const randomNumber = Math.trunc(Math.random() * 6 + 1);

    diceImgEl.classList.remove("hidden");

    diceImgEl.src = `dice-${randomNumber}.png`;

    if (randomNumber !== 1) {
        currentScore = currentScore + randomNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        play1();
    } else {
        nextUserTurn();
    }
})


btnHold.addEventListener("click", function () {
    totalScore[activePlayer] = totalScore[activePlayer] + currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = totalScore[activePlayer];


    if (totalScore[activePlayer] >= 100) {
        document.querySelector(`.player--${activePlayer}`).classList.add("winner");
        play3();
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    } else {
        nextUserTurn();
    }

})

btnNew.addEventListener("click", function () {
    play4();
    document.querySelector(`.player--${activePlayer}`).classList.remove("winner");

    if (!player0El.classList.contains("player--active")){
        player0El.classList.toggle("player--active");
        player1El.classList.toggle("player--active");
    }

    score0El.textContent = 0;
    score1El.textContent = 0;


    diceImgEl.classList.add("hidden");

    totalScore = [0, 0];
    currentScore = 0;
    activePlayer = 0;

})
