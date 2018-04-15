// Musste mir Inspiration bei Melvins Code holen, sonnst hätte ich dass nicht ansatzweise geschaft.


// Debugging:
// card creation läuft nur einmal druch dann abbruch.
// fixed, cards werden jetzt untereinander angezeigt. Lösung=css

namespace Memory {

    
    let deck: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let cards: HTMLElement[] = [];

    //inizial.
    let numberCardPairs: number;
    let numberPlayers: number;
    let gameScore: HTMLElement;
    let gameBackground: HTMLElement;

    class Card {
        cardContent: string;
        cardStatus: string;
        card: HTMLElement;
        constructor(_cardContent: string) {
            this.cardContent = _cardContent;
            this.cardStatus = randomStatus();
        }

        createCard(): HTMLElement[] {
            this.card = document.createElement("div");
            this.card.innerText = this.cardContent;
            this.card.setAttribute("class", "card " + this.cardStatus);
            cards.push(this.card);
            return cards;
        }
    }

    // Spieler
    class Player {

        score: number;
        name: string;
        player: HTMLElement;

        constructor(_name: string) {
            this.name = _name;
            this.score = 0;
        }
        // plus count
        scoreUp(): number {
            this.score += 1;
            return this.score;
        }

        show(): void {
            this.player = document.createElement("div");
            this.player.innerHTML = `
        <span class="player-name">${this.name}</span>
        <span class="player-score">Punkte: ${this.score}</span>`;
            gameScore.appendChild(this.player);
        }
    }

    // random Status
    function randomStatus(): string {
        let randomStatus: number = Math.random();
        if (randomStatus <= .5) {
            return "hidden";
        } else if (randomStatus > .5 && randomStatus <= .75) {
            return "taken";
        } else if (randomStatus > .75) {
            return "visible";
        }
    }

        // Shuffle Array: von https://stackoverflow.com/questions/1519736/random-shuffling-of-an-array
        function shuffleArray(_array: any[]): any[] {
            for (let i: number = _array.length - 1; i > 0; i--) {
                const j: number = Math.floor(Math.random() * (i + 1));
                [_array[i], _array[j]] = [_array[j], _array[i]];
            }
            return _array;
        }
        // Input Spieleranzahl
        numberPlayers = parseInt(prompt("Bitte die Anzahl der Spieler eingeben, MAX 4 Spieler!: "), 10);
        numberPlayers > 4 ? numberPlayers = 4 : numberPlayers = numberPlayers;
    
    
    
        function main(): void {
        // Input Kartenpaar
        numberCardPairs = parseInt(prompt("Spielfeld größe: 5 - 10 Karten"), 10);
        if (numberCardPairs < 5 || numberCardPairs > 10) {
            numberCardPairs = 8;
        }

        // DOM abhängige Variablen initialisieren
        gameScore = document.getElementById("score");
        gameBackground = document.getElementById("card-div");

        // Karten erzeugen
        for (let i: number = 0; i < numberCardPairs; i++) {
            let card: Card = new Card(deck[i]);
            card.createCard();

            let pair: Card = new Card(deck[i]);
            pair.createCard();
        }

        // Karten mischen
        shuffleArray(cards);

        // Karten anzeigen
        for (let i: number = 0; i < cards.length; i++) {
            gameBackground.appendChild(cards[i]);
        }

        // Spieler Anzeige generieren
        for (let i: number = 0; i < numberPlayers; i++) {
            let player: Player = new Player("Spieler " + (i + 1));
            player.show();
        }
    }
    
    document.addEventListener("DOMContentLoaded", main);
}