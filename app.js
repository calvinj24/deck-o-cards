const suits = ['clubs','spades','hearts','diamonds'];

const convertValueToName = (value) => {
  if (value>1 && value<11) {
    return value.toString();
  } else {
    switch(value) {
      case 1:
        return 'ace';
      case 11:
        return 'jack';
      case 12:
        return 'queen';
      case 13:
        return 'king';
      default:
        return;
    }
  }
};

const shuffleDeck = (deck) => {
  let currentIndex = deck.length, tempVal, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    tempVal = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = tempVal;
  }
  return deck;
}

class Card {
  constructor(params) {
    this.id = params.id;
    this.suit = params.suit;
    this.value = params.value;    
    this.name = params.name
  }

  getCard() {
    console.log(`${this.name} of ${this.suit}`);
  }

  getImageURL() {
    return `./assets/svg/cards-SVG/${this.name}_of_${this.suit}.svg`;
  }
}

class Deck {
  constructor() {
    let deck = [];
    for (let i=0; i<suits.length; i++) {
      for (let j=1; j<14; j++) {
        deck.push(
          new Card({
            id: suits[i][0]+j,
            suit: suits[i],
            value: j,
            name: convertValueToName(j)
          })
        );
      }
    }
    this.deck = deck;
  }

  getDeck() {
    console.log(this.deck);
  }

  shuffle() {
    shuffleDeck(this.deck);
  }

  dealCard() {
    let newCard = this.deck.pop()

    // add error if no card
    return newCard;
  }
}

class Pile {
  constructor(id) {
    this.id = id;
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card)
  }

  getPile() {
    return this.cards;
  }
}

class Game {
  constructor() {
    this.deck = new Deck       // <---- IN FUTURE: add ability for multiple games
    this.piles = []
    this.pile_count = 0
  }

  deal(amount, pileID) {
    if (!pileID) {
      pileID = this.pile_count;
      let pile = new Pile(pileID);
      this.piles.push(pile);
      this.pile_count += 1;
    }
    for (let i=0; i<amount; i++) {
      let card = this.deck.dealCard();
      this.piles[pileID].addCard(card);
    }
    return(this.piles[pileID]);
  }

  initialize() {

    this.deck.shuffle();
    
  }

}

const newGame = new Game()
console.log(newGame);
newGame.initialize();

// for testing
$('.btn').click(function() {
  console.log(newGame.deal(2));
})