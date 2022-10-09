import { CardFlipper, createCardsFromTechs } from "./game.js"

const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
let cardFlipper = null
let timer = null

init()

function init(){
    const cards = createCardsFromTechs()
    initializeBoard(cards)
}

function initializeBoard(cards) {
    
    updateMoveAndScore([0, 0])
    
    cardFlipper = new CardFlipper()
    timer = setInterval(updateTimer, 1000)

    const gameBoard = document.getElementById("gameBoard")
    gameBoard.innerHTML = ""

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

function updateMoveAndScore([score, moves]) {
    const [scoreView, movesView] = document.getElementById("data").children
    scoreView.innerHTML = score
    movesView.innerHTML = moves
}

function updateTimer() {
    const timerView = document.getElementById("data").children[2]
    timerView.innerHTML = getTimeFormatted()
}

function getTimeFormatted() {
    let seconds = cardFlipper.getSeconds()

    const minutes = seconds < 60 ? 0: parseInt(seconds / 60)
    const minutesFormatted = minutes < 10 ? `0${minutes}`: minutes

    seconds = seconds < 60 ? seconds : parseInt(seconds % 60)
    const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds

    const timeFormatted = `${minutesFormatted}:${secondsFormatted}`

    return timeFormatted
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
    if (!cardFlipper.isCardFlipped(this.id)) {
        this.classList.add("flip")

        if (cardFlipper.checkNull()) return

        const [firstCard, secondCard] = cardFlipper.getSelectedCards()

        if (firstCard.icon == secondCard.icon) {
            if (cardFlipper.checkGameFinish()) gameFinish()
            else cardFlipper.clearCards()
            const res = cardFlipper.increaseMovesOrScore(CardFlipper.DataType.BOTH)
            updateMoveAndScore(res)
        } else {
            const firstCardView = document.getElementById(firstCard.id)
            const secondCardView = document.getElementById(secondCard.id)

            setTimeout(() => {
                cardFlipper.unflip()
                cardFlipper.clearCards()
                const res = cardFlipper.increaseMovesOrScore(CardFlipper.DataType.MOVES)
                updateMoveAndScore(res)
                firstCardView.classList.remove("flip")
                secondCardView.classList.remove("flip")
            }, 1000)
        }
    }
}

function gameFinish() {
    const gameFinishView = document.getElementById("gameFinish")
    gameFinishView.style.display = "flex"

    const data = document.getElementById("data").children
    const gameFinishData = gameFinishView.children[1].children
    for (let index = 0; index < 3; index++) gameFinishData[index].innerHTML =  data[index].innerHTML

    document.getElementById("restart").addEventListener("click", restart)
}

function restart() { 
    const gameFinishView = document.getElementById("gameFinish")
    gameFinishView.style.display = "none"
    clearInterval(timer)
    init()
 }