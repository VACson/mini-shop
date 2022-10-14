import React from 'react';

function PizzaBlock({ image, name, price, sizes, type }) {
  return (
    <div>
      <img src={image} alt="" />
      {name}
      {price}
    </div>
  );
}

export default PizzaBlock;
