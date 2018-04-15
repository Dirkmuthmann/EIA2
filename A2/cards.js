// Musste mir Inspiration bei Melvins Code holen, sonnst h�tte ich dass nicht ansatzweise geschaft.
// Debugging:
// card creation l�uft nur einmal druch dann abbruch.
// fixed, cards werden jetzt daf�r untereinander angezeigt. L�sung=css
var Memory;
(function (Memory) {
    let deck = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let cards = [];
    //inizial.
    let numberCardPairs;
    let numberPlayers;
    let gameScore;
    let gameBackground;
    class Card {
        constructor(_cardContent) {
            this.cardContent = _cardContent;
            this.cardStatus = randomStatus();
        }
        createCard() {
            this.card = document.createElement("div");
            this.card.innerText = this.cardContent;
            this.card.setAttribute("class", "card " + this.cardStatus);
            cards.push(this.card);
            return cards;
        }
    }
    // Spieler
    class Player {
        constructor(_name) {
            this.name = _name;
            this.score = 0;
        }
        // plus count
        scoreUp() {
            this.score += 1;
            return this.score;
        }
        // player Nr. + score
        show() {
            this.player = document.createElement("div");
            this.player.innerHTML = `
        <span class="player-name">${this.name}</span>
        <span class="player-score">Punkte: ${this.score}</span>`;
            gameScore.appendChild(this.player);
        }
    }
    // random Status hinzuf�gen
    function randomStatus() {
        let randomStatus = Math.random();
        if (randomStatus <= .5) {
            return "hidden";
        }
        else if (randomStatus > .5 && randomStatus <= .75) {
            return "taken";
        }
        else if (randomStatus > .75) {
            return "visible";
        }
    }
    // Shuffle Array: Hilfe von https://stackoverflow.com/questions/1519736/random-shuffling-of-an-array
    function shuffleArray(_array) {
        for (let i = _array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [_array[i], _array[j]] = [_array[j], _array[i]];
        }
        return _array;
    }
    // Input Spieleranzahl
    numberPlayers = parseInt(prompt("Bitte die Anzahl der Spieler eingeben, MAX 4 Spieler!: "), 10);
    numberPlayers > 4 ? numberPlayers = 4 : numberPlayers = numberPlayers;
    function main() {
        // Input Kartenpaar
        numberCardPairs = parseInt(prompt("Spielfeld gr��e: 5 - 10 Karten"), 10);
        if (numberCardPairs < 5 || numberCardPairs > 10) {
            numberCardPairs = 8;
        }
        // DOM Objekt erzeugen sonnst kein Objekt
        gameScore = document.getElementById("score");
        gameBackground = document.getElementById("card-div");
        // Karten erzeugen
        for (let i = 0; i < numberCardPairs; i++) {
            let card = new Card(deck[i]);
            card.createCard();
            let pair = new Card(deck[i]);
            pair.createCard();
        }
        // Karten mischen
        shuffleArray(cards);
        // Karten hinzuf�gen und anzeien
        for (let i = 0; i < cards.length; i++) {
            gameBackground.appendChild(cards[i]);
        }
        // Spieler Score ini
        for (let i = 0; i < numberPlayers; i++) {
            let player = new Player("Spieler " + (i + 1));
            player.show();
        }
    }
    document.addEventListener("DOMContentLoaded", main);
})(Memory || (Memory = {}));
//# sourceMappingURL=cards.js.map