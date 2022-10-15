import React from 'react';
import useAxios from 'axios-hooks';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import arraySort from 'array-sort';
import SortPopUp from '../../components/Sort/SortPopUp';
import { useSelector } from 'react-redux';

function Home() {
  const [{ data, loading, error }] = useAxios('http://localhost:7000/pizzas');
  const [sortBy] = React.useState(useSelector((state) => state.sortSlice.value));
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{console.log(error)}Error!</p>;
  return (
    <div className="pizzalist">
      {arraySort(data, sortBy).map((pizza) => (
        <PizzaBlock
          key={pizza.id}
          id={pizza.id}
          image={pizza.imageUrl}
          name={pizza.name}
          price={pizza.price}
          sizes={pizza.sizes}
          types={pizza.types}
          className="pizzablock"
        />
      ))}
      <SortPopUp />
    </div>
  );
}

export default Home;
