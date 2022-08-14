const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"

game.createCardsFromTechs()
initializeBoard(game.cards)

function initializeBoard(cards) {
    const gameBoard = document.getElementById("gameBoard")
    cards.forEach(cardObject => {
        const cardElement = document.createElement("div")
        cardElement.id = cardObject.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = cardObject.icon

        createCardContent(cardObject, cardElement)

        cardElement.addEventListener("click", flipCard)

        gameBoard.appendChild(cardElement)
    });
}

function createCardContent(cardObject, cardElement) {
    createCardFace(FRONT, cardObject, cardElement)
    createCardFace(BACK, cardObject, cardElement)
}

function createCardFace(face, cardObject, cardElement) {
    const cardElementFace = document.createElement("div")
    cardElementFace.classList.add(face)
    cardElementFace.innerHTML = (face == FRONT) ? "<img src='images/" + cardObject.icon + ".png' class='icon'>" : "&lt/&gt"
    cardElement.appendChild(cardElementFace)
}

function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip")
        if (game.checkNull()) return

        if (game.checkMatch()) {
            if (!game.checkGameOver()) game.clearCards()
            else gameOver()
        }
        else {
            const firstCardView = document.getElementById(game.firstCard.id)
            const secondCardView = document.getElementById(game.secondCard.id)

            setTimeout(() => {
                firstCardView.classList.remove("flip")
                secondCardView.classList.remove("flip")
                game.unflip()
                game.clearCards()
            }, 1000);
        }
    }
}

function gameOver() {
    document.getElementById("gameOver").style.display = "flex"
}

function restart() {
    location.reload()
}