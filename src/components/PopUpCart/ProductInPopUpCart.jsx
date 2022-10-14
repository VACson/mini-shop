import React from 'react';
import useAxios from 'axios-hooks';

import { useSelector, useDispatch } from 'react-redux';
import { deleteCartItem } from '../../store/slices/cartSlice';

function ProductInPopUpCart({ id, onClickClose }) {
  const [{ data, loading, error }] = useAxios('http://localhost:7000/pizzas?id=' + id);
  const cart = useSelector((state) => state.cartSlice);
  console.log(cart);
  const itemID = cart.map((items) => items.id).indexOf(id);
  const dispatch = useDispatch();
  const deletePizza = () => {
    dispatch(deleteCartItem({ id }));
    cart.length < 2 && onClickClose(false);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{console.log(error)}Error!</p>;
  const pizza = data[0];
  return (
    <div className="productinpopup">
      <img src={pizza.imageUrl} className="productinpopup__image" alt="" />
      <div className="">{pizza.name}</div>
      <div className="">{pizza.price}</div>
      <div className="">{cart[itemID].count}</div>
      <button className={'modal__button modal__button--delete'} onClick={() => deletePizza()}>
        Видалити з кошика
      </button>
    </div>
  );
}

export default ProductInPopUpCart;
