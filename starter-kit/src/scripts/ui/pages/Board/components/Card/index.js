import React from 'react';

const Card = ({ color, figure }) => (
  <div className={`card ${color}`}>
    {`card ${color} ${figure}`}
  </div>
);

export default Card;
