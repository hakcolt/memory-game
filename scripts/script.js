import { CardFlipper, createCardsFromTechs } from "./game.js"

const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"

{
    const cards = createCardsFromTechs()
    initializeBoard(cards)
}

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
    })
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

const cardFlipper = new CardFlipper()

function flipCard() {
    if (!cardFlipper.isCardFlipped(this.id)) {
        this.classList.add("flip")

        if (cardFlipper.checkNull()) return

        const [firstCard, secondCard] = cardFlipper.getSelectedCards()

        if (firstCard.icon == secondCard.icon) {
            if (cardFlipper.checkGameFinish()) gameFinish()
            else cardFlipper.clearCards()
        } else {
            const firstCardView = document.getElementById(firstCard.id)
            const secondCardView = document.getElementById(secondCard.id)

            setTimeout(() => {
                firstCardView.classList.remove("flip")
                secondCardView.classList.remove("flip")
                cardFlipper.unflip()
                cardFlipper.clearCards()
            }, 1000)
        }
    }
}

function gameFinish() {
    document.getElementById("gameFinish").style.display = "flex"
    document.getElementById("restart").addEventListener("click", restart)
}

function restart() { location.reload() }