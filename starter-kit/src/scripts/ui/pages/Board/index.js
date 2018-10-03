import React from 'react';

import figures from '../../../utils/figures';

import Card from './components/Card';

class Board extends React.Component {
  /**
   * Shuffles array in place. ES6 version
   * @param {Array} a items An array containing the items.
   */
  // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  static shuffleCards(a) {
    let i;
    for (i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  constructor(props) {
    super(props);
    this.state = {
      playerChoice: [],
      cardsToDisplay: [],
    };
    this.cardAction = this.cardAction.bind(this);
    this.generateCards = this.generateCards.bind(this);
  }

  generateCards() {
    const cards = [];
    let i;
    // Loop to create 12 cards of each color
    for (i = 0; i < 12; i += 1) {
      const figure = figures[Math.floor(i)];
      cards.push(
        {
          id: `red${i}`,
          color: 'red',
          figure,
          flipped: false,
          won: false,
        },
      );
      cards.push(
        {
          id: `blue${i}`,
          color: 'blue',
          figure,
          flipped: false,
          won: false,
        },
      );
    }
    // we shuffle cards before starting
    return this.setState({ cardsToDisplay: Board.shuffleCards(cards) });
  }

  flipCard(cardId) {
    const { cardsToDisplay } = this.state;

    // we find the index of the card to flip
    const cardToSetToFlippedIndex = cardsToDisplay.findIndex(card => (card.id === cardId));
    // we find the associated card
    let cardToSetToFlipped = cardsToDisplay[cardToSetToFlippedIndex];
    // we change the flipped property of our selected card
    cardToSetToFlipped = {
      ...cardToSetToFlipped,
      flipped: true,
    };

    // Since it's a quick test, we don't use Immutable but we should
    cardsToDisplay[cardToSetToFlippedIndex] = cardToSetToFlipped;

    this.setState({ cardsToDisplay });
  }

  flipCardBack(cardId) {
    const { cardsToDisplay } = this.state;

    // we find the index of the card to flip
    const cardToSetToFlippedIndex = cardsToDisplay.findIndex(card => (card.id === cardId));
    // we find the associated card
    let cardToSetToFlipped = cardsToDisplay[cardToSetToFlippedIndex];
    // we change the flipped property of our selected card
    cardToSetToFlipped = {
      ...cardToSetToFlipped,
      flipped: false,
    };

    // Since it's a quick test, we don't use Immutable but we should
    cardsToDisplay[cardToSetToFlippedIndex] = cardToSetToFlipped;

    this.setState({ cardsToDisplay });
  }

  setCardToWon(cardId) {
    const { cardsToDisplay } = this.state;

    // we find the index of the card to flip
    const cardToSetToFlippedIndex = cardsToDisplay.findIndex(card => (card.id === cardId));
    // we find the associated card
    let cardToSetToFlipped = cardsToDisplay[cardToSetToFlippedIndex];
    // we change the flipped property of our selected card
    cardToSetToFlipped = {
      ...cardToSetToFlipped,
      won: true,
    };

    // Since it's a quick test, we don't use Immutable but we should
    cardsToDisplay[cardToSetToFlippedIndex] = cardToSetToFlipped;

    this.setState({ cardsToDisplay });
  }

  cardAction(choice) {
    const { playerChoice } = this.state;

    // we simulate card flipping
    this.flipCard(choice);

    const updatedPlayerChoice = [...playerChoice, choice];
    this.setState({ playerChoice: updatedPlayerChoice });

    // if 2 cards are flipped we check if they are the same
    if (updatedPlayerChoice.length === 2) {
      return this.checkChoice(updatedPlayerChoice);
    }
    return false;
  }

  checkChoice(updatedPlayerChoice) {
    const { cardsToDisplay } = this.state;

    const flippedCardIndex1 = cardsToDisplay.findIndex(card => (card.id === updatedPlayerChoice[0]));
    const flippedCard1 = cardsToDisplay[flippedCardIndex1];

    const flippedCardIndex2 = cardsToDisplay.findIndex(card => (card.id === updatedPlayerChoice[1]));
    const flippedCard2 = cardsToDisplay[flippedCardIndex2];

    // we check if the flipped cards are in the opposite color and the same figure
    if (
      (flippedCard1.color !== flippedCard2.color)
      && (flippedCard1.figure === flippedCard2.figure)) {
      this.setCardToWon(flippedCard1.id);
      this.setCardToWon(flippedCard2.id);
      return this.setState({ playerChoice: [] });
    }
    // else we flip the cards back
    this.flipCardBack(flippedCard1.id);
    this.flipCardBack(flippedCard2.id);
    return this.setState({ playerChoice: [] });
  }

  render() {
    const { cardsToDisplay } = this.state;

    const hasWon = cardsToDisplay.find(card => (card.won === false));

    console.log(hasWon);
    // we generate cards only if we refresh the page
    if (cardsToDisplay.length === 0) {
      this.generateCards();
    }
    /*if (hasWon) {
      return <h1 className="win">YOU WIN</h1>;
    }*/
    return (
      <div className="board">
        {cardsToDisplay.map(
          card => (
            <Card
              key={card.id}
              id={card.id}
              color={card.color}
              figure={card.figure}
              flipped={card.flipped}
              won={card.won}
              handler={this.cardAction}
            />
          ),
        )}
      </div>
    );
  }
}

export default Board;
