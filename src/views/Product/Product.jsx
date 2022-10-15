import React from 'react';
import useAxios from 'axios-hooks';
import { useParams, Link } from 'react-router-dom';

import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';

function Product() {
  let params = useParams();
  const [{ data, loading, error }] = useAxios(
    'http://localhost:7000/pizzas?id=' + params.id.substring(1),
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{console.log(error)}Error!</p>;
  const pizza = data[0];
  return (
    <div>
      <Link to="/">
        <div className="backbutton"> Back to Home</div>
      </Link>
      <PizzaBlock
        id={pizza.id}
        image={pizza.imageUrl}
        name={pizza.name}
        price={pizza.price}
        sizes={pizza.sizes}
        className="pizzapage"
      />
    </div>
  );
}

export default Product;
