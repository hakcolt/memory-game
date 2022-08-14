const game = {
    techs: ["bootstrap", "css", "electron", "firebase", "html", "javascript", "jquery", "mongo", "node", "react"],
    cards: [],

    createCardsFromTechs: function () {
        for (const tech of this.techs)
            this.cards.push(this.createPairFromTech(tech))
        this.cards = this.cards.flatMap(tech => tech)
        this.shuffleCards()
    },

    createPairFromTech: function (tech) {
        const pair = []
        for (const i of new Array(2)) {
            pair.push({
                id: tech + parseInt(Math.random() * 1000),
                icon: tech,
                flipped: false
            })
        }
        return pair
    },

    shuffleCards: function () {
        let currentIndex = this.cards.length
        let randomIndex = 0

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {
        let card = this.cards.filter(card => card.id == id)[0]
        if (card.flipped || this.lockMode) return false
        card.flipped = true
        if (!this.firstCard) {
            this.firstCard = card
            return true
        } else {
            this.secondCard = card
            this.lockMode = true
            return true
        }
    },

    checkNull: function () {
        return !game.firstCard || !game.secondCard
    },

    checkMatch: function () {
        return this.firstCard.icon == this.secondCard.icon
    },

    unflip: function () {
        game.firstCard.flipped = false
        game.secondCard.flipped = false
    },

    clearCards: function () {
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    checkGameOver: function () {
        return this.cards.filter(card => card.flipped).length == 20
    }
}