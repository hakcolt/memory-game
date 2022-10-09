const techs = ["bootstrap", "css", "electron", "firebase", "html", "javascript", "jquery", "mongo", "node", "react"]
let cards = null

export function createCardsFromTechs() {
    const cardPairs = []
    for (const tech of techs)
        cardPairs.push(createPairFromTech(tech))
    cards = cardPairs.flatMap(tech => tech)
    shuffleCards()
    return cards
}

function createPairFromTech(tech) {
    const pair = []
    for (let i = 0; i < 2; i++)
        pair.push({
            id: tech + parseInt(Math.random() * 1000),
            icon: tech,
            flipped: false
        })
    return pair
}

function shuffleCards() {
    let randomIndex = 0
    for (let currentIndex = cards.length - 1; currentIndex != -1; currentIndex--) {
        randomIndex = Math.round(Math.random() * currentIndex)

        const cardRandomIndex = cards[randomIndex]
        cards[randomIndex] = cards[currentIndex]
        cards[currentIndex] = cardRandomIndex
    }
}

export class CardFlipper {
    #firstCard = null
    #secondCard = null

    isCardFlipped(id) {
        let card = cards.filter(cardTemp => cardTemp.id == id)[0]
        if (card.flipped || this.#secondCard) return true
        card.flipped = true
        if (!this.#firstCard) this.#firstCard = card
        else this.#secondCard = card
        return false
    }

    checkNull() { return  !this.#firstCard|| !this.#secondCard }

    getSelectedCards() {
        return [this.#firstCard, this.#secondCard]
    }

    checkGameFinish() {
        return cards.filter(card => card.flipped).length == cards.length
    }

    clearCards() {
        this.#firstCard = null
        this.#secondCard = null
    }

    unflip() {
        this.#firstCard.flipped = false
        this.#secondCard.flipped = false
    }
}