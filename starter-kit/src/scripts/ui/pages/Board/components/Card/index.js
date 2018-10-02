import React from 'react';

const Card = ({ handler, color, figure }) => (
  <div className={`card ${color}`} onClick={handler}>
    <div className="card-content">
      {`card ${color} ${figure}`}
    </div>
  </div>
);

export default Card;
