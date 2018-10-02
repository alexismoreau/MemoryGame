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

    };
    this.cardAction = this.cardAction.bind(this);
    this.renderCards = this.renderCards.bind(this);
  }

  cardAction() {
    console.log('test');
  }

  renderCards() {
    const children = [];
    let i;
    // Loop to create 12 cards of each color
    for (i = 0; i < 12; i += 1) {
      const figure = figures[Math.floor(i)];
      children.push(
        <Card key={`red${i}`} color="red" figure={figure} handler={this.cardAction} />,
      );
      children.push(
        <Card key={`blue${i}`} color="blue" figure={figure} handler={this.cardAction} />,
      );
    }
    return Board.shuffleCards(children);
  }

  render() {
    return (
      <div className="board">
        {this.renderCards()}
      </div>
    );
  }
}

export default Board;
