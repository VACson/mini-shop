import React from 'react';
import useAxios from 'axios-hooks';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';

function Home() {
  const [{ data, loading, error }, refetch] = useAxios('http://localhost:7000/pizzas');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{console.log(error)}Error!</p>;
  return (
    <div>
      {console.log(data)}
      {data.map((pizza, index) => (
        <PizzaBlock
          key={pizza.id}
          image={pizza.imageUrl}
          name={pizza.name}
          price={pizza.price}
          sizes={pizza.sizes}
          types={pizza.types}
        />
      ))}
    </div>
  );
}

export default Home;
