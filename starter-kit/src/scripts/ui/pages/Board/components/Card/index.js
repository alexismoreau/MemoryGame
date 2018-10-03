import React from 'react';

const Card = ({
  id, color, figure, flipped, won, handler,
}) => (
  <div className={`card ${color} ${flipped ? 'flipped' : ''} ${won ? 'won' : ''}`} onClick={() => handler(id)}>
    <div className="card-content">
      {`card ${color} ${figure}`}
    </div>
  </div>
);

export default Card;
