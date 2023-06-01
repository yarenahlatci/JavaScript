const cards = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];

let flippedCards = [];  
let matchedCards = [];  

function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createCards() {
    const gameBoard = document.getElementById("game-board");

    const shuffledCards = shuffle(cards);

    for (let i = 0; i < shuffledCards.length; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.value = shuffledCards[i];
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    }
}

function flipCard() {
    if (flippedCards.length < 2 && !matchedCards.includes(this)) {
        this.textContent = this.dataset.value;
        this.classList.add("flipped");
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    if (card1.dataset.value === card2.dataset.value) {
        card1.removeEventListener("click", flipCard);
        card2.removeEventListener("click", flipCard);
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
    } else {
        card1.textContent = "";
        card2.textContent = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
    }

    flippedCards = [];

    if (matchedCards.length === cards.length) {
        setTimeout(showGameOver, 500);
    }
}

function showGameOver() {
    alert("Oyun bitti!");
    resetGame();
}

function resetGame() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    matchedCards = [];
    createCards();
}

createCards();
